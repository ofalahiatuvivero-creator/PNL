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
  Headphones,
  NotebookPen,
} from 'lucide-react';

/**
 * BottomNav
 * -------------------------------------------------------------
 * Barra flotante de cristal con TODAS las secciones visibles. "Inicio"
 * va al CENTRO, como botón destacado (ancla), con las prácticas a la
 * izquierda y el contenido a la derecha. El nombre de la sección actual
 * se muestra en un chip sobre la barra.
 */
const inicio = { href: '/', label: 'Inicio', icon: Home };

// Izquierda: prácticas. Derecha: contenido.
const izquierda = [
  { href: '/ejercicios', label: 'Ejercicios PNL', icon: Sparkles },
  { href: '/zen', label: 'Zona Zen', icon: Wind },
  { href: '/meditaciones', label: 'Meditaciones', icon: HeartHandshake },
];
const derecha = [
  { href: '/diccionario', label: 'Diccionario Bio-Emocional', icon: BookHeart },
  { href: '/herbolaria', label: 'Herbolaria', icon: Leaf },
  { href: '/audios', label: 'Audioteca', icon: Headphones },
  { href: '/diario', label: 'Mi diario', icon: NotebookPen },
];
const todos = [inicio, ...izquierda, ...derecha];

export default function BottomNav() {
  const pathname = usePathname();
  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);
  const activo = todos.find((i) => isActive(i.href)) || inicio;

  const IconLink = ({ href, label, icon: I }) => {
    const active = isActive(href);
    return (
      <Link
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
  };

  const inicioActivo = isActive('/');

  return (
    <nav
      className="pointer-events-none fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.6rem)' }}
    >
      {/* Nombre de la sección actual */}
      <div className="mb-2 flex justify-center">
        <span
          key={activo.href}
          suppressHydrationWarning
          className="glass rounded-full px-4 py-1 font-display text-xs font-semibold text-ink animate-fade-up"
        >
          {activo.label}
        </span>
      </div>

      <div className="glass pointer-events-auto mx-3 flex items-center justify-between rounded-full p-1.5">
        {izquierda.map((it) => (
          <IconLink key={it.href} {...it} />
        ))}

        {/* INICIO — botón central destacado */}
        <Link
          href="/"
          aria-label="Inicio"
          aria-current={inicioActivo ? 'page' : undefined}
          className={`mx-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-agua active:scale-95 ${
            inicioActivo
              ? 'border-transparent bg-sage-500 text-white shadow-glow'
              : 'border-sage-300/60 bg-sage-100 text-sage-600'
          }`}
        >
          <Home className="h-6 w-6" strokeWidth={inicioActivo ? 2.4 : 2} />
        </Link>

        {derecha.map((it) => (
          <IconLink key={it.href} {...it} />
        ))}
      </div>
    </nav>
  );
}
