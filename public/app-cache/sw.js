// Ancien emplacement du service worker (remplacé par /sw.js le 23/09/2026).
// Ce script se désinstalle de lui-même s'il est encore enregistré sur un appareil.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil(self.registration.unregister());
});
