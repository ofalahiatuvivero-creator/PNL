/**
 * HojasHerbolaria
 * -------------------------------------------------------------
 * Capa decorativa MUY sutil de ramitas con hojas para la Herbolaria, para
 * que se sienta entrar a "un mundo de hierbas". Verde herbal fijo (no
 * cambia con la atmósfera) a baja opacidad, detrás del contenido y sin
 * capturar toques.
 */
const VERDE = '#8CA96B';

function Rama({ className, style }) {
  const hojas = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 120 220" className={className} style={style} fill="none" aria-hidden="true">
      <path
        d="M60 218 C 60 160, 58 90, 60 12"
        stroke={VERDE}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {hojas.map((i) => {
        const y = 40 + i * 28;
        const lado = i % 2 === 0 ? 1 : -1;
        return (
          <path
            key={i}
            d={`M60 ${y} C ${60 + lado * 24} ${y - 16}, ${60 + lado * 34} ${y - 2}, 60 ${y + 8} C ${60 + lado * 12} ${y}, ${60 + lado * 16} ${y - 8}, 60 ${y}`}
            fill={VERDE}
          />
        );
      })}
    </svg>
  );
}

export default function HojasHerbolaria() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden">
      <Rama
        className="absolute -left-6 -top-6 h-60 w-32"
        style={{ opacity: 0.1, transform: 'rotate(20deg)' }}
      />
      <Rama
        className="absolute -right-8 top-28 h-72 w-40"
        style={{ opacity: 0.08, transform: 'rotate(-26deg) scaleX(-1)' }}
      />
      <Rama
        className="absolute -left-10 bottom-16 h-64 w-36"
        style={{ opacity: 0.07, transform: 'rotate(-8deg)' }}
      />
      <Rama
        className="absolute -right-6 bottom-0 h-56 w-28"
        style={{ opacity: 0.09, transform: 'rotate(10deg) scaleX(-1)' }}
      />
    </div>
  );
}
