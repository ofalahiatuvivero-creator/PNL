import Link from 'next/link';
import { Clock, Lock, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { meditations } from '@/data/meditations';

/**
 * MEDITACIONES GUIADAS — Listado
 * -------------------------------------------------------------
 * Las meditaciones que requieren preparación (como Corazones Gemelos)
 * muestran un candado y enlazan a su pantalla de preparación obligatoria.
 */
const accent = {
  sage: 'bg-sage-100 text-sage-600',
  terracotta: 'bg-terracotta-100 text-terracotta-500',
  sand: 'bg-sand-200 text-sand-500',
};

export default function MeditacionesPage() {
  return (
    <main>
      <PageHeader
        title="Meditaciones guiadas"
        subtitle="Espacios para reconectar con tu calma interior."
        back={false}
      />

      <section className="space-y-3 px-5 pb-6">
        {meditations.map((m) => {
          // Corazones Gemelos y otras con preparación pasan por la pantalla previa.
          const href = m.requierePreparacion
            ? `/meditaciones/${m.id}`
            : `/meditaciones/${m.id}`;
          return (
            <Link
              key={m.id}
              href={href}
              className="group block rounded-3xl bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              <div className="flex items-start gap-4">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${accent[m.color] || accent.sage}`}>
                  <Clock className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-semibold text-ink">
                      {m.titulo}
                    </h3>
                    {m.requierePreparacion && (
                      <Lock className="h-3.5 w-3.5 shrink-0 text-terracotta-400" />
                    )}
                  </div>
                  <p className="text-xs font-medium text-sage-600">{m.maestro}</p>
                  <p className="mt-2 text-sm leading-snug text-ink-soft">
                    {m.descripcion}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink-light">
                      <Clock className="h-3 w-3" />
                      {m.duracion}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-display font-semibold text-sage-600">
                      {m.requierePreparacion ? 'Preparación previa' : 'Comenzar'}
                      <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
