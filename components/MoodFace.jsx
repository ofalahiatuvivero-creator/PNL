'use client';

import { useId } from 'react';

/**
 * MoodFace
 * -------------------------------------------------------------
 * Icono de ánimo profesional y minimalista: un orbe con el color de la
 * emoción (psicología del color, ver data/moods.js) y una expresión de
 * línea muy sobria. Reemplaza las versiones anteriores (esfera/gatito)
 * para dar una estética más seria. Decorativo; la etiqueta la da el botón.
 *
 * Props: mood (objeto con .id y .esfera [a,b]), active, size (px)
 */
const TRAZO = '#332B40';

export default function MoodFace({ mood, active = false, size = 56 }) {
  const uid = useId().replace(/:/g, '');
  const [a, b] = mood?.esfera || ['#AEE3C7', '#5FB894'];
  const id = mood?.id || 'normal';
  const gid = `mf-${uid}`;
  const hid = `mfh-${uid}`;

  return (
    <span
      className="relative inline-flex items-center justify-center"
      style={{
        width: size,
        height: size,
        transform: active ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
        filter: active ? `drop-shadow(0 6px 16px ${b}55)` : 'none',
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" width="100%" height="100%">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="1" stopColor={b} />
          </linearGradient>
          <radialGradient id={hid} cx="0.36" cy="0.3" r="0.72">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="0.55" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="26" fill={`url(#${gid})`} />
        <circle cx="32" cy="32" r="26" fill={`url(#${hid})`} />
        <circle cx="32" cy="32" r="25.4" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1" />
        <Expresion id={id} />
      </svg>
    </span>
  );
}

function Expresion({ id }) {
  const linea = {
    fill: 'none',
    stroke: TRAZO,
    strokeWidth: 2.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  const ojosPunto = (
    <>
      <circle cx="24" cy="29" r="1.9" fill={TRAZO} />
      <circle cx="40" cy="29" r="1.9" fill={TRAZO} />
    </>
  );

  switch (id) {
    case 'feliz':
      return (
        <g>
          {ojosPunto}
          <path d="M25 39 Q32 46 39 39" {...linea} />
        </g>
      );
    case 'calma':
      return (
        <g {...linea}>
          <path d="M21 30 Q24 33 27 30" />
          <path d="M37 30 Q40 33 43 30" />
          <path d="M27 40 Q32 44 37 40" />
        </g>
      );
    case 'normal':
      return (
        <g>
          {ojosPunto}
          <path d="M26 41 L38 41" {...linea} />
        </g>
      );
    case 'ansioso':
      return (
        <g>
          <circle cx="24" cy="29" r="2.1" fill={TRAZO} />
          <circle cx="40" cy="29" r="2.1" fill={TRAZO} />
          <path d="M26 41 q2 -2.4 4 0 q2 2.4 4 0" {...linea} strokeWidth="2" />
        </g>
      );
    case 'triste':
      return (
        <g>
          <circle cx="24" cy="30" r="1.9" fill={TRAZO} />
          <circle cx="40" cy="30" r="1.9" fill={TRAZO} />
          <path d="M26 42 Q32 37 38 42" {...linea} />
        </g>
      );
    case 'cansado':
      return (
        <g {...linea}>
          <path d="M21 30 Q24 32 27 30" />
          <path d="M37 30 Q40 32 43 30" />
          <path d="M28 41 L36 41" />
        </g>
      );
    default:
      return (
        <g>
          {ojosPunto}
          <path d="M26 41 L38 41" {...linea} />
        </g>
      );
  }
}
