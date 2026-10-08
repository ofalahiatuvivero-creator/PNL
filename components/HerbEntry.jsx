'use client';

import { useState } from 'react';
import { ChevronDown, Leaf, Coffee, AlertTriangle } from 'lucide-react';

/**
 * HerbEntry
 * -------------------------------------------------------------
 * Ficha expandible (acordeón) de una planta de la Herbolaria. Muestra:
 *   - Para qué se usa (beneficios)
 *   - Cómo se prepara
 *   - Precauciones (resaltadas, por seguridad)
 *
 * Props:
 *   - herb: objeto de /data/herbs.js
 */
export default function HerbEntry({ herb }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-card">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left"
        aria-expanded={open}
      >
        <span className="min-w-0">
          <span className="block font-display text-base font-semibold text-ink">
            {herb.nombre}
          </span>
          <span className="mt-0.5 flex flex-wrap items-center gap-2">
            {herb.cientifico && (
              <span className="font-serif text-xs italic text-ink-light">{herb.cientifico}</span>
            )}
            {herb.categoria && (
              <span className="inline-block rounded-full bg-sage-50 px-2.5 py-0.5 text-[11px] font-medium text-sage-600">
                {herb.categoria}
              </span>
            )}
          </span>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-sage-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="space-y-4 px-4 pb-5 pt-1 animate-fade-up">
          <Bloque icon={Leaf} color="text-sage-600 bg-sage-100" titulo="Para qué ayuda" texto={herb.beneficios} />
          <Bloque icon={Coffee} color="text-sand-500 bg-sand-200" titulo="Cómo se prepara" texto={herb.preparacion} />

          {/* Precauciones resaltadas */}
          <div className="flex gap-3 rounded-2xl border border-terracotta-200 bg-terracotta-50 p-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-terracotta-100 text-terracotta-500">
              <AlertTriangle className="h-4 w-4" />
            </span>
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-wide text-terracotta-600">
                Precauciones
              </p>
              <p className="mt-1 text-sm leading-relaxed text-terracotta-600/90">
                {herb.precauciones}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Bloque({ icon: BlockIcon, color, titulo, texto }) {
  return (
    <div className="flex gap-3">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${color}`}>
        <BlockIcon className="h-4 w-4" />
      </span>
      <div>
        <p className="font-display text-xs font-bold uppercase tracking-wide text-ink-light">
          {titulo}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{texto}</p>
      </div>
    </div>
  );
}
