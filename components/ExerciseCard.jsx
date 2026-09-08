import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import Icon from '@/components/Icon';

/**
 * ExerciseCard
 * -------------------------------------------------------------
 * Tarjeta de un ejercicio de PNL. Enlaza a su vista paso a paso.
 */
const accent = {
  sage: 'bg-sage-100 text-sage-600',
  terracotta: 'bg-terracotta-100 text-terracotta-500',
  sand: 'bg-sand-200 text-sand-500',
};

export default function ExerciseCard({ exercise, color = 'sage' }) {
  return (
    <Link
      href={`/ejercicios/${exercise.id}`}
      className="group flex items-center gap-4 rounded-3xl bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
    >
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${accent[color]}`}>
        <Icon name={exercise.icon} className="h-6 w-6" />
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-display text-base font-semibold text-ink">
          {exercise.titulo}
        </h3>
        <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-ink-soft">
          {exercise.resumen}
        </p>
        <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-ink-light">
          <Clock className="h-3 w-3" />
          {exercise.duracion}
        </span>
      </div>

      <ArrowRight className="h-5 w-5 shrink-0 text-sand-400 transition group-hover:translate-x-0.5 group-hover:text-sage-500" />
    </Link>
  );
}
