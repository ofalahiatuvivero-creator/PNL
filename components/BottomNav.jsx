'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Sparkles,
  Wind,
  HeartHandshake,
  BookHeart,
  Leaf,
  Library,
  NotebookPen,
} from 'lucide-react';

/**
 * BottomNav
 * -------------------------------------------------------------
 * Barra flotante de cristal con TODAS las secciones visibles a la vez
 * (sin menú "Más" oculto). El ítem activo se resalta con un círculo de
 * color. Cada acceso tiene su etiqueta accesible (aria-label).
 */
const items = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/ejercicios', label: 'Ejercicios PNL', icon: Sparkles },
  { href: '/zen', label: 'Zona Zen', icon: Wind },
  { href: '/meditaciones', label: 'Meditaciones', icon: HeartHandshake },
  { href: '/diccionario', label: 'Diccionario Bio-Emocional', icon: BookHeart },
  { href: '/herbolaria', label: 'Herbolaria', icon: Leaf },
  { href: '/biblioteca', label: 'Biblioteca', icon: Library },
  { href: '/diario', label: 'Mi diario', icon: NotebookPen },
];

export default function BottomNav() {
  const pathname = usePathname();
  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav
      className="pointer-events-none fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.6rem)' }}
    >
      <div className="glass pointer-events-auto mx-3 flex items-center justify-between rounded-full p-1.5">
        {items.map(({ href, label, icon: I }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-agua ${
                active ? 'bg-sage-500 text-white shadow-glow' : 'text-ink-soft active:scale-90'
              }`}
            >
              <I className="h-[18px] w-[18px]" strokeWidth={active ? 2.4 : 2} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
