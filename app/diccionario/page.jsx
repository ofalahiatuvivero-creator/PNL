'use client';

import { useMemo, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import SearchBar from '@/components/SearchBar';
import DictionaryEntry from '@/components/DictionaryEntry';
import dictionary from '@/data/dictionary.json';

/**
 * DICCIONARIO DE ENFERMEDADES EMOCIONALES
 * -------------------------------------------------------------
 * Barra de búsqueda + listado alfabético. Cada entrada explica el patrón
 * de pensamiento que origina la dolencia y ofrece un nuevo modelo mental
 * y una acción de PNL.
 */
export default function DiccionarioPage() {
  const [query, setQuery] = useState('');

  // Ordena alfabéticamente y filtra por el texto buscado.
  const { grupos, total } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtradas = dictionary.entradas
      .filter(
        (e) =>
          !q ||
          e.nombre.toLowerCase().includes(q) ||
          e.patron.toLowerCase().includes(q)
      )
      .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

    // Agrupa por letra inicial para el listado alfabético.
    const map = new Map();
    for (const e of filtradas) {
      const letra = e.nombre[0].toUpperCase();
      if (!map.has(letra)) map.set(letra, []);
      map.get(letra).push(e);
    }
    return { grupos: [...map.entries()], total: filtradas.length };
  }, [query]);

  return (
    <main>
      <PageHeader
        title="Diccionario Emocional"
        subtitle="Tu cuerpo te habla. Descubre el mensaje detrás de cada dolencia."
        back={false}
      />

      <div className="sticky top-0 z-10 bg-cream/90 px-5 pb-3 pt-1 backdrop-blur">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Buscar una dolencia o emoción…"
        />
      </div>

      <section className="space-y-6 px-5 pb-6 pt-2">
        {grupos.map(([letra, entradas]) => (
          <div key={letra}>
            <h2 className="mb-2 px-1 font-display text-sm font-bold text-sage-600">
              {letra}
            </h2>
            <div className="space-y-2">
              {entradas.map((e) => (
                <DictionaryEntry key={e.id} entry={e} />
              ))}
            </div>
          </div>
        ))}

        {total === 0 && (
          <p className="py-10 text-center text-sm text-ink-light">
            No encontramos resultados para “{query}”. Prueba con otra palabra. 🌸
          </p>
        )}

        {/* Nota de cuidado */}
        <p className="rounded-2xl bg-sand-100 px-4 py-3 text-center text-xs leading-relaxed text-ink-light">
          Esta información es una guía de reflexión emocional y no sustituye el
          diagnóstico ni el tratamiento médico profesional.
        </p>
      </section>
    </main>
  );
}
