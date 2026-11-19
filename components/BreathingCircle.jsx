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
 * La esfera se expande al inhalar y se recoge al exhalar. El tamaño se
 * anima FOTOGRAMA A FOTOGRAMA (requestAnimationFrame) actualizando una
 * variable CSS, para que crezca de verdad aunque el dispositivo tenga
 * activado "reducir movimiento" (que desactiva las transiciones CSS).
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
      { nombre: 'Inhala un poco más', dur: 1100, escala: 1.05 },
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
      { nombre: 'Inhala', dur: 5000, escala: 1.05 },
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
      { nombre: 'Inhala al vientre', dur: 4000, escala: 1.05 },
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

const REPOSO = 0.72;

function vibrar(ms) {
  try {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(ms);
  } catch {
    /* ignore */
  }
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * Esfera que respira. El tamaño lo controla la variable CSS --resp-escala
 * (heredada del contenedor), que el motor actualiza en cada fotograma.
 */
function EsferaRespira({ size, fase }) {
  return (
    <div className="relative flex items-center justify-center" style={{ height: size, width: size }}>
      <div
        className="flex items-center justify-center"
        style={{ transform: 'scale(var(--resp-escala, 0.72))', transformOrigin: 'center', willChange: 'transform' }}
      >
        <EsferaDeLuz size={size} modo="respiracion" escala={1} />
      </div>
      <span className="pointer-events-none absolute px-6 text-center font-serif text-xl font-medium text-ink drop-shadow-sm">
        {fase || 'Respira'}
      </span>
    </div>
  );
}

export default function BreathingCircle() {
  const [tecId, setTecId] = useState('suspiro');
  const [activo, setActivo] = useState(false);
  const [inmersion, setInmersion] = useState(false);
  const [faseTxt, setFaseTxt] = useState(null);
  const [duracionMin, setDuracionMin] = useState(0); // 0 = libre (sin cronómetro)
  const [restante, setRestante] = useState(null); // segundos restantes
  const [completo, setCompleto] = useState(false);
  const rootRef = useRef(null);
  const rafRef = useRef(0);
  const duracionRef = useRef(0);
  const segRef = useRef(-1);

  const tec = TECNICAS.find((t) => t.id === tecId) || TECNICAS[0];
  const esPatron = tec.tipo === 'patron';

  useEffect(() => {
    duracionRef.current = duracionMin;
  }, [duracionMin]);

  const setEscalaVar = (s) => {
    if (rootRef.current) rootRef.current.style.setProperty('--resp-escala', String(s));
  };

  // Reinicia al cambiar de técnica.
  useEffect(() => {
    setActivo(false);
    setFaseTxt(null);
    setEscalaVar(REPOSO);
  }, [tecId]);

  // Motor de respiración por fotogramas.
  useEffect(() => {
    if (!esPatron || !activo) {
      cancelAnimationFrame(rafRef.current);
      setEscalaVar(REPOSO);
      setFaseTxt(null);
      setRestante(null);
      return;
    }
    const fases = tec.fases;
    let idx = 0;
    let from = REPOSO;
    let to = fases[0].escala;
    let inicio = performance.now();
    const sesionInicio = inicio;
    const durMs = duracionRef.current * 60000;
    segRef.current = -1;
    if (durMs > 0) setRestante(duracionRef.current * 60);
    setFaseTxt(fases[0].nombre);
    vibrar(16);

    const step = (now) => {
      // Cronómetro de sesión (si hay duración elegida).
      if (durMs > 0) {
        const transcurrido = now - sesionInicio;
        const rem = Math.max(0, Math.ceil((durMs - transcurrido) / 1000));
        if (rem !== segRef.current) {
          segRef.current = rem;
          setRestante(rem);
        }
        if (transcurrido >= durMs) {
          setEscalaVar(REPOSO);
          setActivo(false);
          setCompleto(true);
          vibrar([30, 60, 30]);
          return;
        }
      }
      const fase = fases[idx];
      const t = Math.min(1, (now - inicio) / fase.dur);
      const s = from + (to - from) * easeInOut(t);
      setEscalaVar(s);
      if (t >= 1) {
        idx = (idx + 1) % fases.length;
        const sig = fases[idx];
        from = s;
        to = sig.escala;
        inicio = now;
        setFaseTxt(sig.nombre);
        if (/Inhala/.test(sig.nombre)) vibrar(16);
        else if (/Exhala/.test(sig.nombre)) vibrar([12, 40, 12]);
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activo, tecId, esPatron]);

  const toggle = () => {
    setCompleto(false);
    setActivo((a) => !a);
  };

  const Selector = (
    <div className="grid w-full max-w-sm grid-cols-2 gap-2">
      {TECNICAS.map((t) => (
        <button
          key={t.id}
          onClick={() => setTecId(t.id)}
          aria-pressed={t.id === tecId}
          className={`rounded-2xl px-3 py-2.5 text-sm font-display font-semibold transition-all duration-300 ease-agua ${
            t.id === tecId ? 'bg-sage-500 text-white shadow-glow' : 'glass text-ink-soft'
          }`}
        >
          {t.nombre}
        </button>
      ))}
    </div>
  );

  return (
    <div ref={rootRef} className="flex flex-col items-center" style={{ '--resp-escala': REPOSO }}>
      {Selector}

      {/* Propósito de la técnica */}
      <p className="mt-5 text-center font-serif text-lg font-light text-ink">{tec.para}</p>

      {esPatron ? (
        <>
          {/* Duración de la sesión (cronómetro opcional) */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
            <span className="mr-1 text-xs font-medium text-ink-light">Duración</span>
            {[0, 1, 3, 5].map((m) => (
              <button
                key={m}
                onClick={() => setDuracionMin(m)}
                aria-pressed={duracionMin === m}
                className={`rounded-full px-3 py-1 text-xs font-display font-semibold transition ${
                  duracionMin === m ? 'bg-sage-500 text-white shadow-glow' : 'glass text-ink-soft'
                }`}
              >
                {m === 0 ? 'Libre' : `${m} min`}
              </button>
            ))}
          </div>

          {/* Zona de la esfera */}
          <div className="relative mt-5 flex h-72 w-72 items-center justify-center">
            <span className="absolute h-full w-full rounded-full border border-sage-200/40" />
            <span className="absolute h-[72%] w-[72%] rounded-full border border-sage-200/30" />
            <EsferaRespira size={224} fase={faseTxt} />
          </div>

          {/* Cronómetro restante / sesión completa */}
          {activo && duracionMin > 0 && restante != null && (
            <p className="mt-3 font-display text-base font-semibold text-sage-600">
              {Math.floor(restante / 60)}:{String(restante % 60).padStart(2, '0')}
            </p>
          )}
          {completo && !activo && (
            <p className="mt-3 text-center font-serif text-base text-ink animate-fade-up">
              Sesión completa. Bien hecho.
            </p>
          )}

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
          <EsferaRespira size={300} fase={faseTxt} />

          <button onClick={toggle} className="btn-primary mt-10">
            {activo ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            {activo ? 'Pausar' : 'Comenzar'}
          </button>
        </div>
      )}
    </div>
  );
}
