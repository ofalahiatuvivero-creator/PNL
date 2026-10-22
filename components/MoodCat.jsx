'use client';

import { useId } from 'react';

/**
 * MoodCat
 * -------------------------------------------------------------
 * Carita de gatito que refleja cada estado de ánimo (reemplaza las
 * esferas del check-in). El color sigue la psicología del color (ver
 * data/moods.js) y la expresión cambia según la emoción.
 * "Ansioso/a" tiembla muy levemente. Es decorativo; el nombre de la
 * emoción lo da el botón que lo envuelve.
 *
 * Props: mood (objeto con .id y .esfera [a,b]), active, size (px)
 */
const TRAZO = '#3B2F4A'; // contorno plum suave

export default function MoodCat({ mood, active = false, size = 56 }) {
  const uid = useId().replace(/:/g, '');
  const [a, b] = mood?.esfera || ['#AEE3C7', '#5FB894'];
  const id = mood?.id || 'normal';
  const tiembla = id === 'ansioso';
  const gid = `catg-${uid}`;

  return (
    <span
      className="relative inline-flex items-center justify-center"
      style={{
        width: size,
        height: size,
        animation: tiembla ? 'temblor 2.6s ease-in-out infinite' : undefined,
        transform: active ? 'scale(1.07)' : 'scale(1)',
        transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
        filter: active ? `drop-shadow(0 6px 14px ${b}66)` : 'none',
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" width="100%" height="100%">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="1" stopColor={b} />
          </linearGradient>
        </defs>

        {/* Orejas (detrás de la cabeza) */}
        <polygon points="14,20 19,3 34,17" fill={`url(#${gid})`} stroke={TRAZO} strokeWidth="2.4" strokeLinejoin="round" />
        <polygon points="50,20 45,3 30,17" fill={`url(#${gid})`} stroke={TRAZO} strokeWidth="2.4" strokeLinejoin="round" />

        {/* Cabeza */}
        <rect x="9" y="16" width="46" height="42" rx="17" fill={`url(#${gid})`} stroke={TRAZO} strokeWidth="2.4" />

        {/* Rayitas de la frente (atigrado) */}
        <g stroke={TRAZO} strokeWidth="2" strokeLinecap="round" opacity="0.8">
          <line x1="26" y1="20" x2="26" y2="26" />
          <line x1="32" y1="19" x2="32" y2="25.5" />
          <line x1="38" y1="20" x2="38" y2="26" />
        </g>

        {/* Expresión según la emoción */}
        <Expresion id={id} />
      </svg>
    </span>
  );
}

function Expresion({ id }) {
  const s = {
    fill: 'none',
    stroke: TRAZO,
    strokeWidth: 2.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  const nariz = <circle cx="32" cy="40" r="1.3" fill={TRAZO} />;
  const bocaGato = (
    <g {...s}>
      <path d="M32 40.5 L32 43" />
      <path d="M32 43 Q28.5 46 25.5 43" />
      <path d="M32 43 Q35.5 46 38.5 43" />
    </g>
  );

  switch (id) {
    case 'feliz':
      return (
        <g>
          <circle cx="18.5" cy="41" r="3" fill="#FF9EC4" opacity="0.65" />
          <circle cx="45.5" cy="41" r="3" fill="#FF9EC4" opacity="0.65" />
          <g {...s}>
            <path d="M20 36 Q24 31 28 36" />
            <path d="M36 36 Q40 31 44 36" />
          </g>
          {nariz}
          {bocaGato}
        </g>
      );
    case 'calma':
      return (
        <g>
          <g {...s}>
            <path d="M20 35 Q24 39 28 35" />
            <path d="M36 35 Q40 39 44 35" />
          </g>
          {nariz}
          {bocaGato}
        </g>
      );
    case 'normal':
      return (
        <g>
          <circle cx="24" cy="35" r="2.2" fill={TRAZO} />
          <circle cx="40" cy="35" r="2.2" fill={TRAZO} />
          {nariz}
          {bocaGato}
        </g>
      );
    case 'ansioso':
      return (
        <g>
          {/* ojos muy abiertos (alerta) */}
          <ellipse cx="24" cy="35.5" rx="3.3" ry="4.2" fill="#fff" stroke={TRAZO} strokeWidth="2" />
          <ellipse cx="40" cy="35.5" rx="3.3" ry="4.2" fill="#fff" stroke={TRAZO} strokeWidth="2" />
          <circle cx="24" cy="36.5" r="1.5" fill={TRAZO} />
          <circle cx="40" cy="36.5" r="1.5" fill={TRAZO} />
          {/* cejitas preocupadas */}
          <g {...s} strokeWidth="2">
            <path d="M19 30 L26 28.5" />
            <path d="M45 30 L38 28.5" />
          </g>
          {/* boquita de nervios (ondita) */}
          <path d="M27 45 q2.5 -2.5 5 0 q2.5 2.5 5 0" {...s} strokeWidth="2" />
        </g>
      );
    case 'triste':
      return (
        <g>
          {/* cejas hacia arriba por dentro */}
          <g {...s} strokeWidth="2">
            <path d="M20 30.5 Q24 28 27.5 31" />
            <path d="M44 30.5 Q40 28 36.5 31" />
          </g>
          {/* ojitos caídos */}
          <g {...s}>
            <path d="M21 36 Q24 34 27 36" />
            <path d="M37 36 Q40 34 43 36" />
          </g>
          {/* lágrima */}
          <path d="M41 39 Q38.6 42.5 41 44 Q43.4 42.5 41 39 Z" fill="#8FB4E3" stroke="#6B93D6" strokeWidth="0.8" />
          {nariz}
          {/* boca hacia abajo */}
          <path d="M27 46 Q32 42 37 46" {...s} />
        </g>
      );
    case 'cansado':
      return (
        <g>
          {/* ojos medio cerrados (sueño) */}
          <g {...s}>
            <path d="M20 36 Q24 38.5 28 36" />
            <path d="M36 36 Q40 38.5 44 36" />
          </g>
          {/* zzz */}
          <g stroke={TRAZO} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="44,13 48,13 44,17 48,17" />
            <polyline points="49,7 52,7 49,10 52,10" />
          </g>
          {nariz}
          {/* bostezo */}
          <ellipse cx="32" cy="44.5" rx="2.6" ry="3.2" fill="#3B2F4A22" stroke={TRAZO} strokeWidth="2" />
        </g>
      );
    default:
      return (
        <g>
          <circle cx="24" cy="35" r="2.2" fill={TRAZO} />
          <circle cx="40" cy="35" r="2.2" fill={TRAZO} />
          {nariz}
          {bocaGato}
        </g>
      );
  }
}
