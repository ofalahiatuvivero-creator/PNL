'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

/**
 * PageHeader
 * -------------------------------------------------------------
 * Encabezado reutilizable para páginas internas, con botón de "volver"
 * opcional, título y subtítulo.
 *
 * Props:
 *   - title: título de la página (obligatorio)
 *   - subtitle: texto secundario (opcional)
 *   - back: muestra el botón de volver (por defecto true)
 */
export default function PageHeader({ title, subtitle, back = true }) {
  const router = useRouter();

  return (
    <header className="px-5 pt-8 pb-2">
      {back && (
        <button
          onClick={() => router.back()}
          className="mb-4 inline-flex items-center gap-1 rounded-full py-1 pr-3 text-sm font-display font-medium text-ink-soft transition hover:text-sage-600"
          aria-label="Volver"
        >
          <ChevronLeft className="h-5 w-5" />
          Volver
        </button>
      )}
      <h1 className="text-2xl font-bold text-ink">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>}
    </header>
  );
}
