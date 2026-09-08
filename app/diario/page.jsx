'use client';

import { useMemo, useState } from 'react';
import { Flame, Trash2, PenLine, Check } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import MoodPicker from '@/components/MoodPicker';
import { useLocalStorage } from '@/lib/storage';
import { getMood, moodMessages } from '@/data/moods';

/**
 * MI ESPACIO — Diario emocional
 * -------------------------------------------------------------
 * Un rincón privado para registrar cómo te sientes y soltar lo que llevas
 * dentro. Todo se guarda en el propio dispositivo (localStorage): no se
 * envía a ningún servidor.
 *
 * Incluye:
 *   - Check-in de ánimo (emoji).
 *   - Nota / gratitud del día.
 *   - Racha de días consecutivos.
 *   - Historial de entradas (con opción de borrar).
 */

// Clave de fecha local en formato AAAA-MM-DD.
function claveFecha(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatoLargo(fecha) {
  const d = new Date(`${fecha}T00:00:00`);
  const s = d.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' });
  return s.charAt(0).toUpperCase() + s.slice(1); // solo la primera letra
}

// Racha de días consecutivos con al menos una entrada (terminando hoy o ayer).
function calcularRacha(entries) {
  const dias = [...new Set(entries.map((e) => e.fecha))].sort().reverse();
  if (!dias.length) return 0;
  const hoy = claveFecha(new Date());
  const ayer = claveFecha(new Date(Date.now() - 86400000));
  if (dias[0] !== hoy && dias[0] !== ayer) return 0;
  let racha = 1;
  for (let i = 1; i < dias.length; i++) {
    const diff = Math.round(
      (new Date(dias[i - 1]) - new Date(dias[i])) / 86400000
    );
    if (diff === 1) racha++;
    else break;
  }
  return racha;
}

export default function DiarioPage() {
  const [entries, setEntries, loaded] = useLocalStorage('raices-diario', []);
  const [mood, setMood] = useState(null);
  const [nota, setNota] = useState('');
  const [mensaje, setMensaje] = useState('');

  const racha = useMemo(() => calcularRacha(entries), [entries]);

  const guardar = () => {
    if (!mood && !nota.trim()) return;
    const entrada = {
      id: `e-${Date.now()}`,
      fecha: claveFecha(new Date()),
      ts: Date.now(),
      mood,
      nota: nota.trim(),
    };
    setEntries((prev) => [entrada, ...prev]);
    setMensaje(mood ? moodMessages[mood] : 'Guardado. Gracias por dedicarte este momento.');
    setMood(null);
    setNota('');
  };

  const borrar = (id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <main>
      <PageHeader
        title="Mi Espacio"
        subtitle="Tu diario privado. Aquí puedes soltar, agradecer y observarte con cariño."
        back={false}
      />

      <div className="space-y-6 px-5 pb-6">
        {/* Racha */}
        {racha > 0 && (
          <div className="flex items-center gap-3 rounded-3xl bg-terracotta-100 p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-terracotta-400 text-white">
              <Flame className="h-5 w-5" />
            </span>
            <p className="text-sm text-terracotta-600">
              Llevas <strong>{racha}</strong> {racha === 1 ? 'día' : 'días'} cuidándote.
              Qué constancia tan bonita. 🌱
            </p>
          </div>
        )}

        {/* Check-in */}
        <section className="card">
          <h2 className="text-lg font-bold text-ink">¿Cómo te sientes hoy?</h2>
          <p className="mt-1 text-sm text-ink-soft">
            No hay respuestas correctas. Solo escúchate.
          </p>
          <div className="mt-4">
            <MoodPicker value={mood} onSelect={setMood} />
          </div>

          {/* Nota / gratitud */}
          <div className="mt-5">
            <label className="mb-2 flex items-center gap-2 font-display text-sm font-semibold text-ink">
              <PenLine className="h-4 w-4 text-sage-500" />
              ¿Qué quieres soltar o agradecer?
            </label>
            <textarea
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              rows={4}
              placeholder="Escribe libremente… nadie más lo leerá."
              className="w-full resize-none rounded-2xl border border-sand-200 bg-white p-3 text-sm text-ink placeholder:text-ink-light focus:border-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-100"
            />
          </div>

          <button
            onClick={guardar}
            disabled={!mood && !nota.trim()}
            className="btn-primary mt-4 w-full"
          >
            <Check className="h-5 w-5" />
            Guardar en mi diario
          </button>

          {mensaje && (
            <p className="mt-3 rounded-2xl bg-sage-50 px-4 py-3 text-center text-sm text-sage-700 animate-fade-up">
              {mensaje}
            </p>
          )}
        </section>

        {/* Historial */}
        <section>
          <h2 className="mb-3 px-1 text-lg font-bold text-ink">Tus entradas</h2>

          {!loaded ? (
            <p className="px-1 text-sm text-ink-light">Cargando…</p>
          ) : entries.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-sand-200 p-8 text-center">
              <p className="text-sm text-ink-soft">
                Aún no has escrito nada. Tu primera entrada te espera cuando
                estés listo/a. 🌿
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {entries.map((e) => {
                const m = getMood(e.mood);
                return (
                  <li key={e.id} className="rounded-3xl bg-white p-4 shadow-card">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {m && <span className="text-xl leading-none">{m.emoji}</span>}
                        <div>
                          {m && (
                            <p className="font-display text-sm font-semibold text-ink">
                              {m.label}
                            </p>
                          )}
                          <p className="text-xs text-ink-light">
                            {formatoLargo(e.fecha)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => borrar(e.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-light transition hover:bg-terracotta-50 hover:text-terracotta-500"
                        aria-label="Borrar entrada"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    {e.nota && (
                      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink-soft">
                        {e.nota}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <p className="rounded-2xl bg-sand-100 px-4 py-3 text-center text-xs leading-relaxed text-ink-light">
          🔒 Tus entradas se guardan solo en este dispositivo, de forma privada.
        </p>
      </div>
    </main>
  );
}
