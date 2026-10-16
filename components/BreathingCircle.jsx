'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Maximize2, X } from 'lucide-react';
import EsferaDeLuz from '@/components/EsferaDeLuz';
import WimHof from '@/components/WimHof';

/**
 * BreathingCircle
 * -------------------------------------------------------------
 * Respiración guiada con la Esfera de Luz. Técnicas reales:
 *   - Suspiro fisiológico (calma rápida)
 *   - Coherencia cardíaca (equilibrio)
 *   - Diafragmática (soltar tensión)
 *   - Wim Hof (energía, por rondas) -> componente aparte con su aviso.
 *
 * La esfera se expande al inhalar y se recoge al exhalar. Incluye modo
 * inmersión y vibración suave al cambiar de fase.
 */
const TECNICAS = [
  {
    id: 'suspiro',
    nombre: 'Suspiro fisiológico',
    para: 'Calma rápida',
    desc: 'Dos inhalaciones por la nariz (una grande y otra corta de remate) y una exhalación larga por la boca. Repite varias veces.',
    tipo: 'patron',
    fases: [
      { nombre: 'Inhala', dur: 2500, escala: 0.92 },
      { nombre: 'Inhala un poco más', dur: 1100, escala: 1 },
      { nombre: 'Exhala largo', dur: 6500, escala: 0.5 },
    ],
  },
  {
    id: 'coherencia',
    nombre: 'Coherencia cardíaca',
    para: 'Equilibrio y claridad',
    desc: 'Seis respiraciones por minuto. Inhala y exhala parejo, sin esfuerzo. Lo ideal: unos 5 minutos.',
    tipo: 'patron',
    fases: [
      { nombre: 'Inhala', dur: 5000, escala: 1 },
      { nombre: 'Exhala', dur: 5000, escala: 0.5 },
    ],
  },
  {
    id: 'diafragmatica',
    nombre: 'Diafragmática',
    para: 'Soltar tensión',
    desc: 'Lleva el aire al vientre, no al pecho. La exhalación más larga que la inhalación activa la calma.',
    tipo: 'patron',
    fases: [
      { nombre: 'Inhala al vientre', dur: 4000, escala: 1 },
      { nombre: 'Exhala largo', dur: 6000, escala: 0.5 },
    ],
  },
  {
    id: 'wimhof',
    nombre: 'Wim Hof',
    para: 'Energía y vitalidad',
    tipo: 'wimhof',
  },
];

function vibrar(ms) {
  try {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(ms);
  } catch {
    /* ignore */
  }
}

/**
 * Esfera a nivel de módulo (identidad estable) para que la transición de
 * escala anime de verdad en vez de reiniciarse en cada render.
 */
function EsferaRespira({ size, activo, escala, transMs, fase }) {
  return (
    <div className="relative flex items-center justify-center" style={{ height: size, width: size }}>
      <EsferaDeLuz
        size={size}
        modo="respiracion"
        escala={activo ? escala : 0.72}
        transMs={activo ? transMs : 900}
      />
      <span className="pointer-events-none absolute px-6 text-center font-serif text-xl font-medium text-ink drop-shadow-sm">
        {fase || 'Respira'}
      </span>
    </div>
  );
}

export default function BreathingCircle() {
  const [tecId, setTecId] = useState('suspiro');
  const [activo, setActivo] = useState(false);
  const [idx, setIdx] = useState(0);
  const [escala, setEscala] = useState(0.72);
  const [transMs, setTransMs] = useState(900);
  const [inmersion, setInmersion] = useState(false);
  const timer = useRef(null);

  const tec = TECNICAS.find((t) => t.id === tecId) || TECNICAS[0];
  const esPatron = tec.tipo === 'patron';
  const fases = esPatron ? tec.fases : [];

  // Motor de patrón: recorre las fases en bucle.
  useEffect(() => {
    if (!esPatron || !activo) return;
    const f = fases[idx];
    setTransMs(f.dur);
    setEscala(f.escala);
    if (/Inhala/.test(f.nombre)) vibrar(16);
    else if (/Exhala/.test(f.nombre)) vibrar([12, 40, 12]);
    timer.current = setTimeout(() => setIdx((i) => (i + 1) % fases.length), f.dur);
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activo, idx, tecId]);

  // Al cambiar de técnica, reinicia el estado del motor de patrón.
  useEffect(() => {
    setActivo(false);
    setIdx(0);
    setEscala(0.72);
    setTransMs(900);
    clearTimeout(timer.current);
  }, [tecId]);

  const toggle = () => {
    if (activo) {
      setActivo(false);
      clearTimeout(timer.current);
      setEscala(0.72);
      setTransMs(900);
      setIdx(0);
    } else {
      setIdx(0);
      setActivo(true);
    }
  };

  const faseActual = activo ? fases[idx]?.nombre : null;

  const Selector = (
    <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
      {TECNICAS.map((t) => (
        <button
          key={t.id}
          onClick={() => setTecId(t.id)}
          aria-pressed={t.id === tecId}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-display font-semibold transition-all duration-300 ease-agua ${
            t.id === tecId ? 'bg-sage-500 text-white shadow-glow' : 'glass text-ink-soft'
          }`}
        >
          {t.nombre}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      {Selector}

      {/* Propósito de la técnica */}
      <p className="mt-4 text-center font-serif text-lg font-light text-ink">
        {tec.para}
      </p>

      {esPatron ? (
        <>
          {/* Zona de la esfera */}
          <div className="relative mt-5 flex h-72 w-72 items-center justify-center">
            <span className="absolute h-full w-full rounded-full border border-sage-200/40" />
            <span className="absolute h-[72%] w-[72%] rounded-full border border-sage-200/30" />
            <EsferaRespira size={224} activo={activo} escala={escala} transMs={transMs} fase={faseActual} />
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

          <p className="mt-5 max-w-xs text-center text-sm text-ink-soft">{tec.desc}</p>
        </>
      ) : (
        <div className="mt-6 w-full max-w-sm">
          <WimHof respiraciones={30} rondas={3} recuperacion={15} />
        </div>
      )}

      {/* MODO INMERSIÓN (solo para técnicas de patrón) */}
      {inmersion && esPatron && (
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

          <p className="mb-6 font-serif text-lg font-light text-ink-soft">{tec.para}</p>
          <EsferaRespira size={300} activo={activo} escala={escala} transMs={transMs} fase={faseActual} />

          <button onClick={toggle} className="btn-primary mt-10">
            {activo ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            {activo ? 'Pausar' : 'Comenzar'}
          </button>
        </div>
      )}
    </div>
  );
}
