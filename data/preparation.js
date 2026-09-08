/**
 * PREPARACIÓN OBLIGATORIA — Meditación de Corazones Gemelos
 * -------------------------------------------------------------
 * Contenido de la pantalla de advertencia y del checklist de ejercicios
 * físicos previos. Basado en las indicaciones del experto.
 *
 * El administrador puede editar el texto de la advertencia y los pasos,
 * pero se recomienda NO eliminar la advertencia médica.
 */

// Aviso de contraindicaciones (se muestra en un banner de color cálido/alerta).
export const warningText =
  'Es aconsejable no practicar a menores de 18 años, pacientes hipertensos sin fármacos, pacientes con Glaucoma, mujeres embarazadas ni pacientes con dolencias renales severas.';

// Ejercicios físicos previos. El usuario marca cada uno al terminarlo.
// El botón de continuar se habilita cuando todos están marcados.
export const preparationSteps = [
  { id: 'ojos', texto: 'Ojos: círculos 12 veces a la derecha, 12 a la izquierda.' },
  { id: 'cabeza-lados', texto: 'Cabeza: 12 veces derecha e izquierda.' },
  { id: 'cabeza-arriba', texto: 'Cabeza: 12 veces arriba y abajo.' },
  { id: 'hombros', texto: 'Hombros: 12 círculos hacia adelante, 12 hacia atrás.' },
  { id: 'tronco', texto: 'Tronco: 12 veces torsión a derecha e izquierda.' },
  { id: 'cadera', texto: 'Cadera: círculos 12 veces a la derecha, 12 a la izquierda.' },
  { id: 'sentadillas', texto: 'Semi sentadillas: 50 inclinaciones suaves y cortas.' },
  { id: 'brazos', texto: 'Brazos: flectar arriba y abajo 12 veces.' },
  { id: 'dedos', texto: 'Dedos: abrir y cerrar los dedos de ambas palmas 12 veces.' },
  { id: 'munecas', texto: 'Muñecas: rotar a la derecha 12 veces, a la izquierda 12 veces.' },
  { id: 'piernas', texto: 'Piernas: flectar y estirar la derecha 12 veces, la izquierda 12 veces.' },
  { id: 'tobillos', texto: 'Tobillos: derecho 12 círculos der/izq; izquierdo 12 der/izq.' },
  { id: 'pies', texto: 'Pies: derecho e izquierdo, 12 veces arriba y abajo.' },
  { id: 'balance', texto: 'Ejercicio de balance: 12 veces.' },
];
