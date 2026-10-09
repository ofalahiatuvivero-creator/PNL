'use client';

import { useEffect, useRef, useState } from 'react';
import EsferaDeLuz from './EsferaDeLuz';

/**
 * Umbral — el ritual de entrada.
 * -------------------------------------------------------------
 * Al abrir la app (una vez por sesión), un velo breve con la esfera de
 * luz y "Respira. Ya estás aquí.". Dura ~3 s, se puede saltar tocando la
 * pantalla o "Entrar", y al salir la esfera se encoge y revela la app.
 *
 * Tocar "Entrar" (o cualquier parte) es también el primer gesto que deja
 * arrancar la música de fondo (los navegadores bloquean el autoplay).
 */
const KEY = 'raices-umbral';

export default function Umbral() {
  const [show, setShow] = useState(false);
  const [saliendo, setSaliendo] = useState(false);
  const cerrado = useRef(false);

  useEffect(() => {
    let visto = false;
    try {
      visto = sessionStorage.getItem(KEY) === '1';
    } catch {
      /* ignore */
    }
    if (visto) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setShow(true);
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => salir(), reduce ? 700 : 2900);
    return () => clearTimeout(t);
  }, []);

  const salir = () => {
    if (cerrado.current) return;
    cerrado.current = true;
    setSaliendo(true);
    setTimeout(() => setShow(false), 750);
  };

  if (!show) return null;

  return (
    <div
      onClick={salir}
      role="button"
      aria-label="Entrar a Raíces"
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 px-8 text-center transition-opacity duration-700 ease-agua ${
        saliendo ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background:
          'radial-gradient(130% 100% at 50% 35%, var(--mesh-3), var(--ground) 72%)',
      }}
    >
      <div
        className={`transition-transform duration-700 ease-agua ${
          saliendo ? 'scale-50' : 'scale-100'
        } animate-fade-in`}
      >
        <EsferaDeLuz size={200} modo="reposo" />
      </div>
      <div className="animate-fade-up" style={{ animationDelay: '150ms' }}>
        <p className="font-serif text-[2rem] font-light leading-snug text-ink">
          Respira.
          <br />
          Ya estás aquí.
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            salir();
          }}
          className="eyebrow mt-7 text-ink-light transition-colors hover:text-sage-600"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
