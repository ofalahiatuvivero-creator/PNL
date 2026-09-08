import Link from 'next/link';
import { HeartHandshake, ChevronRight } from 'lucide-react';
import Greeting from '@/components/Greeting';
import AffirmationCard from '@/components/AffirmationCard';
import DailyCheckIn from '@/components/DailyCheckIn';
import PillarCard from '@/components/PillarCard';

/**
 * DASHBOARD / INICIO
 * -------------------------------------------------------------
 * - Saludo cálido según la hora del día.
 * - Afirmación del día destacada.
 * - Acceso rápido a los 4 pilares.
 * - Invitación destacada a las meditaciones guiadas.
 */

// Los 4 pilares principales de la app.
const pilares = [
  {
    href: '/ejercicios',
    titulo: 'Ejercicios PNL',
    descripcion: 'Prácticas paso a paso para tu día a día.',
    icon: 'Sparkles',
    color: 'sage',
  },
  {
    href: '/zen',
    titulo: 'Zona Zen',
    descripcion: 'Respiración guiada, música y afirmaciones.',
    icon: 'Wind',
    color: 'terracotta',
  },
  {
    href: '/diccionario',
    titulo: 'Diccionario Emocional',
    descripcion: 'Descubre el mensaje de tu cuerpo.',
    icon: 'BookHeart',
    color: 'sage',
  },
  {
    href: '/biblioteca',
    titulo: 'Biblioteca',
    descripcion: 'Lecturas para acompañar tu camino.',
    icon: 'Library',
    color: 'sand',
  },
];

export default function DashboardPage() {
  return (
    <main className="px-5 pt-10">
      {/* Saludo */}
      <section className="animate-fade-up">
        <Greeting />
      </section>

      {/* Afirmación del día */}
      <section className="mt-6 animate-fade-up" style={{ animationDelay: '80ms' }}>
        <AffirmationCard />
      </section>

      {/* Check-in de ánimo del día */}
      <section className="mt-4 animate-fade-up" style={{ animationDelay: '120ms' }}>
        <DailyCheckIn />
      </section>

      {/* Los 4 pilares */}
      <section className="mt-8 animate-fade-up" style={{ animationDelay: '160ms' }}>
        <h2 className="mb-3 px-1 text-lg font-semibold text-ink">¿Qué necesitas hoy?</h2>
        <div className="grid grid-cols-2 gap-3">
          {pilares.map((p) => (
            <PillarCard key={p.href} {...p} />
          ))}
        </div>
      </section>

      {/* Invitación a meditaciones guiadas */}
      <section className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
        <Link
          href="/meditaciones"
          className="flex items-center gap-4 rounded-3xl bg-terracotta-100 p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-terracotta-400 text-white">
            <HeartHandshake className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <h3 className="font-display text-base font-semibold text-terracotta-600">
              Meditaciones guiadas
            </h3>
            <p className="text-xs text-terracotta-600/80">
              Incluye Corazones Gemelos de Master Choa Kok Sui.
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-terracotta-500" />
        </Link>
      </section>

      {/* Cierre cálido */}
      <p className="mt-8 px-2 text-center text-sm text-ink-light">
        Respira profundo. Estamos aquí para ti. 🌿
      </p>
    </main>
  );
}
