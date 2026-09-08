'use client';

import { useState } from 'react';
import { Wind, ListMusic } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BreathingCircle from '@/components/BreathingCircle';
import Playlist from '@/components/Playlist';
import { playlist } from '@/data/playlist';

/**
 * ZONA ZEN
 * -------------------------------------------------------------
 * Dos experiencias en pestañas:
 *   - Respiración guiada (animación del círculo)
 *   - Música PNL y afirmaciones (lista de reproducción)
 */
export default function ZenPage() {
  const [tab, setTab] = useState('respiracion');

  return (
    <main>
      <PageHeader
        title="Zona Zen"
        subtitle="Un momento para ti. Respira, escucha y suelta."
        back={false}
      />

      {/* Selector de pestañas */}
      <div className="mx-5 mb-6 flex gap-1 rounded-full bg-sand-100 p-1">
        <TabButton active={tab === 'respiracion'} onClick={() => setTab('respiracion')} icon={Wind} label="Respiración" />
        <TabButton active={tab === 'musica'} onClick={() => setTab('musica')} icon={ListMusic} label="Música" />
      </div>

      <section className="px-5 pb-6">
        {tab === 'respiracion' ? (
          <div className="animate-fade-up pt-4">
            <BreathingCircle />
          </div>
        ) : (
          <div className="animate-fade-up">
            <p className="mb-4 px-1 text-sm text-ink-soft">
              Frecuencias, música relajante y afirmaciones para acompañarte.
            </p>
            <Playlist tracks={playlist} />
          </div>
        )}
      </section>
    </main>
  );
}

function TabButton({ active, onClick, icon: TabIcon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-display font-semibold transition ${
        active ? 'bg-white text-sage-600 shadow-card' : 'text-ink-soft'
      }`}
    >
      <TabIcon className="h-4 w-4" />
      {label}
    </button>
  );
}
