'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * AmbientSound
 * -------------------------------------------------------------
 * Música de ambiente global para toda la app, con un botón flotante para
 * activarla o silenciarla. Vive en el layout, así que SIGUE SONANDO al
 * navegar entre pantallas (no se reinicia).
 *
 * Detalles importantes:
 *  - Los navegadores bloquean el autoplay con sonido, así que la música
 *    arranca en el PRIMER toque de la persona (si su preferencia es "on").
 *  - Recuerda la elección en el dispositivo (localStorage 'raices-sonido').
 *  - "Ducking": si suena otro audio (una meditación, una pista), el
 *    ambiente se pausa solo y se retoma cuando ese audio termina.
 *
 * El audio es libre de derechos (Pixabay). Para cambiarlo, reemplaza
 * /public/audios/ambiente.mp3.
 */
const KEY = 'raices-sonido';

export default function AmbientSound() {
  const audioRef = useRef(null);
  const [on, setOn] = useState(false); // intención de la persona (icono)
  const [ready, setReady] = useState(false);
  const onRef = useRef(false);
  onRef.current = on;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35; // suave, de fondo

    let pref = 'on';
    try {
      pref = localStorage.getItem(KEY) || 'on';
    } catch {
      /* almacenamiento no disponible */
    }
    const wantOn = pref !== 'off';
    setOn(wantOn);
    setReady(true);

    // Arranque en el primer gesto (política de autoplay de los navegadores).
    const start = () => {
      if (onRef.current && audio.paused) audio.play().catch(() => {});
    };
    document.addEventListener('pointerdown', start, { once: true });

    // Ducking: pausar el ambiente cuando suena otro audio; retomarlo al terminar.
    let ducked = false;
    const onOtherPlay = (e) => {
      if (e.target !== audio && !audio.paused) {
        audio.pause();
        ducked = true;
      }
    };
    const onOtherStop = (e) => {
      if (e.target !== audio && ducked && onRef.current) {
        ducked = false;
        audio.play().catch(() => {});
      }
    };
    document.addEventListener('play', onOtherPlay, true);
    document.addEventListener('pause', onOtherStop, true);
    document.addEventListener('ended', onOtherStop, true);

    return () => {
      document.removeEventListener('pointerdown', start);
      document.removeEventListener('play', onOtherPlay, true);
      document.removeEventListener('pause', onOtherStop, true);
      document.removeEventListener('ended', onOtherStop, true);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (onRef.current && !audio.paused) {
      audio.pause();
      setOn(false);
      try {
        localStorage.setItem(KEY, 'off');
      } catch {
        /* ignore */
      }
    } else {
      setOn(true);
      try {
        localStorage.setItem(KEY, 'on');
      } catch {
        /* ignore */
      }
      audio.play().catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audios/ambiente.mp3" loop preload="metadata" />
      {ready && (
        <div className="pointer-events-none fixed bottom-24 left-1/2 z-40 w-full max-w-md -translate-x-1/2">
          <div className="flex justify-end px-4">
            <button
              onClick={toggle}
              aria-label={on ? 'Silenciar música de fondo' : 'Activar música de fondo'}
              aria-pressed={on}
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-sand-200 bg-white/90 text-sage-600 shadow-soft backdrop-blur transition hover:bg-sage-50 active:scale-95"
            >
              {on ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
