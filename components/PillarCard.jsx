import Link from 'next/link';
import Icon from '@/components/Icon';

/**
 * PillarCard
 * -------------------------------------------------------------
 * Tarjeta de acceso rápido a uno de los 4 pilares de la app.
 *
 * Props:
 *   - href, titulo, descripcion, icon (nombre lucide), color
 * "color" acepta: 'sage' | 'terracotta' | 'sand'
 */
const palette = {
  sage: 'bg-sage-100 text-sage-600',
  terracotta: 'bg-terracotta-100 text-terracotta-500',
  sand: 'bg-sand-200 text-sand-500',
};

export default function PillarCard({ href, titulo, descripcion, icon, color = 'sage' }) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
    >
      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${palette[color]}`}>
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <div>
        <h3 className="font-display text-base font-semibold text-ink">{titulo}</h3>
        <p className="mt-0.5 text-xs leading-snug text-ink-soft">{descripcion}</p>
      </div>
    </Link>
  );
}
