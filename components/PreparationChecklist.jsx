'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

/**
 * PreparationChecklist
 * -------------------------------------------------------------
 * Lista de ejercicios físicos previos a la meditación. El usuario marca
 * cada uno al terminarlo. Informa al componente padre, mediante
 * onChange(todosCompletos), cuándo se han marcado todos para habilitar
 * el botón de continuar.
 *
 * Props:
 *   - steps: array de { id, texto }
 *   - onChange: función que recibe un booleano (todos marcados)
 */
export default function PreparationChecklist({ steps, onChange }) {
  const [checked, setChecked] = useState(() => new Set());

  const toggle = (id) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      // Avisa al padre si ya están todos marcados.
      onChange?.(next.size === steps.length);
      return next;
    });
  };

  const marcarTodos = () => {
    const all = new Set(steps.map((s) => s.id));
    setChecked(all);
    onChange?.(true);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between px-1">
        <p className="text-xs font-medium text-ink-light">
          {checked.size} de {steps.length} completados
        </p>
        <button
          onClick={marcarTodos}
          className="text-xs font-display font-semibold text-sage-600 underline-offset-2 hover:underline"
        >
          Marcar todos
        </button>
      </div>

      <ul className="space-y-2">
        {steps.map((step, i) => {
          const isChecked = checked.has(step.id);
          return (
            <li key={step.id}>
              <button
                onClick={() => toggle(step.id)}
                className={`flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition ${
                  isChecked
                    ? 'border-sage-200 bg-sage-50'
                    : 'border-sand-200 bg-white hover:bg-sand-50'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition ${
                    isChecked
                      ? 'border-sage-500 bg-sage-500 text-white'
                      : 'border-sand-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="h-4 w-4" strokeWidth={3} />}
                </span>
                <span className={`text-sm leading-snug ${isChecked ? 'text-ink-soft line-through' : 'text-ink'}`}>
                  <span className="mr-1 font-semibold text-sage-600">{i + 1}.</span>
                  {step.texto}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
