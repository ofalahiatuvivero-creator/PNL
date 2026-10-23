'use client';

import { useEffect, useMemo, useState } from 'react';

/**
 * FondoVivo
 * -------------------------------------------------------------
 * Fondo ambiental de toda la app: un "mesh gradient" de manchas de color
 * muy desenfocadas que se desplazan lentísimo (como luz entre la niebla),
 * una textura de grano sutil, y de noche unas luciérnagas que flotan.
 * Fijo, detrás del contenido y sin capturar toques. Solo transform/opacity.
 */

// Grano sutil (SVG feTurbulence) como data URI.
const GRANO =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")";

function Luciernagas() {
  const puntos = useMemo(
    () =>
      Array.from({ length: 26 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        dur: 9 + Math.random() * 11,
        delay: Math.random() * 12,
        dx: `${Math.random() * 40 - 20}px`,
        dy: `${-20 - Math.random() * 50}px`,
      })),
    []
  );
  return (
    <>
      {puntos.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: 'var(--terracotta-400)',
            boxShadow: '0 0 8px 2px var(--glow)',
            '--dx': p.dx,
            '--dy': p.dy,
            animation: `luciernaga ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

/* Un destello de estrella con púas, la firma del James Webb. */
function DestelloWebb({ left, top, size, color, delay }) {
  return (
    <svg
      className="absolute"
      viewBox="0 0 40 40"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        animation: `destello ${6 + (delay % 4)}s ease-in-out ${delay}s infinite`,
      }}
    >
      <path
        d="M20 0 L21.6 18.4 L40 20 L21.6 21.6 L20 40 L18.4 21.6 L0 20 L18.4 18.4 Z"
        fill={color}
      />
      <circle cx="20" cy="20" r="2.4" fill="#fff" />
    </svg>
  );
}

/* Campo de estrellas + destellos Webb para la atmósfera Nebulosa. */
function Estrellas() {
  const estrellas = useMemo(
    () =>
      Array.from({ length: 70 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.2,
        dur: 2.5 + Math.random() * 4,
        delay: Math.random() * 5,
        rosa: Math.random() > 0.6,
      })),
    []
  );
  const destellos = useMemo(
    () => [
      { left: 24, top: 18, size: 46, color: '#FFD6EA', delay: 0 },
      { left: 72, top: 26, size: 34, color: '#BFD9FF', delay: 1.5 },
      { left: 50, top: 46, size: 54, color: '#FFE9F4', delay: 0.8 },
      { left: 16, top: 66, size: 30, color: '#FFC2DE', delay: 2.4 },
      { left: 84, top: 72, size: 38, color: '#D9C2FF', delay: 1.1 },
    ],
    []
  );
  return (
    <>
      {estrellas.map((e, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${e.left}%`,
            top: `${e.top}%`,
            width: e.size,
            height: e.size,
            background: e.rosa ? '#FFC2E2' : '#FFFFFF',
            boxShadow: e.rosa ? '0 0 6px 1px rgba(255,150,205,0.8)' : '0 0 5px 1px rgba(255,255,255,0.7)',
            animation: `titilar ${e.dur}s ease-in-out ${e.delay}s infinite`,
          }}
        />
      ))}
      {destellos.map((d, i) => (
        <DestelloWebb key={`d-${i}`} {...d} />
      ))}
    </>
  );
}

export default function FondoVivo() {
  const [atm, setAtm] = useState('dia');

  useEffect(() => {
    const check = () =>
      setAtm(document.documentElement.getAttribute('data-atmosfera') || 'dia');
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-atmosfera'],
    });
    return () => obs.disconnect();
  }, []);

  const noche = atm === 'noche';
  const nebulosa = atm === 'nebulosa';

  const blob = (styles, anim) => (
    <span
      className="absolute rounded-full"
      style={{ filter: 'blur(70px)', ...styles, animation: anim }}
    />
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: 'var(--ground)', transition: 'background-color 2s ease' }}
    >
      {blob(
        { top: '-15%', left: '-12%', height: '58vh', width: '58vh', background: 'var(--mesh-1)', opacity: 0.7 },
        'mesh-flotar 48s ease-in-out infinite'
      )}
      {blob(
        { top: '8%', right: '-18%', height: '52vh', width: '52vh', background: 'var(--mesh-2)', opacity: 0.6 },
        'mesh-flotar 62s ease-in-out infinite reverse'
      )}
      {blob(
        { bottom: '-12%', left: '12%', height: '56vh', width: '56vh', background: 'var(--mesh-3)', opacity: 0.6 },
        'mesh-flotar 54s ease-in-out infinite'
      )}
      {blob(
        { bottom: '6%', right: '4%', height: '42vh', width: '42vh', background: 'var(--mesh-4)', opacity: 0.5 },
        'mesh-flotar 68s ease-in-out infinite reverse'
      )}

      {/* Grano orgánico */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: GRANO, backgroundSize: '120px 120px', opacity: 'var(--grain-opacity)' }}
      />

      {noche && <Luciernagas />}
      {nebulosa && <Estrellas />}
    </div>
  );
}
