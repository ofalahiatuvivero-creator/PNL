/**
 * SERVICE WORKER (PWA)
 * -------------------------------------------------------------
 * Estrategia "network-first": siempre intenta traer la versión más reciente
 * desde internet y, solo si no hay conexión, muestra lo guardado en caché.
 * Así la app funciona sin conexión, pero nunca se queda con contenido viejo
 * cuando sí hay internet.
 *
 * Al cambiar la app, sube este número de versión para limpiar la caché anterior.
 */
const CACHE = 'raices-v1';
const CORE = ['/'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).catch(() => {})
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Solo peticiones GET del mismo origen.
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone()).catch(() => {});
        return fresh;
      } catch {
        const cached = await caches.match(req);
        if (cached) return cached;
        if (req.mode === 'navigate') {
          const home = await caches.match('/');
          if (home) return home;
        }
        throw new Error('sin conexión');
      }
    })()
  );
});
