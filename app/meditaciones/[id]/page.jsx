'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import MeditationPlayer from '@/components/MeditationPlayer';
import { getMeditationById } from '@/data/meditations';

/**
 * MEDITACIÓN — Reproductor genérico
 * -------------------------------------------------------------
 * Para meditaciones que NO requieren preparación previa. La meditación de
 * Corazones Gemelos tiene su propia ruta con pantalla de preparación
 * (/meditaciones/corazones-gemelos), que tiene prioridad sobre esta.
 */
export default function MeditacionGenericaPage() {
  const { id } = useParams();
  const meditation = getMeditationById(id);

  if (!meditation) {
    return (
      <main>
        <PageHeader title="Meditación no encontrada" />
        <div className="px-5">
          <Link href="/meditaciones" className="btn-primary">
            Ver meditaciones
          </Link>
        </div>
      </main>
    );
  }

  // Salvaguarda: si requiere preparación, no se reproduce aquí.
  if (meditation.requierePreparacion) {
    return (
      <main>
        <PageHeader title={meditation.titulo} />
        <div className="px-5">
          <p className="text-sm text-ink-soft">
            Esta meditación requiere una preparación previa.
          </p>
          <Link href={`/meditaciones/${meditation.id}`} className="btn-primary mt-4">
            Ir a la preparación
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <PageHeader title="Meditación" subtitle={meditation.maestro} />
      <MeditationPlayer meditation={meditation} />
    </main>
  );
}
