import Link from 'next/link';
import { Clock, Lock, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { meditations } from '@/data/meditations';

/**
 * MEDITACIONES GUIADAS — Listado
 * -------------------------------------------------------------
 * Cada meditación se presenta con una esfera de luz del color de su
 * energía. Las que requieren preparación (como Corazones Gemelos) muestran
 * un candado sobre la esfera y enlazan a su pantalla de preparación.
 * (La lógica de preparación obligatoria se conserva intacta.)
 */
const ESFERA = {
  terracotta: ['#F4C9B8', '#E08E6D'],
  sage: ['#CDEBDF', '#9DC5B0'],
  sand: ['#F3D9A4', '#E7C57A'],
};

function Esfera({ color, bloqueada }) {
  const [a, b] = ESFERA[color] || ESFERA.sage;
  return (
    <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
      <span
        className="h-12 w-12 rounded-full"
        style={{
          background: `radial-gradient(circle at 34% 30%, rgba(255,255,255,0.85), transparent 46%), radial-gradient(circle at 66% 72%, ${b}, ${a})`,
          boxShadow: `0 0 18px -4px ${b}, inset 0 0 14px rgba(255,255,255,0.35)`,
        }}
      />
      {bloqueada && (
        <span className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-terracotta-400 text-white shadow-card">
          <Lock className="h-3 w-3" strokeWidth={2.5} />
        </span>
      )}
    </span>
  );
}

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
          const href = `/meditaciones/${m.id}`;
          return (
            <Link
              key={m.id}
              href={href}
              className="card group block transition-all duration-300 ease-agua hover:-translate-y-0.5 active:scale-[0.99]"
            >
              <div className="flex items-start gap-4">
                <Esfera color={m.color} bloqueada={m.requierePreparacion} />
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-lg font-medium leading-tight text-ink">
                    {m.titulo}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-sage-600">{m.maestro}</p>
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
