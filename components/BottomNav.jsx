'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, Wind, BookHeart, Library } from 'lucide-react';

/**
 * BottomNav
 * -------------------------------------------------------------
 * Barra de navegación inferior fija (estilo app móvil) con acceso a
 * Inicio y a los 4 pilares. Resalta la sección activa.
 */
const links = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/ejercicios', label: 'PNL', icon: Sparkles },
  { href: '/zen', label: 'Zen', icon: Wind },
  { href: '/diccionario', label: 'Bio-Emo', icon: BookHeart },
  { href: '/biblioteca', label: 'Libros', icon: Library },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-sand-200 bg-cream/90 backdrop-blur">
      <ul className="flex items-stretch justify-around px-2 py-2">
        {links.map(({ href, label, icon: LinkIcon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex flex-col items-center gap-1 rounded-2xl py-1.5 text-[11px] font-display font-medium transition ${
                  active ? 'text-sage-600' : 'text-ink-light hover:text-sage-500'
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-2xl transition ${
                    active ? 'bg-sage-100' : 'bg-transparent'
                  }`}
                >
                  <LinkIcon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
