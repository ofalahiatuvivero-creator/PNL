'use client';

/**
 * RaizProgreso
 * -------------------------------------------------------------
 * Indicador de avance en forma de raíz/brote que crece a medida que la
 * persona avanza por los pasos del ejercicio. El tallo se dibuja según la
 * fracción completada y las hojas van apareciendo una a una.
 *
 * Props:
 *   - fraccion: 0..1 (progreso)
 *   - total: número de pasos (para el número de hojas)
 */
export default function RaizProgreso({ fraccion = 0, total = 4 }) {
  const f = Math.max(0, Math.min(1, fraccion));

  // Hojas a lo largo del tallo (posición y umbral de aparición).
  const hojas = [
    { x: 60, y: 54, lado: -1 },
    { x: 60, y: 42, lado: 1 },
    { x: 60, y: 30, lado: -1 },
    { x: 60, y: 20, lado: 1 },
  ];
  const visibles = Math.min(hojas.length, Math.max(1, total));
  const lista = hojas.slice(0, visibles);

  return (
    <svg
      viewBox="0 0 120 72"
      className="h-20 w-full"
      aria-hidden="true"
      fill="none"
      preserveAspectRatio="xMidYMax meet"
    >
      {/* Raíces bajo la tierra (siempre tenues) */}
      <path
        d="M60 66 C 52 60, 44 58, 36 54 M60 66 C 68 60, 76 58, 84 54 M60 66 L60 62"
        stroke="var(--sage-500)"
        strokeOpacity="0.25"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Tallo que crece con el progreso */}
      <path
        d="M60 64 C 60 50, 60 36, 60 14"
        stroke="var(--sage-500)"
        strokeWidth="2.4"
        strokeLinecap="round"
        pathLength="1"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: 1 - f,
          transition: 'stroke-dashoffset 600ms cubic-bezier(0.22,1,0.36,1)',
        }}
      />

      {/* Hojas que aparecen una a una */}
      {lista.map((h, i) => {
        const umbral = (i + 1) / (visibles + 1);
        const on = f >= umbral - 0.001;
        return (
          <path
            key={i}
            d={
              h.lado < 0
                ? `M${h.x} ${h.y} C ${h.x - 12} ${h.y - 2}, ${h.x - 14} ${h.y - 10}, ${h.x - 2} ${h.y - 8} C ${h.x - 4} ${h.y - 2}, ${h.x} ${h.y}, ${h.x} ${h.y} Z`
                : `M${h.x} ${h.y} C ${h.x + 12} ${h.y - 2}, ${h.x + 14} ${h.y - 10}, ${h.x + 2} ${h.y - 8} C ${h.x + 4} ${h.y - 2}, ${h.x} ${h.y}, ${h.x} ${h.y} Z`
            }
            fill="var(--sage-500)"
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'bottom center',
              transform: on ? 'scale(1)' : 'scale(0)',
              opacity: on ? 1 : 0,
              transition: 'transform 500ms cubic-bezier(0.34,1.56,0.64,1), opacity 400ms ease',
            }}
          />
        );
      })}

      {/* Brote superior: aparece al completar */}
      <circle
        cx="60"
        cy="12"
        r="4"
        fill="var(--terracotta-400)"
        style={{
          transformBox: 'fill-box',
          transformOrigin: 'center',
          transform: f >= 0.999 ? 'scale(1)' : 'scale(0)',
          opacity: f >= 0.999 ? 1 : 0,
          transition: 'transform 600ms cubic-bezier(0.34,1.56,0.64,1), opacity 400ms ease',
        }}
      />
    </svg>
  );
}
