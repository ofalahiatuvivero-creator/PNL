import Link from 'next/link';
import { Sparkles, HeartHandshake, BookHeart, Leaf, Library } from 'lucide-react';
import Greeting from '@/components/Greeting';
import AffirmationCard from '@/components/AffirmationCard';
import DailyCheckIn from '@/components/DailyCheckIn';
import EsferaDeLuz from '@/components/EsferaDeLuz';

/**
 * INICIO — "Un refugio que respira"
 * -------------------------------------------------------------
 * Marca discreta, saludo con esfera, afirmación del día, check-in de
 * ánimo con esferas y un bento de accesos. Cierre con una raíz que se
 * dibuja sola. (El contenido y la lógica se conservan.)
 */
const bento = [
  {
    href: '/ejercicios',
    titulo: 'Ejercicios PNL',
    desc: 'Prácticas guiadas paso a paso.',
    icon: Sparkles,
    glow: 'rgba(157,197,176,0.6)',
  },
  {
    href: '/meditaciones',
    titulo: 'Meditaciones',
    desc: 'Incluye Corazones Gemelos.',
    icon: HeartHandshake,
    glow: 'rgba(224,142,109,0.5)',
  },
  {
    href: '/diccionario',
    titulo: 'Diccionario Bio-Emocional',
    desc: 'Descubre el mensaje emocional de tu cuerpo.',
    icon: BookHeart,
    glow: 'rgba(201,184,240,0.55)',
    wide: true,
  },
  {
    href: '/herbolaria',
    titulo: 'Herbolaria',
    desc: 'Plantas que acompañan.',
    icon: Leaf,
    glow: 'rgba(157,197,176,0.6)',
  },
  {
    href: '/biblioteca',
    titulo: 'Biblioteca',
    desc: 'Lecturas para tu camino.',
    icon: Library,
    glow: 'rgba(243,217,164,0.55)',
  },
];

export default function DashboardPage() {
  return (
    <main className="px-5 pt-5">
      {/* Marca discreta */}
      <div className="flex items-center gap-2 animate-fade-up">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Raíces" className="h-9 w-9 object-contain" />
        <span className="font-serif text-lg font-medium text-ink">Raíces</span>
      </div>

      {/* Saludo con esfera de luz */}
      <section className="relative mt-7 animate-fade-up">
        <div className="pointer-events-none absolute right-0 top-1 opacity-90">
          <EsferaDeLuz size={116} modo="reposo" />
        </div>
        <div className="relative max-w-[70%]">
          <Greeting />
        </div>
      </section>

      {/* Afirmación del día */}
      <section className="mt-7 animate-fade-up" style={{ animationDelay: '80ms' }}>
        <AffirmationCard />
      </section>

      {/* Check-in de ánimo del día */}
      <section className="mt-4 animate-fade-up" style={{ animationDelay: '120ms' }}>
        <DailyCheckIn />
      </section>

      {/* Bento: ¿Qué necesitas hoy? */}
      <section className="mt-9 animate-fade-up" style={{ animationDelay: '160ms' }}>
        <h2 className="mb-4 px-1 font-serif text-2xl font-light text-ink">
          ¿Qué necesitas hoy?
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {/* Zona Zen — tarjeta grande con esfera que respira */}
          <Link
            href="/zen"
            className="card group col-span-2 flex items-center gap-4 overflow-hidden transition-all duration-300 ease-agua hover:-translate-y-0.5 active:scale-[0.99]"
          >
            <EsferaDeLuz size={64} modo="reposo" />
            <div className="min-w-0">
              <h3 className="font-serif text-xl font-medium leading-tight text-ink">
                Zona Zen
              </h3>
              <p className="mt-0.5 text-sm text-ink-soft">
                Respiración guiada, música y mantras para armonizarte.
              </p>
            </div>
          </Link>

          {bento.map((c) => {
            const I = c.icon;
            return (
              <Link
                key={c.href}
                href={c.href}
                className={`card group flex flex-col justify-between overflow-hidden transition-all duration-300 ease-agua hover:-translate-y-0.5 active:scale-[0.99] ${
                  c.wide ? 'col-span-2' : 'min-h-[7.5rem]'
                }`}
              >
                <span
                  className="halo flex h-11 w-11 items-center justify-center rounded-2xl text-ink"
                  style={{ '--glow': c.glow }}
                >
                  <I className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <div className="mt-3">
                  <h3 className="font-serif text-lg font-medium leading-tight text-ink">
                    {c.titulo}
                  </h3>
                  <p className="mt-0.5 text-xs leading-snug text-ink-soft">
                    {c.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Cierre con una raíz que se dibuja */}
      <section className="mt-10 mb-4 text-center">
        <p className="font-serif text-lg font-light text-ink-soft">
          Respira profundo. Estamos aquí para ti.
        </p>
        <svg
          viewBox="0 0 200 46"
          className="mx-auto mt-3 h-11 w-44"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M100 2 V20 M100 20 C 84 24, 74 32, 58 40 M100 20 C 116 24, 126 32, 142 40 M100 20 C 96 30, 93 36, 90 44 M100 20 C 104 30, 107 36, 110 44"
            stroke="var(--sage-500)"
            strokeWidth="1.4"
            strokeLinecap="round"
            pathLength="1"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: 1,
              animation: 'dibujar-raiz 2.6s cubic-bezier(0.22,1,0.36,1) 0.4s forwards',
            }}
          />
        </svg>
      </section>
    </main>
  );
}
