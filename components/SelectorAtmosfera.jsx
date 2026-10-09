'use client';

import { useEffect, useRef, useState } from 'react';
import { Sunrise, Sun, Sunset, Moon, Check } from 'lucide-react';

/**
 * SelectorAtmosfera
 * -------------------------------------------------------------
 * Botón real (antes el sol era decorativo) que muestra la atmósfera
 * actual y abre un selector: Automático / Claro / Noche. Guarda la
 * preferencia en localStorage y aplica el atributo data-atmosfera en
 * <html>. En "Automático" cambia sola según la hora local.
 */
const KEY = 'raices-atmosfera';

const THEME_COLOR = {
  amanecer: '#F6EFE6',
  dia: '#FBFAF7',
  atardecer: '#F8EADF',
  noche: '#141A2E',
};

function porHora() {
  const h = new Date().getHours();
  if (h >= 5 && h < 11) return 'amanecer';
  if (h >= 11 && h < 17) return 'dia';
  if (h >= 17 && h < 20) return 'atardecer';
  return 'noche';
}

function aplicar(pref) {
  const atm = pref === 'noche' ? 'noche' : pref === 'claro' ? 'dia' : porHora();
  document.documentElement.setAttribute('data-atmosfera', atm);
  try {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLOR[atm]);
  } catch {
    /* ignore */
  }
  return atm;
}

const ICONO = { amanecer: Sunrise, dia: Sun, atardecer: Sunset, noche: Moon };

export default function SelectorAtmosfera() {
  const [pref, setPref] = useState('auto');
  const [atm, setAtm] = useState('dia');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    let p = 'auto';
    try {
      p = localStorage.getItem(KEY) || 'auto';
    } catch {
      /* ignore */
    }
    setPref(p);
    setAtm(aplicar(p));
    const id = setInterval(() => {
      let cur = 'auto';
      try {
        cur = localStorage.getItem(KEY) || 'auto';
      } catch {
        /* ignore */
      }
      if (cur === 'auto') setAtm(aplicar('auto'));
    }, 600000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const cerrar = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', cerrar);
    return () => document.removeEventListener('pointerdown', cerrar);
  }, [open]);

  const elegir = (p) => {
    setPref(p);
    setAtm(aplicar(p));
    setOpen(false);
    try {
      localStorage.setItem(KEY, p);
    } catch {
      /* ignore */
    }
  };

  const Icono = ICONO[atm] || Sun;
  const opciones = [
    { id: 'auto', label: 'Automático' },
    { id: 'claro', label: 'Claro' },
    { id: 'noche', label: 'Noche' },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Cambiar atmósfera"
        aria-haspopup="menu"
        className="glass flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-transform duration-300 ease-agua active:scale-95"
      >
        <Icono className="h-5 w-5" />
      </button>
      {open && (
        <div
          role="menu"
          className="glass absolute right-0 top-[52px] z-50 w-44 overflow-hidden rounded-2xl p-1.5 animate-fade-up"
        >
          {opciones.map((o) => (
            <button
              key={o.id}
              role="menuitemradio"
              aria-checked={pref === o.id}
              onClick={() => elegir(o.id)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition hover:bg-sage-100"
            >
              {o.label}
              {pref === o.id && <Check className="h-4 w-4 text-sage-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
