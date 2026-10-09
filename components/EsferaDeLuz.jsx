'use client';

/**
 * EsferaDeLuz — el elemento firma de Raíces.
 * -------------------------------------------------------------
 * Una esfera de degradado iridiscente con halo luminoso que flota y
 * respira. Liviana: capas de radial-gradient + blur + animaciones CSS.
 *
 * Props:
 *   - size: diámetro en px (por defecto 180)
 *   - modo: 'reposo' | 'respiracion' | 'audio'
 *   - escala: escala manual (0–1.2) para control externo (p. ej. respiración)
 *   - duracion: duración del ciclo en 'respiracion' (ms) — informativo
 *   - className, style
 */
export default function EsferaDeLuz({
  size = 180,
  modo = 'reposo',
  escala = null,
  className = '',
  style = {},
}) {
  const controlada = escala != null;

  const animEsfera =
    modo === 'reposo'
      ? 'orb-flotar 9s ease-in-out infinite, orb-respirar 10s cubic-bezier(0.65,0,0.35,1) infinite'
      : modo === 'respiracion' && !controlada
      ? 'orb-respirar 10s cubic-bezier(0.65,0,0.35,1) infinite'
      : 'orb-flotar 9s ease-in-out infinite';

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      {/* Halo luminoso */}
      <span
        className="absolute rounded-full"
        style={{
          inset: '-28%',
          background: 'radial-gradient(circle, var(--glow), transparent 68%)',
          filter: 'blur(18px)',
          opacity: 0.85,
        }}
      />
      {/* Esfera iridiscente */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 34% 28%, rgba(255,255,255,0.8), transparent 42%),' +
            'radial-gradient(circle at 72% 76%, var(--orb-c), transparent 60%),' +
            'radial-gradient(circle at 28% 72%, var(--orb-b), transparent 62%),' +
            'radial-gradient(circle at 52% 44%, var(--orb-a), var(--orb-b))',
          boxShadow: 'inset 0 0 44px rgba(255,255,255,0.4), 0 0 60px -8px var(--glow)',
          transform: controlada ? `scale(${escala})` : undefined,
          transition: controlada ? 'transform 1s cubic-bezier(0.65,0,0.35,1)' : undefined,
          animation: controlada ? 'orb-flotar 9s ease-in-out infinite' : animEsfera,
        }}
      />
    </div>
  );
}
