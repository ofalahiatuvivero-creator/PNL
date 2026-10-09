'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Sparkles,
  Wind,
  HeartHandshake,
  MoreHorizontal,
  BookHeart,
  Leaf,
  Library,
  NotebookPen,
} from 'lucide-react';

/**
 * BottomNav
 * -------------------------------------------------------------
 * Barra flotante de cristal tipo píldora. Ítems principales con Zen al
 * centro (con una mini esfera). "Más" abre una hoja de cristal con el
 * resto de secciones. La etiqueta aparece solo en el ítem activo.
 */
const principales = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/ejercicios', label: 'PNL', icon: Sparkles },
  { href: '/zen', label: 'Zen', icon: Wind, centro: true },
  { href: '/meditaciones', label: 'Meditar', icon: HeartHandshake },
];

const masItems = [
  { href: '/diccionario', label: 'Bio-Emocional', icon: BookHeart },
  { href: '/herbolaria', label: 'Herbolaria', icon: Leaf },
  { href: '/biblioteca', label: 'Biblioteca', icon: Library },
  { href: '/diario', label: 'Mi diario', icon: NotebookPen },
];

function EsferaMini({ blanca = false }) {
  return (
    <span
      className="h-6 w-6 shrink-0 rounded-full"
      style={{
        background: blanca
          ? 'radial-gradient(circle at 35% 30%, #ffffff, transparent 55%), radial-gradient(circle at 65% 70%, #ffffffaa, #ffffff55)'
          : 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85), transparent 46%), radial-gradient(circle at 62% 72%, var(--orb-b), var(--orb-a))',
        boxShadow: '0 0 10px -2px var(--glow)',
      }}
    />
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const [masOpen, setMasOpen] = useState(false);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);
  const masActivo = masItems.some((i) => pathname.startsWith(i.href));

  return (
    <>
      {masOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMasOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed bottom-[5.5rem] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[22rem] -translate-x-1/2">
            <div className="glass rounded-3xl p-2 animate-fade-up">
              <div className="grid grid-cols-2 gap-1.5">
                {masItems.map(({ href, label, icon: I }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMasOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-3 py-3 transition ${
                      isActive(href) ? 'bg-sage-100' : 'hover:bg-sage-50'
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-sage-600">
                      <I className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium text-ink">{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <nav
        className="pointer-events-none fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.7rem)' }}
      >
        <div className="glass pointer-events-auto mx-4 flex items-center justify-between gap-1 rounded-full p-2">
          {principales.map(({ href, label, icon: I, centro }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center justify-center rounded-full transition-all duration-300 ease-agua ${
                  active
                    ? 'gap-2 bg-sage-500 px-3.5 py-2.5 text-white shadow-glow'
                    : 'h-11 w-11 text-ink-soft'
                }`}
              >
                {centro ? (
                  <EsferaMini blanca={active} />
                ) : (
                  <I className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
                )}
                {active && <span className="text-sm font-semibold">{label}</span>}
              </Link>
            );
          })}

          <button
            onClick={() => setMasOpen((o) => !o)}
            aria-label="Más secciones"
            aria-expanded={masOpen}
            className={`flex items-center justify-center rounded-full transition-all duration-300 ease-agua ${
              masActivo || masOpen
                ? 'gap-2 bg-sage-500 px-3.5 py-2.5 text-white shadow-glow'
                : 'h-11 w-11 text-ink-soft'
            }`}
          >
            <MoreHorizontal className="h-5 w-5" />
            {(masActivo || masOpen) && <span className="text-sm font-semibold">Más</span>}
          </button>
        </div>
      </nav>
    </>
  );
}
