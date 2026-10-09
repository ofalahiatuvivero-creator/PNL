'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, NotebookPen, Sparkles } from 'lucide-react';
import MoodPicker from '@/components/MoodPicker';
import MoodSphere from '@/components/MoodSphere';
import { useLocalStorage } from '@/lib/storage';
import { getMood, moodMessages } from '@/data/moods';

/**
 * DailyCheckIn
 * -------------------------------------------------------------
 * Check-in de ánimo del Inicio. Comparte almacenamiento con el Diario.
 * Al elegir, la esfera se ilumina, el fondo se tiñe sutilmente y aparece
 * una sugerencia amable que enlaza a algo existente en la app.
 */
function claveFecha(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function DailyCheckIn() {
  const [entries, setEntries, loaded] = useLocalStorage('raices-diario', []);
  const [justSaved, setJustSaved] = useState(null);

  const hoy = claveFecha(new Date());
  const entradaHoy = useMemo(
    () => entries.find((e) => e.fecha === hoy && e.mood),
    [entries, hoy]
  );

  const registrar = (moodId) => {
    const entrada = {
      id: `e-${Date.now()}`,
      fecha: hoy,
      ts: Date.now(),
      mood: moodId,
      nota: '',
    };
    setEntries((prev) => [entrada, ...prev]);
    setJustSaved(moodId);
  };

  if (!loaded) {
    return <div className="card h-44 animate-pulse" aria-hidden />;
  }

  if (entradaHoy || justSaved) {
    const m = getMood(justSaved || entradaHoy.mood);
    const sug = m?.sugerencia;
    return (
      <>
        {/* Tinte sutil del fondo con el color del ánimo */}
        {justSaved && m?.esfera && (
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 animate-fade-in"
            style={{
              zIndex: -5,
              background: `radial-gradient(90% 55% at 50% 18%, ${m.esfera[1]}33, transparent 70%)`,
            }}
          />
        )}
        <div className="card">
          <div className="flex items-center gap-3">
            <MoodSphere mood={m} active size={44} />
            <div>
              <p className="font-display text-sm font-semibold text-ink">
                Hoy te sientes: {m?.label}
              </p>
              <p className="text-xs text-ink-soft">
                {justSaved ? moodMessages[justSaved] : 'Gracias por registrarte.'}
              </p>
            </div>
          </div>

          {sug && (
            <Link
              href={sug.href}
              className="mt-4 flex items-center gap-3 rounded-2xl bg-sage-100 p-3 transition-all duration-300 ease-agua hover:bg-sage-200 active:scale-[0.99]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-500 text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1 text-sm font-medium text-ink">
                {sug.texto}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-sage-600" />
            </Link>
          )}

          <Link
            href="/diario"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full py-2.5 font-display text-sm font-semibold text-sage-600 transition hover:bg-sage-50"
          >
            <NotebookPen className="h-4 w-4" />
            Escribir en mi diario
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-xl font-light text-ink">
          ¿Cómo te sientes hoy?
        </h2>
        <Link
          href="/diario"
          className="inline-flex items-center text-xs font-display font-semibold text-sage-600"
        >
          Mi diario
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <MoodPicker value={null} onSelect={registrar} />
    </div>
  );
}
