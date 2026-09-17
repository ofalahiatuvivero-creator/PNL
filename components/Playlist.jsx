'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Music2, Clock } from 'lucide-react';

/**
 * Playlist
 * -------------------------------------------------------------
 * Lista de reproducción para música PNL, frecuencias y afirmaciones.
 * Usa un único elemento <audio> compartido: al pulsar una pista se
 * reproduce y las demás se pausan.
 *
 * Props:
 *   - tracks: array de { id, titulo, autor, duracion, src }
 */
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

  return (
    <div>
      <audio ref={audioRef} preload="none" />
      <ul className="space-y-2">
        {tracks.map((track) => {
          const pending = !!track.proximamente;
          const isActive = activeId === track.id;
          const isPlaying = isActive && playing;
          return (
            <li key={track.id}>
              <button
                onClick={() => seleccionar(track)}
                disabled={pending}
                className={`flex w-full items-center gap-4 rounded-3xl p-3 text-left transition shadow-card ${
                  pending
                    ? 'cursor-not-allowed bg-white/60'
                    : isActive
                    ? 'bg-sage-100'
                    : 'bg-white hover:bg-sand-50'
                }`}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition ${
                    pending
                      ? 'bg-sand-100 text-ink-light'
                      : isPlaying
                      ? 'bg-sage-500 text-white'
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
        })}
      </ul>
    </div>
  );
}
