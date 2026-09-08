'use client';

import { useEffect } from 'react';

/**
 * ServiceWorkerRegister
 * -------------------------------------------------------------
 * Registra el service worker (/sw.js) que hace instalable la app y le da
 * soporte sin conexión. No muestra nada en pantalla.
 * Falla en silencio en navegadores que no lo soporten.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        /* el navegador no permite service workers en este contexto */
      });
    };
    if (document.readyState === 'complete') register();
    else {
      window.addEventListener('load', register);
      return () => window.removeEventListener('load', register);
    }
  }, []);

  return null;
}
