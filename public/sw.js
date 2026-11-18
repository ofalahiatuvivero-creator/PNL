/**
 * SERVICE WORKER (PWA) — estrategia SEGURA
 * -------------------------------------------------------------
 * Un service worker que cachea de más causaba páginas viejas tras cada
 * despliegue y, al fallar la red, servía el Inicio para cualquier ruta
 * (rompía la navegación con un error de hidratación).
 *
 * Esta versión:
 *   - NUNCA intercepta navegaciones (document) ni los datos de Next
 *     (/_next/...): siempre van a la red / al caché propio del navegador,
 *     así cada despliegue se ve fresco y sin mezclar páginas.
 *   - Solo cachea medios estáticos (imágenes, audio, fuentes) con
 *     "stale-while-revalidate" para que carguen rápido y offline.
 *   - Al activarse borra TODAS las cachés anteriores.
 *
 * Al cambiar la app, sube el número de versión.
 */
const CACHE = 'raices-v3';
const MEDIA = /\.(?:png|jpg|jpeg|webp|gif|svg|ico|mp3|wav|ogg|m4a|woff2?|ttf)$/i;

self.addEventListener('install', () => {
  self.skipWaiting();
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
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Navegaciones y datos de Next: NO tocar (siempre red). Evita servir una
  // página por otra y los desajustes tras un despliegue.
  if (req.mode === 'navigate') return;
  if (url.pathname.startsWith('/_next/')) return;

  // Solo medios estáticos: stale-while-revalidate.
  if (MEDIA.test(url.pathname)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        const cached = await cache.match(req);
        const red = fetch(req)
          .then((res) => {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
          })
          .catch(() => cached);
        return cached || red;
      })()
    );
  }
});
