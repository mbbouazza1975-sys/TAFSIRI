// Service worker de l'application, servi à la racine (/sw.js) pour contrôler tout le site.
// (L'hébergement ai.studio n'envoie pas l'en-tête Service-Worker-Allowed : un script placé
//  dans /app-cache/ ne pouvait contrôler que /app-cache/, donc aucune page — pas de hors-ligne.)

const CACHE_VERSION = 'v8-20260923';
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
      for (const asset of STATIC_ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn('[SW] Pre-caching asset failed:', asset, err);
        }
      }
    })
  );
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
      return self.clients.matchAll({ type: 'window' }).then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'SW_UPDATED', version: CACHE_VERSION });
        });
      });
    })
  );
});

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

  // Skip non-http requests
  if (!url.protocol.startsWith('http')) return;

  // 1. Audio requests: Cache-First for downloaded audios
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

  // 2. All other assets (HTML, JS, CSS, JSON, images): Always Network-First (Never serve stale code)
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
        // Fallback to cache ONLY when offline
        const cached = await caches.match(event.request);
        if (cached) return cached;
        if (event.request.mode === 'navigate') {
          const fallbackHtml = await caches.match('/index.html') || await caches.match('/');
          if (fallbackHtml) return fallbackHtml;
        }
        return new Response('Hors-ligne', { status: 503, statusText: 'Offline' });
      })
  );
});
