'use client';

import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import { getAffirmationOfTheDay } from '@/data/affirmations';

/**
 * AffirmationCard
 * -------------------------------------------------------------
 * Muestra la "Afirmación del día" de forma destacada. La frase se
 * calcula en el cliente para que coincida con la fecha local.
 */
export default function AffirmationCard() {
  const [frase, setFrase] = useState('');

  useEffect(() => {
    setFrase(getAffirmationOfTheDay());
  }, []);

  return (
    <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-sage-400 to-sage-600 p-6 text-white shadow-soft">
      {/* Círculos decorativos suaves de fondo */}
      <span className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10" />
      <span className="pointer-events-none absolute -bottom-12 -left-6 h-28 w-28 rounded-full bg-white/10" />

      <div className="relative">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-display font-semibold uppercase tracking-wide">
          <Quote className="h-3.5 w-3.5" />
          Afirmación del día
        </div>
        <p className="font-serif text-xl leading-relaxed">
          {frase || ' '}
        </p>
      </div>
    </div>
  );
}
