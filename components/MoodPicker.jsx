'use client';

import { moods } from '@/data/moods';

/**
 * MoodPicker
 * -------------------------------------------------------------
 * Selector de estado de ánimo con emojis. Controlado por el padre.
 *
 * Props:
 *   - value: id del estado seleccionado (o null)
 *   - onSelect(id): se llama al elegir un estado
 */
const accent = {
  sage: 'border-sage-400 bg-sage-100',
  terracotta: 'border-terracotta-300 bg-terracotta-100',
  sand: 'border-sand-400 bg-sand-200',
};

export default function MoodPicker({ value, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {moods.map((m) => {
        const active = value === m.id;
        return (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`flex flex-col items-center gap-1 rounded-2xl border-2 py-3 transition ${
              active
                ? accent[m.color] || accent.sage
                : 'border-transparent bg-white hover:bg-sand-50'
            }`}
            aria-pressed={active}
          >
            <span className="text-2xl leading-none">{m.emoji}</span>
            <span className="font-display text-xs font-medium text-ink-soft">
              {m.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
