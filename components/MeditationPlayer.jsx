import AudioPlayer from '@/components/AudioPlayer';

/**
 * MeditationPlayer
 * -------------------------------------------------------------
 * Pantalla de reproducción de una meditación: portada calmada con el
 * título y el maestro, y el reproductor de audio HTML5.
 *
 * Props:
 *   - meditation: objeto de /data/meditations.js
 */
export default function MeditationPlayer({ meditation }) {
  return (
    <div className="px-5 pb-8">
      {/* Portada serena */}
      <div className="relative mb-6 flex h-56 flex-col items-center justify-center overflow-hidden rounded-4xl bg-gradient-to-br from-sage-400 to-terracotta-300 p-6 text-center text-white shadow-soft">
        <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <span className="pointer-events-none absolute -bottom-14 -left-8 h-44 w-44 rounded-full bg-white/10" />
        <h2 className="relative font-serif text-2xl font-bold leading-tight">
          {meditation.titulo}
        </h2>
        <p className="relative mt-2 text-sm text-white/90">{meditation.maestro}</p>
        <p className="relative mt-1 text-xs text-white/70">{meditation.duracion}</p>
      </div>

      {/* Reproductor */}
      <AudioPlayer src={meditation.src} />

      {/* Acompañamiento cálido */}
      <p className="mt-6 text-center text-sm leading-relaxed text-ink-soft">
        Ponte cómodo/a, cierra los ojos si lo deseas y permítete recibir.
        Estamos aquí, acompañándote. 🌿
      </p>
    </div>
  );
}
