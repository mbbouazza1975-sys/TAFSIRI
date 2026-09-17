// Application Service Worker on dedicated subpath /app-cache/sw.js
// Avoids conflict with platform root service worker while providing full offline PWA support

const CACHE_VERSION = 'v5';
const CACHE_NAME = `warsh-hifz-app-${CACHE_VERSION}`;
const AUDIO_CACHE = 'warsh-audio-cache-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      // Cache core assets gracefully so one failure does not break the entire install
      for (const asset of STATIC_ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn('[SW] Pre-caching asset failed:', asset, err);
        }
      }
    })
  );
  // Take over immediately without waiting for existing tabs to close
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME && key !== AUDIO_CACHE)
          .map(key => {
            console.log('[SW] Purging outdated cache:', key);
            return caches.delete(key);
          })
      );
    }).then(() => {
      return self.clients.claim();
    }).then(() => {
      // Notify all active clients that a new version is active
      return self.clients.matchAll({ type: 'window' }).then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'SW_UPDATED', version: CACHE_VERSION });
        });
      });
    })
  );
});

// Allow clients to trigger manual skipWaiting and cache purge
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'PURGE_CACHE') {
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== AUDIO_CACHE)
          .map(key => caches.delete(key))
      );
    }).then(() => {
      self.clients.matchAll({ type: 'window' }).then(clients => {
        clients.forEach(client => client.navigate(client.url));
      });
    });
  }
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip browser-sync, chrome-extension, or analytics
  if (!url.protocol.startsWith('http')) return;

  // 1. Audio requests (.mp3 or audio destination): Cache-First
  if (url.pathname.endsWith('.mp3') || event.request.destination === 'audio') {
    event.respondWith(
      caches.open(AUDIO_CACHE).then(async cache => {
        const cached = await cache.match(event.request);
        if (cached) return cached;

        try {
          const networkRes = await fetch(event.request);
          if (networkRes && networkRes.status === 200) {
            cache.put(event.request, networkRes.clone());
          }
          return networkRes;
        } catch (err) {
          return new Response('Audio non disponible hors-ligne sans téléchargement préalable', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
        }
      })
    );
    return;
  }

  // 2. Navigation requests (HTML pages): Network-First with Cache Fallback (Never stale online)
  if (event.request.mode === 'navigate' || (event.request.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
        .then(networkRes => {
          if (networkRes && networkRes.status === 200) {
            const copy = networkRes.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          }
          return networkRes;
        })
        .catch(async () => {
          // Offline navigation fallback: serve cached index.html
          const cached = await caches.match(event.request);
          if (cached) return cached;
          const fallback = await caches.match('/index.html') || await caches.match('/');
          if (fallback) return fallback;
          return new Response('Application Juz Amma Warsh - Hors-ligne', {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        })
    );
    return;
  }

  // 3. Application Assets (JS bundles, CSS, Fonts, Images, JSON): Network-First for main assets, Cache-First for versioned assets
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(event.request).then(cachedRes => {
        if (cachedRes) return cachedRes;
        return fetch(event.request).then(networkRes => {
          if (networkRes && networkRes.status === 200) {
            const copy = networkRes.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          }
          return networkRes;
        });
      })
    );
    return;
  }

  // 4. Default: Network with Cache Fallback
  event.respondWith(
    fetch(event.request)
      .then(networkRes => {
        if (networkRes && networkRes.status === 200) {
          const copy = networkRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return networkRes;
      })
      .catch(() => caches.match(event.request))
  );
});
