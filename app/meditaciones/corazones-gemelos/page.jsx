'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeartHandshake, ChevronRight, Sparkles } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import WarningBanner from '@/components/WarningBanner';
import PreparationChecklist from '@/components/PreparationChecklist';
import { warningText, preparationSteps } from '@/data/preparation';
import { getMeditationById } from '@/data/meditations';

/**
 * CORAZONES GEMELOS — Preparación obligatoria
 * -------------------------------------------------------------
 * REQUISITO CRÍTICO DE UX: antes de poder reproducir el audio, la persona
 * debe pasar por esta pantalla:
 *   1. Leer la advertencia de contraindicaciones.
 *   2. Completar (marcar) el checklist de ejercicios físicos previos.
 * El botón "Estoy listo/a" sólo se habilita cuando TODO está marcado.
 *
 * Al continuar guardamos una marca en sessionStorage para que el
 * reproductor sepa que la preparación se completó (si alguien entra por
 * URL directa al reproductor, se le devuelve a esta pantalla).
 */
export default function PreparacionCorazonesPage() {
  const router = useRouter();
  const [listo, setListo] = useState(false);
  const meditation = getMeditationById('corazones-gemelos');

  const continuar = () => {
    if (!listo) return;
    try {
      sessionStorage.setItem('corazones-gemelos-preparado', 'true');
    } catch {
      /* almacenamiento no disponible: continuamos igualmente */
    }
    router.push('/meditaciones/corazones-gemelos/reproducir');
  };

  return (
    <main>
      <PageHeader title="Preparación" subtitle={meditation?.titulo} />

      <div className="space-y-5 px-5 pb-6">
        {/* Presentación cálida */}
        <div className="flex items-center gap-4 rounded-3xl bg-terracotta-100 p-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-terracotta-400 text-white">
            <HeartHandshake className="h-6 w-6" />
          </span>
          <p className="text-sm leading-snug text-terracotta-600">
            Preparemos el cuerpo antes de comenzar. Estos pasos hacen que la
            meditación sea más segura y profunda.
          </p>
        </div>

        {/* Advertencia de contraindicaciones */}
        <WarningBanner texto={warningText} />

        {/* Checklist de ejercicios previos */}
        <div>
          <div className="mb-3 flex items-center gap-2 px-1">
            <Sparkles className="h-4 w-4 text-sage-500" />
            <h2 className="text-base font-bold text-ink">Ejercicios previos</h2>
          </div>
          <p className="mb-4 px-1 text-sm text-ink-soft">
            Realiza cada movimiento con suavidad y márcalo al terminar.
          </p>
          <PreparationChecklist steps={preparationSteps} onChange={setListo} />
        </div>

        {/* Botón de continuar (habilitado sólo si todo está marcado).
            Barra inferior opaca para que el contenido no se transparente. */}
        <div className="sticky bottom-24 -mx-5 border-t border-sand-200 bg-cream/95 px-5 py-3 backdrop-blur">
          <button onClick={continuar} disabled={!listo} className="btn-primary w-full">
            {listo ? 'Estoy listo/a, continuar' : 'Completa los ejercicios para continuar'}
            {listo && <ChevronRight className="h-5 w-5" />}
          </button>
          {!listo && (
            <p className="mt-2 text-center text-xs text-ink-light">
              El audio se habilitará al completar la preparación.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
