/**
 * BIBLIOTECA
 * -------------------------------------------------------------
 * Cada libro tiene una portada de color (generada con las iniciales) y
 * un archivo PDF.
 *
 * >>> PARA EL ADMINISTRADOR <<<
 * 1. Sube los PDF a la carpeta /public/libros/
 * 2. Cambia el campo "pdf" por la ruta real, p. ej. '/libros/mi-libro.pdf'
 * 3. (Opcional) Sube una imagen de portada a /public/portadas/ y añade
 *    el campo "portada": '/portadas/mi-portada.jpg'. Si no la incluyes,
 *    se mostrará una portada generada automáticamente.
 */
export const books = [
  {
    id: 'introduccion-pnl',
    titulo: 'Introducción a la PNL',
    autor: 'Equipo Raíces',
    color: 'sage',
    pdf: '/libros/placeholder.pdf', // <-- reemplazar por el PDF real
  },
  {
    id: 'sanar-emociones',
    titulo: 'Sanar las emociones',
    autor: 'Guía práctica',
    color: 'terracotta',
    pdf: '/libros/placeholder.pdf',
  },
  {
    id: 'poder-de-la-respiracion',
    titulo: 'El poder de la respiración',
    autor: 'Bienestar diario',
    color: 'sand',
    pdf: '/libros/placeholder.pdf',
  },
  {
    id: 'afirmaciones-que-sanan',
    titulo: 'Afirmaciones que sanan',
    autor: 'Colección Raíces',
    color: 'sage',
    pdf: '/libros/placeholder.pdf',
  },
];
