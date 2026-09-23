// PWA : service worker servi à la racine (/sw.js)
let swRegistration: ServiceWorkerRegistration | null = null;
let refreshing = false;

export function registerAppServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  // Reload page when new service worker takes over to guarantee latest UI
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    console.log('[PWA] New service worker activated, reloading for latest updates...');
    window.location.reload();
  });

  const register = () => {
    // Nettoyage : anciennes inscriptions sur /app-cache/ (elles ne contrôlaient aucune page)
    navigator.serviceWorker
      .getRegistrations()
      .then(regs => regs.filter(r => r.scope.endsWith('/app-cache/')).forEach(r => r.unregister()))
      .catch(() => {});

    // Service worker à la racine : il contrôle tout le site (hors-ligne)
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then(reg => {
        swRegistration = reg;
        console.log('[PWA] Service Worker registered successfully with scope:', reg.scope);

        // Check for updates on register
        reg.update().catch(() => {});

        // Check for updates when user returns to the tab
        window.addEventListener('focus', () => {
          reg.update().catch(() => {});
        });
      })
      .catch(err => {
        console.warn('[PWA] Service Worker registration unavailable in this context:', err);
      });
  };

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    register();
  } else {
    window.addEventListener('load', register);
  }
}

/**
 * Force clear old application caches and reload the fresh build
 */
export async function forcePurgeCacheAndReload(): Promise<void> {
  try {
    // 1. Delete all non-audio caches
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(k => !k.includes('audio')) // keep downloaded Quran audio safe
          .map(k => caches.delete(k))
      );
    }

    // 2. Unregister all service workers
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      for (const reg of regs) {
        await reg.unregister();
      }
    }

    // 3. Clear storage version flag
    localStorage.removeItem("warsh_build_ver");
  } catch (err) {
    console.warn('Could not clear caches manually:', err);
  } finally {
    // 4. Force browser to fetch fresh by appending timestamp parameter
    const cleanUrl = window.location.origin + window.location.pathname;
    window.location.href = `${cleanUrl}?nocache=${Date.now()}`;
  }
}

export async function checkPwaUpdates(): Promise<boolean> {
  if (!swRegistration) return false;
  try {
    await swRegistration.update();
    return true;
  } catch {
    return false;
  }
}

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
const installListeners = new Set<(canInstall: boolean) => void>();

export function initInstallPromptListener() {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    installListeners.forEach(cb => cb(true));
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    installListeners.forEach(cb => cb(false));
    console.log('PWA was installed successfully.');
  });
}

export function subscribeToInstallPrompt(callback: (canInstall: boolean) => void) {
  installListeners.add(callback);
  callback(deferredPrompt !== null);
  return () => {
    installListeners.delete(callback);
  };
}

export async function promptPwaInstall(): Promise<boolean> {
  if (!deferredPrompt) return false;
  try {
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    deferredPrompt = null;
    installListeners.forEach(cb => cb(false));
    return choice.outcome === 'accepted';
  } catch (err) {
    console.warn('Failed to prompt PWA install', err);
    return false;
  }
}
