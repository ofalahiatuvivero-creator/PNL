'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Brain, Sprout, Sparkles } from 'lucide-react';

/**
 * DictionaryEntry
 * -------------------------------------------------------------
 * Tarjeta expandible (acordeón) de una entrada del diccionario
 * bio-emocional. Muestra:
 *   - Patrón de pensamiento que la causa
 *   - Nuevo modelo mental (creencia sanadora)
 *   - Acción PNL recomendada (con enlace al ejercicio si existe)
 *
 * Props:
 *   - entry: objeto del diccionario
 */
export default function DictionaryEntry({ entry }) {
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
            {entry.nombre}
          </span>
          {entry.sistema && (
            <span className="mt-1 inline-block rounded-full bg-sage-50 px-2.5 py-0.5 text-[11px] font-medium text-sage-600">
              {entry.sistema}
            </span>
          )}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-sage-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="space-y-4 px-4 pb-5 pt-1 animate-fade-up">
          {/* Patrón de pensamiento */}
          <Bloque
            icon={Brain}
            color="text-terracotta-500 bg-terracotta-100"
            titulo="Patrón que lo origina"
            texto={entry.patron}
          />
          {/* Nuevo modelo mental */}
          <Bloque
            icon={Sprout}
            color="text-sage-600 bg-sage-100"
            titulo="Nuevo modelo mental"
            texto={entry.nuevoModelo}
          />
          {/* Acción PNL */}
          <Bloque
            icon={Sparkles}
            color="text-sand-500 bg-sand-200"
            titulo="Acción PNL"
            texto={entry.accionPNL}
          />

          {entry.ejercicioId && (
            <Link
              href={`/ejercicios/${entry.ejercicioId}`}
              className="btn-secondary w-full"
            >
              Practicar el ejercicio recomendado
            </Link>
          )}
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
