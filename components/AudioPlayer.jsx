'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

/**
 * AudioPlayer
 * -------------------------------------------------------------
 * Reproductor HTML5 sencillo y cálido: play/pausa, barra de progreso y
 * tiempos. Funciona con cualquier archivo mp3.
 *
 * >>> PARA EL ADMINISTRADOR <<<
 * El "src" que se pasa como prop es la ruta del audio. Por defecto los
 * datos apuntan a '/audios/placeholder.mp3'. Sube tus mp3 a
 * /public/audios/ y actualiza las rutas en los archivos de /data.
 *
 * Props:
 *   - src: ruta del audio (string)
 *   - titulo: nombre a mostrar (opcional)
 */
export default function AudioPlayer({ src, titulo }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  // Sincroniza el estado con los eventos del elemento <audio>.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrent(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnd = () => setPlaying(false);
    const onErr = () => setError(true);

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('error', onErr);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnd);
      audio.removeEventListener('error', onErr);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch {
      setError(true);
    }
  };

  const seek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = Number(e.target.value);
    setCurrent(audio.currentTime);
  };

  const restart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrent(0);
  };

  const fmt = (s) => {
    if (!s || Number.isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <div className="rounded-3xl bg-white p-5 shadow-card">
      {/* Elemento de audio real (oculto) */}
      <audio ref={audioRef} src={src} preload="metadata" />

      {titulo && (
        <p className="mb-3 text-center font-display text-sm font-semibold text-ink">
          {titulo}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={restart}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition hover:bg-sand-100"
          aria-label="Reiniciar"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        <button
          onClick={toggle}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-500 text-white shadow-card transition hover:bg-sage-600 active:scale-95"
          aria-label={playing ? 'Pausar' : 'Reproducir'}
        >
          {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 translate-x-0.5" />}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={current}
            onChange={seek}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-sand-200 accent-sage-500"
            aria-label="Avance del audio"
          />
          <div className="mt-1 flex justify-between text-[11px] font-medium text-ink-light">
            <span>{fmt(current)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-3 rounded-xl bg-sand-100 px-3 py-2 text-center text-[11px] text-ink-light">
          Aún no se ha cargado el audio. El administrador puede subir el archivo mp3.
        </p>
      )}
    </div>
  );
}
