'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * useLocalStorage
 * -------------------------------------------------------------
 * Hook seguro para guardar datos en el dispositivo (localStorage).
 * - Compatible con el renderizado en servidor de Next.js (SSR): empieza
 *   con el valor inicial y "hidrata" el valor real al montar en el cliente.
 * - Envuelve todos los accesos en try/catch (ventanas privadas, permisos,
 *   etc. pueden hacer que localStorage falle).
 *
 * Devuelve: [valor, setValor, cargado]
 *   - cargado === true cuando ya se leyó el valor real del dispositivo.
 *
 * Nota: los datos se guardan SOLO en el navegador de la persona; no se
 * envían a ningún servidor. Para sincronizar entre dispositivos haría
 * falta conectar un backend.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw != null) setValue(JSON.parse(raw));
    } catch {
      /* almacenamiento no disponible */
    }
    setLoaded(true);
  }, [key]);

  const set = useCallback(
    (v) => {
      setValue((prev) => {
        const next = typeof v === 'function' ? v(prev) : v;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          /* almacenamiento no disponible */
        }
        return next;
      });
    },
    [key]
  );

  return [value, set, loaded];
}
