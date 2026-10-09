'use client';

import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import { getAffirmationOfTheDay } from '@/data/affirmations';

/**
 * AffirmationCard
 * -------------------------------------------------------------
 * "Afirmación del día" en una tarjeta de cristal con un degradado aurora
 * sutil detrás. La frase aparece palabra por palabra con fade suave.
 */
export default function AffirmationCard() {
  const [frase, setFrase] = useState('');

  useEffect(() => {
    setFrase(getAffirmationOfTheDay());
  }, []);

  const palabras = frase ? frase.split(' ') : [];

  return (
    <div className="card relative overflow-hidden" style={{ minHeight: '9.5rem' }}>
      {/* Aurora sutil detrás */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.7,
          background:
            'radial-gradient(120% 85% at 12% 8%, var(--orb-a), transparent 55%),' +
            'radial-gradient(120% 90% at 92% 95%, var(--orb-b), transparent 55%)',
        }}
      />
      <div className="relative">
        <div className="eyebrow mb-3 inline-flex items-center gap-2 text-sage-600">
          <Quote className="h-3.5 w-3.5" />
          Afirmación del día
        </div>
        <p className="font-serif text-[1.6rem] font-light leading-snug text-ink">
          {palabras.map((w, i) => (
            <span
              key={`${i}-${w}`}
              className="inline-block animate-fade-up"
              style={{ animationDelay: `${i * 85}ms` }}
            >
              {`${w} `}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
