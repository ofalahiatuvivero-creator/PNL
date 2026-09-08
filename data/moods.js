/**
 * ESTADOS DE ÁNIMO (para el check-in diario del Diario emocional)
 * -------------------------------------------------------------
 * Cada estado tiene un emoji, una etiqueta y un color de acento.
 * El administrador puede editar, añadir o quitar estados libremente.
 * "color" acepta: 'sage' | 'terracotta' | 'sand'
 */
export const moods = [
  { id: 'feliz', label: 'Feliz', emoji: '😊', color: 'sage' },
  { id: 'calma', label: 'En calma', emoji: '😌', color: 'sage' },
  { id: 'normal', label: 'Normal', emoji: '😐', color: 'sand' },
  { id: 'ansioso', label: 'Ansioso/a', emoji: '😰', color: 'terracotta' },
  { id: 'triste', label: 'Triste', emoji: '😔', color: 'terracotta' },
  { id: 'cansado', label: 'Cansado/a', emoji: '😴', color: 'sand' },
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
