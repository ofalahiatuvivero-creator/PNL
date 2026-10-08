'use client';

import { useMemo, useState } from 'react';
import { Info, Leaf } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SearchBar from '@/components/SearchBar';
import HerbEntry from '@/components/HerbEntry';
import { herbs, nota, categoriasHerbolaria } from '@/data/herbs';

/**
 * HERBOLARIA · MEDICINA BOTÁNICA
 * -------------------------------------------------------------
 * Buscador + filtro por categoría + listado alfabético de plantas.
 * Cada ficha explica para qué ayuda, cómo se prepara y sus precauciones.
 * Es contenido educativo de usos tradicionales, NO prescripción médica.
 */
function sinAcentos(texto) {
  return (texto || '').normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

export default function HerbolariaPage() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('todas');

  const { grupos, total } = useMemo(() => {
    const q = sinAcentos(query.trim().toLowerCase());
    const coincide = (t) => sinAcentos((t || '').toLowerCase()).includes(q);

    const filtradas = herbs
      .filter((h) => cat === 'todas' || h.categoria === cat)
      .filter(
        (h) =>
          !q ||
          coincide(h.nombre) ||
          coincide(h.cientifico) ||
          coincide(h.beneficios) ||
          coincide(h.categoria)
      )
      .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

    const map = new Map();
    for (const h of filtradas) {
      const letra = sinAcentos(h.nombre.charAt(0)).toUpperCase();
      if (!map.has(letra)) map.set(letra, []);
      map.get(letra).push(h);
    }
    return { grupos: [...map.entries()], total: filtradas.length };
  }, [query, cat]);

  return (
    <main>
      <PageHeader
        title="Herbolaria"
        subtitle="Medicina botánica: la sabiduría de las plantas para acompañar tu bienestar."
        back={false}
      />

      <div className="sticky top-0 z-10 bg-cream/90 px-5 pb-3 pt-1 backdrop-blur">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Buscar una planta o para qué sirve…"
        />
      </div>

      {/* Filtros por categoría */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-2">
        <CatChip active={cat === 'todas'} onClick={() => setCat('todas')} label="Todas" />
        {categoriasHerbolaria.map((c) => (
          <CatChip key={c} active={cat === c} onClick={() => setCat(c)} label={c} />
        ))}
      </div>

      <section className="space-y-6 px-5 pb-6 pt-2">
        {/* Aviso de seguridad */}
        {!query && cat === 'todas' && (
          <div className="flex gap-3 rounded-3xl bg-sage-50 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-sage-500" />
            <p className="text-xs leading-relaxed text-ink-soft">{nota}</p>
          </div>
        )}

        <p className="px-1 text-xs font-medium text-ink-light">
          {total} {total === 1 ? 'planta' : 'plantas'}
        </p>

        {grupos.map(([letra, plantas]) => (
          <div key={letra}>
            <h2 className="mb-2 px-1 font-display text-sm font-bold text-sage-600">{letra}</h2>
            <div className="space-y-2">
              {plantas.map((h) => (
                <HerbEntry key={h.id} herb={h} />
              ))}
            </div>
          </div>
        ))}

        {total === 0 && (
          <p className="py-10 text-center text-sm text-ink-light">
            No encontramos esa planta todavía. Iremos ampliando la herbolaria. 🌿
          </p>
        )}

        {/* Recordatorio de cuidado al pie */}
        <p className="flex items-start gap-2 rounded-2xl bg-sand-100 px-4 py-3 text-xs leading-relaxed text-ink-light">
          <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" />
          Usos tradicionales con fines educativos. No sustituye la atención de un
          profesional de la salud; consulta siempre ante cualquier duda.
        </p>
      </section>
    </main>
  );
}

function CatChip({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-display font-medium transition ${
        active ? 'bg-sage-500 text-white shadow-card' : 'bg-white text-ink-soft hover:bg-sage-50'
      }`}
    >
      {label}
    </button>
  );
}
