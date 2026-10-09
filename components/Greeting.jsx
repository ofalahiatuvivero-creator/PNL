'use client';

import { useEffect, useState } from 'react';
import { Sunrise, Sun, Sunset, Moon } from 'lucide-react';

/**
 * Greeting
 * -------------------------------------------------------------
 * Saludo cálido que cambia según la hora del día. Se calcula en el
 * cliente para respetar la hora local de cada persona.
 */
function getGreeting(hour) {
  if (hour >= 6 && hour < 12) {
    return { texto: 'Buenos días', sub: 'Que hoy empiece con calma.', Icon: Sunrise };
  }
  if (hour >= 12 && hour < 19) {
    return { texto: 'Buenas tardes', sub: 'Respira, estás justo donde debes estar.', Icon: Sun };
  }
  if (hour >= 19 && hour < 23) {
    return { texto: 'Buenas noches', sub: 'Es momento de soltar el día.', Icon: Sunset };
  }
  return { texto: 'Hola', sub: 'Estamos aquí para ti, incluso a esta hora.', Icon: Moon };
}

export default function Greeting() {
  // Evita el desajuste servidor/cliente: mostramos la hora sólo tras montar.
  const [hour, setHour] = useState(null);

  useEffect(() => {
    setHour(new Date().getHours());
  }, []);

  const { texto, sub } = getGreeting(hour ?? 9);

  return (
    <div>
      <p className="eyebrow text-sage-600">{sub}</p>
      <h1 className="mt-2 font-serif text-[2.7rem] font-light leading-[1.02] text-ink">
        {texto}
      </h1>
    </div>
  );
}
