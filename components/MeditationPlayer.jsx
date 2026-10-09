'use client';

import { useState } from 'react';
import AudioPlayer from '@/components/AudioPlayer';
import EsferaDeLuz from '@/components/EsferaDeLuz';

/**
 * MeditationPlayer
 * -------------------------------------------------------------
 * Pantalla de reproducción inmersiva: la Esfera de Luz es el centro de la
 * escena y late suavemente mientras suena el audio. Debajo, el reproductor
 * HTML5 con sus controles.
 *
 * Props:
 *   - meditation: objeto de /data/meditations.js
 */
export default function MeditationPlayer({ meditation }) {
  const [sonando, setSonando] = useState(false);

  return (
    <div className="px-5 pb-8">
      {/* Escena serena con la esfera */}
      <div className="relative mb-6 flex flex-col items-center overflow-hidden rounded-4xl p-8 text-center">
        {/* Aurora de fondo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 50% 0%, var(--orb-c), transparent 60%),' +
              'radial-gradient(120% 90% at 50% 100%, var(--orb-a), transparent 60%)',
            opacity: 0.6,
          }}
        />
        <div className="relative">
          <EsferaDeLuz size={168} modo={sonando ? 'reposo' : 'audio'} />
        </div>
        <h2 className="relative mt-6 font-serif text-2xl font-medium leading-tight text-ink">
          {meditation.titulo}
        </h2>
        <p className="relative mt-2 text-sm text-ink-soft">{meditation.maestro}</p>
        <p className="relative mt-1 text-xs text-ink-light">{meditation.duracion}</p>
      </div>

      {/* Reproductor */}
      <AudioPlayer src={meditation.src} onPlayingChange={setSonando} />

      {/* Acompañamiento cálido */}
      <p className="mt-6 text-center text-sm leading-relaxed text-ink-soft">
        Ponte cómodo/a, cierra los ojos si lo deseas y permítete recibir.
        Estamos aquí, acompañándote.
      </p>
    </div>
  );
}
