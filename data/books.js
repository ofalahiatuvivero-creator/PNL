/**
 * BIBLIOTECA
 * -------------------------------------------------------------
 * Cada libro tiene una portada de color (generada con las iniciales) y
 * un archivo PDF.
 *
 * >>> PARA EL ADMINISTRADOR <<<
 * 1. Sube los PDF a la carpeta /public/libros/
 * 2. Añade el libro a la lista con su "pdf" apuntando al archivo,
 *    p. ej. pdf: '/libros/mi-libro.pdf'
 * 3. (Opcional) Portada real: sube una imagen a /public/portadas/ y añade
 *    el campo "portada": '/portadas/mi-portada.jpg'. Si no la incluyes,
 *    se muestra una portada de color generada automáticamente.
 * 4. "color" acepta: 'sage' | 'terracotta' | 'sand'.
 *
 * La biblioteca se irá ampliando con el tiempo; basta con añadir entradas.
 */
export const books = [
  {
    id: 'introduccion-pnl',
    titulo: 'Introducción a la PNL',
    autor: "O'Connor y Seymour",
    color: 'sage',
    pdf: '/libros/introduccion-pnl.pdf',
  },
  {
    id: 'emociones-toxicas',
    titulo: 'Emociones tóxicas',
    autor: 'Bernardo Stamateas',
    color: 'terracotta',
    pdf: '/libros/emociones-toxicas.pdf',
  },
  {
    id: 'ciencia-respiracion',
    titulo: 'La ciencia de la respiración',
    autor: 'El poder de respirar',
    color: 'sand',
    pdf: '/libros/ciencia-respiracion.pdf',
  },
  {
    id: 'afirmaciones-curacion',
    titulo: 'Afirmaciones para la curación',
    autor: 'Afirmaciones que sanan',
    color: 'sage',
    pdf: '/libros/afirmaciones-curacion.pdf',
  },
];
