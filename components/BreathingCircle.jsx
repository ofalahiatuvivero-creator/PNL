'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Maximize2, X } from 'lucide-react';
import EsferaDeLuz from '@/components/EsferaDeLuz';

/**
 * BreathingCircle
 * -------------------------------------------------------------
 * Respiración guiada con la Esfera de Luz: la esfera se expande al
 * inhalar y se recoge al exhalar, con texto que acompaña cada fase.
 *
 * Añade:
 *   - Patrones de respiración (Calma 4-7-8, Caja, Coherencia, Relajar).
 *   - Modo inmersión: pantalla completa, atmósfera atenuada.
 *   - Vibración sutil al cambiar de fase (si el dispositivo lo permite).
 *
 * La lógica del ciclo es la misma: se recorre el array de fases en bucle.
 */
const PATRONES = [
  {
    id: '478',
    label: 'Calma 4·7·8',
    fases: [
      { nombre: 'Inhala', dur: 4000, escala: 1 },
      { nombre: 'Sostén', dur: 7000, escala: 1 },
      { nombre: 'Exhala', dur: 8000, escala: 0.55 },
    ],
  },
  {
    id: 'caja',
    label: 'Caja 4·4·4·4',
    fases: [
      { nombre: 'Inhala', dur: 4000, escala: 1 },
      { nombre: 'Sostén', dur: 4000, escala: 1 },
      { nombre: 'Exhala', dur: 4000, escala: 0.55 },
      { nombre: 'Descansa', dur: 4000, escala: 0.55 },
    ],
  },
  {
    id: 'coherencia',
    label: 'Coherencia 5·5',
    fases: [
      { nombre: 'Inhala', dur: 5000, escala: 1 },
      { nombre: 'Exhala', dur: 5000, escala: 0.55 },
    ],
  },
  {
    id: 'relajar',
    label: 'Relajar 4·6',
    fases: [
      { nombre: 'Inhala', dur: 4000, escala: 1 },
      { nombre: 'Exhala', dur: 6000, escala: 0.55 },
    ],
  },
];

function vibrar(ms) {
  try {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(ms);
  } catch {
    /* ignore */
  }
}

export default function BreathingCircle() {
  const [patronId, setPatronId] = useState('478');
  const [activo, setActivo] = useState(false);
  const [idx, setIdx] = useState(0);
  const [escala, setEscala] = useState(0.55);
  const [transMs, setTransMs] = useState(900);
  const [inmersion, setInmersion] = useState(false);
  const timer = useRef(null);

  const patron = PATRONES.find((p) => p.id === patronId) || PATRONES[0];
  const fases = patron.fases;

  useEffect(() => {
    if (!activo) return;
    const fase = fases[idx];

    // El tamaño cambia durante toda la fase (en "sostén"/"descansa" se queda).
    const mantiene = fase.nombre === 'Sostén' || fase.nombre === 'Descansa';
    setTransMs(mantiene ? 300 : fase.dur);
    setEscala(fase.escala);
    if (fase.nombre === 'Inhala') vibrar(18);
    else if (fase.nombre === 'Exhala') vibrar([12, 40, 12]);

    timer.current = setTimeout(() => {
      setIdx((i) => (i + 1) % fases.length);
    }, fase.dur);

    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activo, idx, patronId]);

  const toggle = () => {
    if (activo) {
      setActivo(false);
      clearTimeout(timer.current);
      setEscala(0.55);
      setTransMs(900);
      setIdx(0);
    } else {
      setIdx(0);
      setActivo(true);
    }
  };

  const cambiarPatron = (id) => {
    setPatronId(id);
    setIdx(0);
    setEscala(0.55);
    setTransMs(900);
  };

  const faseActual = activo ? fases[idx] : null;

  // Núcleo reutilizable (se usa en la tarjeta y en modo inmersión).
  const Esfera = ({ size }) => (
    <div className="relative flex items-center justify-center" style={{ height: size, width: size }}>
      <EsferaDeLuz
        size={size}
        modo="respiracion"
        escala={activo ? escala : 0.72}
        transMs={activo ? transMs : 900}
      />
      <span className="pointer-events-none absolute font-serif text-xl font-medium text-ink drop-shadow-sm">
        {faseActual ? faseActual.nombre : 'Respira'}
      </span>
    </div>
  );

  const SelectorPatron = (
    <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
      {PATRONES.map((p) => (
        <button
          key={p.id}
          onClick={() => cambiarPatron(p.id)}
          aria-pressed={p.id === patronId}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-display font-semibold transition-all duration-300 ease-agua ${
            p.id === patronId
              ? 'bg-sage-500 text-white shadow-glow'
              : 'glass text-ink-soft'
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      {SelectorPatron}

      {/* Zona de la esfera */}
      <div className="relative mt-8 flex h-72 w-72 items-center justify-center">
        {/* Anillos suaves de fondo */}
        <span className="absolute h-full w-full rounded-full border border-sage-200/40" />
        <span className="absolute h-[72%] w-[72%] rounded-full border border-sage-200/30" />
        <Esfera size={224} />
      </div>

      {/* Controles */}
      <div className="mt-8 flex items-center gap-3">
        <button onClick={toggle} className="btn-primary">
          {activo ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          {activo ? 'Pausar' : 'Comenzar a respirar'}
        </button>
        <button
          onClick={() => setInmersion(true)}
          aria-label="Modo inmersión"
          className="glass flex h-12 w-12 items-center justify-center rounded-full text-ink-soft transition-transform duration-300 ease-agua active:scale-95"
        >
          <Maximize2 className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-5 max-w-xs text-center text-sm text-ink-soft">
        Sigue la esfera: inhala mientras crece, sostén y exhala mientras se
        recoge. Deja que tu cuerpo encuentre el ritmo.
      </p>

      {/* MODO INMERSIÓN: pantalla completa, atmósfera atenuada */}
      {inmersion && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center animate-fade-in"
          style={{
            background:
              'radial-gradient(130% 90% at 50% 10%, var(--orb-c), transparent 55%),' +
              'radial-gradient(120% 90% at 50% 100%, var(--orb-a), transparent 55%),' +
              'var(--ground)',
          }}
        >
          <button
            onClick={() => setInmersion(false)}
            aria-label="Salir del modo inmersión"
            className="glass absolute right-5 top-[calc(env(safe-area-inset-top)+1.1rem)] flex h-11 w-11 items-center justify-center rounded-full text-ink-soft active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>

          <Esfera size={300} />

          <div className="mt-10">{SelectorPatron}</div>

          <button onClick={toggle} className="btn-primary mt-8">
            {activo ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            {activo ? 'Pausar' : 'Comenzar'}
          </button>
        </div>
      )}
    </div>
  );
}
