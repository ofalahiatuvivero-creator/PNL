'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Square, RotateCcw, Wind } from 'lucide-react';
import EsferaDeLuz from '@/components/EsferaDeLuz';
import WarningBanner from '@/components/WarningBanner';

/**
 * WimHof
 * -------------------------------------------------------------
 * Sesión guiada del método Wim Hof por rondas:
 *   1. ~30 respiraciones profundas y rápidas (la esfera late).
 *   2. Sueltas el aire y aguantas sin aire (cronómetro que sube) hasta que
 *      sientas la necesidad de respirar → "Ya necesito respirar".
 *   3. Inhalas profundo y aguantas 15 s (cuenta atrás).
 * Se repiten varias rondas. Incluye aviso de seguridad obligatorio.
 *
 * Nota: es una guía de bienestar, no una indicación médica.
 */
const AVISO =
  'Practícala sentada o acostada, nunca de pie, en el agua o conduciendo: puedes marearte. ' +
  'Evítala si estás embarazada o tienes epilepsia, problemas de corazón o presión alta. ' +
  'Si te mareas, vuelve a tu respiración normal y descansa.';

function vibrar(ms) {
  try {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(ms);
  } catch {
    /* ignore */
  }
}

export default function WimHof({ respiraciones = 30, rondas = 3, recuperacion = 15 }) {
  const [fase, setFase] = useState('intro'); // intro | respirando | reten | recupera | fin
  const [ronda, setRonda] = useState(1);
  const [conteo, setConteo] = useState(0); // respiración actual
  const [retenSeg, setRetenSeg] = useState(0);
  const [recupSeg, setRecupSeg] = useState(recuperacion);
  const [escala, setEscala] = useState(0.6);
  const [transMs, setTransMs] = useState(1500);
  const [texto, setTexto] = useState('Prepárate');
  const timer = useRef(null);

  // FASE: respiraciones rápidas
  useEffect(() => {
    if (fase !== 'respirando') return;
    let n = 0;
    let inhalando = true;
    const paso = () => {
      if (inhalando) {
        setTexto('Inhala');
        setEscala(1);
        setTransMs(1500);
        vibrar(14);
      } else {
        setTexto('Suelta');
        setEscala(0.55);
        setTransMs(1300);
        n += 1;
        setConteo(n);
        if (n >= respiraciones) {
          timer.current = setTimeout(() => setFase('reten'), 1300);
          return;
        }
      }
      inhalando = !inhalando;
      timer.current = setTimeout(paso, inhalando ? 1500 : 1300);
    };
    setConteo(0);
    timer.current = setTimeout(paso, 150);
    return () => clearTimeout(timer.current);
  }, [fase, ronda, respiraciones]);

  // FASE: retención sin aire (cronómetro que sube)
  useEffect(() => {
    if (fase !== 'reten') return;
    setTexto('Suelta el aire y aguanta');
    setEscala(0.4);
    setTransMs(2200);
    setRetenSeg(0);
    vibrar([20, 60, 20]);
    const id = setInterval(() => setRetenSeg((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [fase, ronda]);

  // FASE: recuperación (inhala y aguanta, cuenta atrás)
  useEffect(() => {
    if (fase !== 'recupera') return;
    setTexto('Inhala profundo y aguanta');
    setEscala(1);
    setTransMs(2500);
    setRecupSeg(recuperacion);
    vibrar(30);
    const id = setInterval(() => {
      setRecupSeg((s) => {
        if (s <= 1) {
          clearInterval(id);
          setTimeout(() => {
            if (ronda >= rondas) setFase('fin');
            else {
              setRonda((r) => r + 1);
              setFase('respirando');
            }
          }, 0);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [fase, ronda, rondas, recuperacion]);

  const empezar = () => {
    setRonda(1);
    setConteo(0);
    setFase('respirando');
  };
  const detener = () => {
    clearTimeout(timer.current);
    setFase('intro');
    setEscala(0.6);
    setTransMs(1500);
    setTexto('Prepárate');
  };

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // Texto grande dentro de la esfera según la fase
  const dentro =
    fase === 'respirando'
      ? texto
      : fase === 'reten'
      ? fmt(retenSeg)
      : fase === 'recupera'
      ? `${recupSeg}s`
      : 'Wim Hof';

  const sub =
    fase === 'respirando'
      ? `Respiración ${conteo} / ${respiraciones}`
      : fase === 'reten'
      ? 'Aguanta sin aire, con calma'
      : fase === 'recupera'
      ? 'Mantén el aire dentro'
      : '';

  return (
    <div className="flex flex-col items-center">
      {/* Indicador de ronda */}
      {fase !== 'intro' && fase !== 'fin' && (
        <p className="eyebrow mb-2 text-sage-600">
          Ronda {ronda} de {rondas}
        </p>
      )}

      {/* Esfera */}
      <div className="relative flex h-72 w-72 items-center justify-center">
        <span className="absolute h-full w-full rounded-full border border-sage-200/40" />
        <span className="absolute h-[72%] w-[72%] rounded-full border border-sage-200/30" />
        <div className="relative flex items-center justify-center" style={{ height: 224, width: 224 }}>
          <EsferaDeLuz
            size={224}
            modo="respiracion"
            escala={fase === 'intro' ? 0.72 : escala}
            transMs={fase === 'intro' ? 900 : transMs}
          />
          <span className="pointer-events-none absolute px-6 text-center font-serif text-2xl font-medium text-ink drop-shadow-sm">
            {dentro}
          </span>
        </div>
      </div>
      {sub && <p className="mt-3 text-sm text-ink-soft">{sub}</p>}

      {/* Controles por fase */}
      {fase === 'intro' && (
        <div className="mt-6 w-full">
          <WarningBanner titulo="Antes de empezar" texto={AVISO} />
          <button onClick={empezar} className="btn-primary mt-4 w-full">
            <Play className="h-5 w-5" />
            Empezar ronda 1
          </button>
          <p className="mt-3 text-center text-xs text-ink-light">
            {rondas} rondas · {respiraciones} respiraciones · retención libre
          </p>
        </div>
      )}

      {fase === 'respirando' && (
        <button onClick={detener} className="btn-secondary mt-6">
          <Square className="h-4 w-4" />
          Detener
        </button>
      )}

      {fase === 'reten' && (
        <div className="mt-6 flex w-full flex-col items-center gap-3">
          <button onClick={() => setFase('recupera')} className="btn-primary w-full">
            <Wind className="h-5 w-5" />
            Ya necesito respirar
          </button>
          <button onClick={detener} className="text-sm font-display font-semibold text-ink-light">
            Detener sesión
          </button>
        </div>
      )}

      {fase === 'recupera' && (
        <button onClick={detener} className="btn-secondary mt-6">
          <Square className="h-4 w-4" />
          Detener
        </button>
      )}

      {fase === 'fin' && (
        <div className="mt-6 w-full text-center animate-fade-up">
          <p className="font-serif text-xl font-medium text-ink">Lo lograste 🌬️</p>
          <p className="mt-2 text-sm text-ink-soft">
            Completaste {rondas} rondas. Quédate un momento notando cómo te sientes.
          </p>
          <button onClick={empezar} className="btn-primary mt-5 w-full">
            <RotateCcw className="h-5 w-5" />
            Repetir
          </button>
        </div>
      )}
    </div>
  );
}
