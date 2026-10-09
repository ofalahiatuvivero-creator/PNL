'use client';

import { moods } from '@/data/moods';
import MoodSphere from '@/components/MoodSphere';

/**
 * MoodPicker
 * -------------------------------------------------------------
 * Selector de estado de ánimo con esferas de color. Controlado por el padre.
 *
 * Props:
 *   - value: id del estado seleccionado (o null)
 *   - onSelect(id): se llama al elegir un estado
 */
export default function MoodPicker({ value, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {moods.map((m) => {
        const active = value === m.id;
        return (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            aria-pressed={active}
            aria-label={m.label}
            className={`flex flex-col items-center gap-2 rounded-3xl py-3 transition-all duration-300 ease-agua ${
              active ? 'bg-sage-100' : 'hover:bg-sand-100'
            }`}
          >
            <MoodSphere mood={m} active={active} size={48} />
            <span className="font-display text-xs font-medium text-ink-soft">
              {m.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
