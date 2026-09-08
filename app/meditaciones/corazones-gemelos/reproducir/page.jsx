'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import MeditationPlayer from '@/components/MeditationPlayer';
import { getMeditationById } from '@/data/meditations';

/**
 * CORAZONES GEMELOS — Reproductor
 * -------------------------------------------------------------
 * Sólo accesible tras completar la preparación obligatoria. Comprueba la
 * marca guardada en sessionStorage; si no existe (por ejemplo, si alguien
 * entra por URL directa), devuelve a la pantalla de preparación.
 */
export default function ReproducirCorazonesPage() {
  const router = useRouter();
  const [autorizado, setAutorizado] = useState(false);
  const meditation = getMeditationById('corazones-gemelos');

  useEffect(() => {
    let preparado = false;
    try {
      preparado = sessionStorage.getItem('corazones-gemelos-preparado') === 'true';
    } catch {
      preparado = false;
    }
    if (preparado) {
      setAutorizado(true);
    } else {
      // Sin preparación previa: volvemos a la pantalla de preparación.
      router.replace('/meditaciones/corazones-gemelos');
    }
  }, [router]);

  if (!autorizado) {
    return (
      <main>
        <PageHeader title="Preparando tu meditación…" />
        <p className="px-5 text-sm text-ink-soft">Un momento, por favor.</p>
      </main>
    );
  }

  return (
    <main>
      <PageHeader title="Corazones Gemelos" subtitle={meditation?.maestro} />
      <MeditationPlayer meditation={meditation} />
    </main>
  );
}
