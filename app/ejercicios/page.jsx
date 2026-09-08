'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import ExerciseCard from '@/components/ExerciseCard';
import Icon from '@/components/Icon';
import { exercises, categories, getCategory } from '@/data/exercises';

/**
 * EJERCICIOS PNL — Listado
 * -------------------------------------------------------------
 * Tarjetas categorizadas por necesidad. El usuario puede filtrar por
 * categoría (Reducir Ansiedad, Aumentar Motivación, etc.).
 */
export default function EjerciciosPage() {
  const [filtro, setFiltro] = useState('todos');

  const visibles =
    filtro === 'todos'
      ? exercises
      : exercises.filter((e) => e.categoria === filtro);

  return (
    <main>
      <PageHeader
        title="Ejercicios PNL"
        subtitle="Prácticas sencillas para reconectar contigo. Elige según lo que necesites hoy."
        back={false}
      />

      {/* Filtros por necesidad */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-3">
        <FilterChip active={filtro === 'todos'} onClick={() => setFiltro('todos')} label="Todos" icon="LayoutGrid" />
        {categories.map((c) => (
          <FilterChip
            key={c.id}
            active={filtro === c.id}
            onClick={() => setFiltro(c.id)}
            label={c.nombre}
            icon={c.icon}
          />
        ))}
      </div>

      {/* Listado */}
      <section className="space-y-3 px-5 pb-6 pt-1">
        {visibles.map((e) => (
          <ExerciseCard
            key={e.id}
            exercise={e}
            color={getCategory(e.categoria)?.color}
          />
        ))}
        {visibles.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-light">
            Pronto añadiremos más ejercicios en esta categoría. 🌱
          </p>
        )}
      </section>
    </main>
  );
}

/** Chip de filtro deslizable. */
function FilterChip({ active, onClick, label, icon }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-display font-medium transition ${
        active
          ? 'bg-sage-500 text-white shadow-card'
          : 'bg-white text-ink-soft hover:bg-sage-50'
      }`}
    >
      <Icon name={icon} className="h-4 w-4" />
      {label}
    </button>
  );
}
