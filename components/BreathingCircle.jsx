'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

/**
 * BreathingCircle
 * -------------------------------------------------------------
 * Respiración guiada con animación suave: un círculo que se expande al
 * inhalar y se contrae al exhalar, con texto que acompaña cada fase.
 *
 * El ritmo (fases) se puede ajustar fácilmente en el array "fases".
 * dur = duración en milisegundos; scale = tamaño relativo del círculo.
 */
const fases = [
  { nombre: 'Inhala', dur: 4000, scale: 1 },
  { nombre: 'Sostén', dur: 4000, scale: 1 },
  { nombre: 'Exhala', dur: 6000, scale: 0.5 },
  { nombre: 'Descansa', dur: 2000, scale: 0.5 },
];

export default function BreathingCircle() {
  const [activo, setActivo] = useState(false);
  const [idx, setIdx] = useState(0);
  const [scale, setScale] = useState(0.5);
  const [transMs, setTransMs] = useState(600);
  const timer = useRef(null);

  useEffect(() => {
    if (!activo) return;

    const fase = fases[idx];
    // La animación del tamaño dura lo mismo que la fase (excepto en las
    // fases de "sostén", donde el círculo se mantiene).
    setTransMs(fase.nombre === 'Sostén' || fase.nombre === 'Descansa' ? 300 : fase.dur);
    setScale(fase.scale);

    timer.current = setTimeout(() => {
      setIdx((i) => (i + 1) % fases.length);
    }, fase.dur);

    return () => clearTimeout(timer.current);
  }, [activo, idx]);

  const toggle = () => {
    if (activo) {
      setActivo(false);
      clearTimeout(timer.current);
      setScale(0.5);
      setTransMs(600);
      setIdx(0);
    } else {
      setIdx(0);
      setActivo(true);
    }
  };

  const faseActual = activo ? fases[idx] : null;

  return (
    <div className="flex flex-col items-center">
      {/* Zona de la animación */}
      <div className="relative flex h-72 w-72 items-center justify-center">
        {/* Halos decorativos */}
        <span className="absolute h-full w-full rounded-full bg-sage-100/60" />
        <span className="absolute h-[78%] w-[78%] rounded-full bg-sage-200/50" />

        {/* Círculo que respira */}
        <div
          className="flex items-center justify-center rounded-full bg-gradient-to-br from-sage-300 to-sage-500 shadow-soft"
          style={{
            height: '60%',
            width: '60%',
            transform: `scale(${scale})`,
            transition: `transform ${transMs}ms ease-in-out`,
          }}
        >
          <span className="font-display text-xl font-semibold text-white drop-shadow">
            {faseActual ? faseActual.nombre : 'Respira'}
          </span>
        </div>
      </div>

      {/* Botón de control */}
      <button onClick={toggle} className="btn-primary mt-8">
        {activo ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        {activo ? 'Pausar' : 'Comenzar a respirar'}
      </button>

      <p className="mt-4 max-w-xs text-center text-sm text-ink-soft">
        Sigue el círculo: inhala mientras crece, sostén y exhala mientras se
        recoge. Deja que tu cuerpo encuentre el ritmo.
      </p>
    </div>
  );
}
