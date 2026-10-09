'use client';

/**
 * MoodSphere
 * -------------------------------------------------------------
 * Pequeña esfera de luz con el color de cada emoción (reemplaza los
 * emojis del check-in). "Ansioso/a" tiembla muy levemente.
 * Es decorativa; el nombre de la emoción lo da el botón que la envuelve.
 *
 * Props: mood (objeto con .esfera [a,b] y .id), active, size (px)
 */
export default function MoodSphere({ mood, active = false, size = 52 }) {
  const [a, b] = mood?.esfera || ['#CDEBDF', '#9DC5B0'];
  const tiembla = mood?.id === 'ansioso';

  return (
    <span
      className="relative inline-flex items-center justify-center"
      style={{
        width: size,
        height: size,
        animation: tiembla ? 'temblor 2.6s ease-in-out infinite' : undefined,
      }}
      aria-hidden="true"
    >
      {active && (
        <span
          className="absolute rounded-full"
          style={{
            inset: '-24%',
            background: `radial-gradient(circle, ${b}, transparent 70%)`,
            filter: 'blur(7px)',
            opacity: 0.6,
          }}
        />
      )}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 34% 30%, rgba(255,255,255,0.85), transparent 46%), radial-gradient(circle at 64% 72%, ${b}, ${a})`,
          boxShadow: `inset 0 0 ${Math.round(size * 0.28)}px rgba(255,255,255,0.4), 0 5px 16px -5px ${b}`,
          border: '1px solid rgba(255,255,255,0.45)',
          transform: active ? 'scale(1.07)' : 'scale(1)',
          transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
        }}
      />
    </span>
  );
}
