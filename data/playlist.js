/**
 * MÚSICA PNL, MANTRAS Y AFIRMACIONES (Zona Zen)
 * -------------------------------------------------------------
 * Lista de reproducción. Cada pista tiene un "tipo" para agruparse en
 * secciones dentro de la Zona Zen:
 *   'mantras' | 'afirmaciones' | 'frecuencias' | 'naturaleza'
 *
 * >>> PARA EL ADMINISTRADOR <<<
 * Sube los .mp3 a /public/audios/ y pon la ruta en "src". Para dejar una
 * pista "en espera", añade `proximamente: true`.
 */
export const playlist = [
  // --- Mantras (Deva Premal & Miten) ---
  {
    id: 'mantra-gayatri',
    titulo: 'Gayatri Mantra',
    autor: 'Deva Premal & Miten · con Manose',
    duracion: '08:02',
    src: '/audios/mantra-gayatri.mp3',
    tipo: 'mantras',
  },
  {
    id: 'mantra-om-namo',
    titulo: 'Om Namo Bhagavate',
    autor: 'Deva Premal & Miten',
    duracion: '07:10',
    src: '/audios/mantra-om-namo.mp3',
    tipo: 'mantras',
  },
  {
    id: 'mantra-om-tare',
    titulo: 'Om Tare Tuttare',
    autor: 'Deva Premal',
    duracion: '07:20',
    src: '/audios/mantra-om-tare.mp3',
    tipo: 'mantras',
  },

  // --- Afirmaciones ---
  {
    id: 'afirmaciones-manana',
    titulo: 'Afirmaciones para la mañana',
    autor: 'Amor propio, autoestima y confianza',
    duracion: '15:46',
    src: '/audios/afirmaciones-manana.mp3',
    tipo: 'afirmaciones',
  },
  {
    id: 'afirmaciones-noche',
    titulo: 'Afirmaciones para dormir',
    autor: 'Suelta el día y descansa feliz',
    duracion: '08:42',
    src: '/audios/afirmaciones-noche.mp3',
    tipo: 'afirmaciones',
  },

  // --- Frecuencias ---
  {
    id: 'frecuencia-528',
    titulo: 'Frecuencia 528 Hz',
    autor: 'Frecuencia del amor y la sanación',
    duracion: '25:08',
    src: '/audios/frecuencia-528.mp3',
    tipo: 'frecuencias',
  },
  {
    id: 'frecuencia-432',
    titulo: 'Frecuencia 432 Hz',
    autor: 'Sanación, equilibrio y armonía',
    duracion: '22:23',
    src: '/audios/frecuencia-432.mp3',
    tipo: 'frecuencias',
  },

  // --- Sonidos de la naturaleza ---
  {
    id: 'lluvia-calma',
    titulo: 'Lluvia y calma',
    autor: 'Sonidos de la naturaleza',
    duracion: '—',
    src: '/audios/placeholder.mp3', // pendiente: subir el audio real
    tipo: 'naturaleza',
    proximamente: true,
  },
];
