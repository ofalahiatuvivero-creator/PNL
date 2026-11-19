/**
 * AUDIOTECA
 * -------------------------------------------------------------
 * Audios ORIGINALES de Raíces (PNL y bienestar), narrados con voz cálida.
 * Reemplaza a la antigua biblioteca de PDF. Todo el contenido es original;
 * no se usan obras de terceros con derechos de autor.
 *
 * >>> PARA EL ADMINISTRADOR <<<
 * Sube los MP3 a /public/audios/ y añade la entrada aquí con su "src".
 * "duracion" es informativa (texto).
 */
export const audios = [
  {
    id: 'bienvenida',
    titulo: 'Bienvenida a Raíces',
    descripcion: 'Un momento para llegar, respirar y estar presente.',
    duracion: '0:23',
    src: '/audios/bienvenida.mp3',
    categoria: 'empezar',
  },
  {
    id: 'que-es-pnl',
    titulo: '¿Qué es la PNL?',
    descripcion: 'Entiende de qué se trata, en lenguaje sencillo.',
    duracion: '0:59',
    src: '/audios/que-es-pnl.mp3',
    categoria: 'pnl',
  },
  {
    id: 'poder-creencias',
    titulo: 'El poder de tus creencias',
    descripcion: 'Revisa con cariño las ideas que te limitan.',
    duracion: '1:00',
    src: '/audios/poder-creencias.mp3',
    categoria: 'pnl',
  },
];

export const categoriasAudio = [
  { id: 'empezar', label: 'Para empezar' },
  { id: 'pnl', label: 'PNL en audio' },
];
