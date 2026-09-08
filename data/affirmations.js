/**
 * AFIRMACIONES DEL DÍA
 * -------------------------------------------------------------
 * El Dashboard elige una afirmación distinta cada día del año.
 * El administrador puede añadir, quitar o editar frases libremente.
 * Consejo: mantén frases cortas, en primera persona y en positivo.
 */
export const affirmations = [
  'Hoy me trato con la misma ternura con la que trataría a alguien que amo.',
  'Respiro profundo: en cada exhalación suelto lo que ya no necesito.',
  'Soy suficiente, tal y como soy en este momento.',
  'Merezco calma, y hoy la elijo para mí.',
  'Cada emoción que siento tiene algo valioso que enseñarme.',
  'Confío en mi proceso, aunque no vea todavía el camino completo.',
  'Mi cuerpo es mi hogar y hoy lo escucho con cariño.',
  'Suelto el control de lo que no depende de mí.',
  'Hoy planto una semilla de paz en mi interior.',
  'Soy capaz de crear pensamientos que me cuidan.',
  'Me permito descansar sin sentir culpa.',
  'Elijo mirar mis miedos con curiosidad, no con rechazo.',
  'Estoy aprendiendo a quererme sin condiciones.',
  'Hoy avanzo a mi propio ritmo, y eso está bien.',
  'La paz comienza con una respiración consciente.',
];

/**
 * Devuelve una afirmación estable para el día actual
 * (la misma durante todo el día, cambia al día siguiente).
 */
export function getAffirmationOfTheDay(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return affirmations[dayOfYear % affirmations.length];
}
