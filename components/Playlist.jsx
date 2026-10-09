'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Music2, Clock, ExternalLink } from 'lucide-react';
import EsferaDeLuz from '@/components/EsferaDeLuz';

/**
 * Playlist
 * -------------------------------------------------------------
 * Lista de reproducción de la Zona Zen. Agrupa las pistas por "tipo"
 * (Mantras, Afirmaciones, Frecuencias, Naturaleza) con un título por
 * sección. Usa un único <audio> compartido: al pulsar una pista se
 * reproduce y las demás se pausan.
 *
 * Props:
 *   - tracks: array de { id, titulo, autor, duracion, src, tipo, proximamente? }
 */
const GRUPOS = [
  { tipo: 'mantras', label: 'Mantras' },
  { tipo: 'afirmaciones', label: 'Afirmaciones' },
  { tipo: 'frecuencias', label: 'Frecuencias' },
  { tipo: 'naturaleza', label: 'Sonidos de la naturaleza' },
];

export default function Playlist({ tracks }) {
  const audioRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnd = () => setPlaying(false);
    audio.addEventListener('ended', onEnd);
    return () => audio.removeEventListener('ended', onEnd);
  }, []);

  const seleccionar = async (track) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (track.proximamente) return; // pista aún no disponible

    // Si es la pista activa, alterna play/pausa.
    if (activeId === track.id) {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        try {
          await audio.play();
          setPlaying(true);
        } catch {
          /* el audio aún no está disponible */
        }
      }
      return;
    }

    // Nueva pista: carga y reproduce.
    setActiveId(track.id);
    audio.src = track.src;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const renderTrack = (track) => {
    // Pistas enlazadas a su fuente oficial (p. ej. mantras en Spotify):
    // se abren fuera de la app, respetando los derechos del artista.
    if (track.enlace) {
      return (
        <li key={track.id}>
          <a
            href={track.enlace}
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex w-full items-center gap-4 rounded-3xl p-3 text-left transition-colors hover:bg-sage-100"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage-100 text-sage-600">
              <Music2 className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-semibold text-ink">
                {track.titulo}
              </p>
              <p className="truncate text-xs text-ink-soft">{track.autor}</p>
            </div>
            <span className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-sage-600">
              {track.plataforma || 'Escuchar'}
              <ExternalLink className="h-3 w-3" />
            </span>
          </a>
        </li>
      );
    }

    const pending = !!track.proximamente;
    const isActive = activeId === track.id;
    const isPlaying = isActive && playing;
    return (
      <li key={track.id}>
        <button
          onClick={() => seleccionar(track)}
          disabled={pending}
          className={`glass flex w-full items-center gap-4 rounded-3xl p-3 text-left transition-colors ${
            pending
              ? 'cursor-not-allowed opacity-70'
              : isActive
              ? 'bg-sage-100'
              : 'hover:bg-sage-100'
          }`}
        >
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition ${
              pending
                ? 'bg-sand-100 text-ink-light'
                : isPlaying
                ? 'bg-sage-500 text-white shadow-glow'
                : 'bg-sand-100 text-sage-500'
            }`}
          >
            {pending ? (
              <Clock className="h-5 w-5" />
            ) : isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 translate-x-0.5" />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <p className={`truncate font-display text-sm font-semibold ${pending ? 'text-ink-light' : 'text-ink'}`}>
              {track.titulo}
            </p>
            <p className="truncate text-xs text-ink-soft">{track.autor}</p>
          </div>
          {pending ? (
            <span className="shrink-0 rounded-full bg-sand-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-light">
              Próximamente
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-medium text-ink-light">
              <Music2 className="h-3 w-3" />
              {track.duracion}
            </span>
          )}
        </button>
      </li>
    );
  };

  // Agrupa en el orden definido; añade al final cualquier tipo no listado.
  const grupos = GRUPOS.map((g) => ({
    ...g,
    items: tracks.filter((t) => t.tipo === g.tipo),
  })).filter((g) => g.items.length > 0);
  const sinTipo = tracks.filter((t) => !GRUPOS.some((g) => g.tipo === t.tipo));
  if (sinTipo.length) grupos.push({ tipo: 'otros', label: 'Más', items: sinTipo });

  const activeTrack = tracks.find((t) => t.id === activeId);

  return (
    <div>
      <audio ref={audioRef} preload="none" />

      {/* Sonando ahora: la esfera late con la música */}
      {activeTrack && (
        <div className="glass mb-6 flex items-center gap-4 rounded-3xl p-3 animate-fade-up">
          <div className="shrink-0">
            <EsferaDeLuz size={56} modo={playing ? 'reposo' : 'audio'} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="eyebrow text-sage-600">
              {playing ? 'Sonando ahora' : 'En pausa'}
            </p>
            <p className="truncate font-serif text-base font-medium text-ink">
              {activeTrack.titulo}
            </p>
            <p className="truncate text-xs text-ink-soft">{activeTrack.autor}</p>
          </div>
          <button
            onClick={() => seleccionar(activeTrack)}
            aria-label={playing ? 'Pausar' : 'Reproducir'}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-500 text-white shadow-glow transition active:scale-95"
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
          </button>
        </div>
      )}

      <div className="space-y-6">
        {grupos.map((g) => (
          <div key={g.tipo}>
            <h3 className="mb-2 px-1 font-display text-sm font-bold text-sage-600">
              {g.label}
            </h3>
            <ul className="space-y-2">{g.items.map(renderTrack)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}
