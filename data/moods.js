/**
 * ESTADOS DE ÁNIMO (para el check-in diario del Diario emocional)
 * -------------------------------------------------------------
 * Cada estado tiene un emoji, una etiqueta y un color de acento.
 * El administrador puede editar, añadir o quitar estados libremente.
 * "color" acepta: 'sage' | 'terracotta' | 'sand'
 */
// Cada ánimo tiene una "esfera" de color [a, b] (degradado) y una
// "sugerencia" amable que enlaza a algo existente en la app.
export const moods = [
  {
    id: 'feliz',
    label: 'Feliz',
    emoji: '😊',
    color: 'sage',
    esfera: ['#F7DFA6', '#E9B869'],
    sugerencia: { texto: 'Guarda este momento en tu diario', href: '/diario' },
  },
  {
    id: 'calma',
    label: 'En calma',
    emoji: '😌',
    color: 'sage',
    esfera: ['#CFECE0', '#9DC5B0'],
    sugerencia: { texto: 'Prolonga la calma con una respiración', href: '/zen' },
  },
  {
    id: 'normal',
    label: 'Normal',
    emoji: '😐',
    color: 'sand',
    esfera: ['#FBFAF7', '#E0D8C8'],
    sugerencia: { texto: 'Un momento para ti en la Zona Zen', href: '/zen' },
  },
  {
    id: 'ansioso',
    label: 'Ansioso/a',
    emoji: '😰',
    color: 'terracotta',
    esfera: ['#DED1F6', '#B9A6F0'],
    sugerencia: {
      texto: 'Prueba la Respiración Cuadrada',
      href: '/ejercicios/respiracion-cuadrada',
    },
  },
  {
    id: 'triste',
    label: 'Triste',
    emoji: '😔',
    color: 'terracotta',
    esfera: ['#CFDDF4', '#93B4DF'],
    sugerencia: {
      texto: 'El Espejo Amable, para hablarte con cariño',
      href: '/ejercicios/espejo-amable',
    },
  },
  {
    id: 'cansado',
    label: 'Cansado/a',
    emoji: '😴',
    color: 'sand',
    esfera: ['#5B5F88', '#2F3150'],
    sugerencia: { texto: 'Afirmaciones para dormir, en la Zona Zen', href: '/zen' },
  },
];

export function getMood(id) {
  return moods.find((m) => m.id === id);
}

/**
 * Frases de acompañamiento según el estado elegido. Un mensaje empático
 * que aparece tras registrar cómo te sientes.
 */
export const moodMessages = {
  feliz: 'Qué bonito. Saborea este momento, te lo mereces.',
  calma: 'La calma también se cultiva. Gracias por cuidarte.',
  normal: 'Está bien sentirse así. Aquí estamos, a tu ritmo.',
  ansioso: 'Respira profundo. Esto que sientes también va a pasar.',
  triste: 'Permítete sentirlo sin juzgarte. No estás solo/a.',
  cansado: 'Descansar también es avanzar. Sé amable contigo.',
};
