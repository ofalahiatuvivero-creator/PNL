'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, NotebookPen } from 'lucide-react';
import MoodPicker from '@/components/MoodPicker';
import { useLocalStorage } from '@/lib/storage';
import { getMood, moodMessages } from '@/data/moods';

/**
 * DailyCheckIn
 * -------------------------------------------------------------
 * Check-in de ánimo compacto para el Dashboard. Comparte el mismo
 * almacenamiento que el Diario ('raices-diario'):
 *   - Si aún no hay registro de hoy, muestra el selector; al elegir un
 *     estado guarda una entrada rápida y ofrece abrir el diario.
 *   - Si ya hay registro de hoy, muestra un resumen cálido.
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

  // Evita parpadeo mientras se hidrata desde el dispositivo.
  if (!loaded) {
    return <div className="card h-40 animate-pulse bg-white/60" aria-hidden />;
  }

  // Ya registrado hoy → resumen.
  if (entradaHoy || justSaved) {
    const m = getMood(justSaved || entradaHoy.mood);
    return (
      <div className="card">
        <div className="flex items-center gap-3">
          <span className="text-3xl leading-none">{m?.emoji}</span>
          <div>
            <p className="font-display text-sm font-semibold text-ink">
              Hoy te sientes: {m?.label}
            </p>
            <p className="text-xs text-ink-soft">
              {justSaved ? moodMessages[justSaved] : 'Gracias por registrarte.'}
            </p>
          </div>
        </div>
        <Link
          href="/diario"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage-50 py-2.5 font-display text-sm font-semibold text-sage-600 transition hover:bg-sage-100"
        >
          <NotebookPen className="h-4 w-4" />
          Escribir en mi diario
        </Link>
      </div>
    );
  }

  // Sin registro hoy → selector rápido.
  return (
    <div className="card">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-ink">¿Cómo te sientes hoy?</h2>
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
