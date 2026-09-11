'use client';

import { useMemo, useState } from 'react';
import { Info } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SearchBar from '@/components/SearchBar';
import DictionaryEntry from '@/components/DictionaryEntry';
import dictionary from '@/data/dictionary.json';

/**
 * DICCIONARIO BIO-EMOCIONAL
 * -------------------------------------------------------------
 * Barra de búsqueda + listado alfabético (A-Z). Cada entrada explica el
 * conflicto emocional que suele estar detrás de la dolencia y ofrece un
 * nuevo modelo mental y una acción de PNL.
 *
 * Contenido original inspirado en los patrones generales de la
 * biodescodificación. Es una guía de autoconocimiento, NO un diagnóstico.
 */

// Quita acentos y pasa a minúsculas para comparar/agrupar sin importar tildes.
function sinAcentos(texto) {
  return (texto || '').normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

export default function DiccionarioPage() {
  const [query, setQuery] = useState('');

  // Ordena alfabéticamente y filtra por el texto buscado (nombre, patrón o sistema).
  const { grupos, total } = useMemo(() => {
    const q = sinAcentos(query.trim().toLowerCase());
    const coincide = (texto) => sinAcentos(texto.toLowerCase()).includes(q);

    const filtradas = dictionary.entradas
      .filter(
        (e) => !q || coincide(e.nombre) || coincide(e.patron) || coincide(e.sistema)
      )
      .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

    // Agrupa por letra inicial (sin acentos: Á -> A, Ú -> U).
    const map = new Map();
    for (const e of filtradas) {
      const letra = sinAcentos(e.nombre.charAt(0)).toUpperCase();
      if (!map.has(letra)) map.set(letra, []);
      map.get(letra).push(e);
    }
    return { grupos: [...map.entries()], total: filtradas.length };
  }, [query]);

  return (
    <main>
      <PageHeader
        title="Diccionario Bio-Emocional"
        subtitle="Tu cuerpo te habla. Descubre el mensaje emocional detrás de cada dolencia."
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
        {/* Nota introductoria */}
        {!query && dictionary.nota && (
          <div className="flex gap-3 rounded-3xl bg-sage-50 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-sage-500" />
            <p className="text-xs leading-relaxed text-ink-soft">{dictionary.nota}</p>
          </div>
        )}

        {/* Contador de resultados */}
        <p className="px-1 text-xs font-medium text-ink-light">
          {total} {total === 1 ? 'entrada' : 'entradas'}
          {query
            ? total === 1
              ? ' encontrada'
              : ' encontradas'
            : ' de la A a la Z'}
        </p>

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
          diagnóstico ni el tratamiento de un profesional de la salud.
        </p>
      </section>
    </main>
  );
}
