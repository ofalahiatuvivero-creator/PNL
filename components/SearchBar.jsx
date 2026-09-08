'use client';

import { Search, X } from 'lucide-react';

/**
 * SearchBar
 * -------------------------------------------------------------
 * Barra de búsqueda controlada y reutilizable.
 *
 * Props:
 *   - value, onChange(texto)
 *   - placeholder (opcional)
 */
export default function SearchBar({ value, onChange, placeholder = 'Buscar…' }) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-light" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-sand-200 bg-white py-3 pl-12 pr-11 text-sm text-ink placeholder:text-ink-light focus:border-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-100"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-light transition hover:bg-sand-100"
          aria-label="Limpiar búsqueda"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
