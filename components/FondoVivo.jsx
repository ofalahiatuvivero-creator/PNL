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

export default function FondoVivo() {
  const [noche, setNoche] = useState(false);

  useEffect(() => {
    const check = () =>
      setNoche(document.documentElement.getAttribute('data-atmosfera') === 'noche');
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-atmosfera'],
    });
    return () => obs.disconnect();
  }, []);

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
    </div>
  );
}
