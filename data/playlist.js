/**
 * MÚSICA PNL Y AFIRMACIONES (Zona Zen)
 * -------------------------------------------------------------
 * Lista de reproducción para frecuencias, música relajante y audios
 * de afirmaciones positivas.
 *
 * >>> PARA EL ADMINISTRADOR <<<
 * Sube los .mp3 a /public/audios/ y pon la ruta en "src"
 * (por ejemplo '/audios/mi-audio.mp3'). Para dejar una pista "en espera",
 * añade `proximamente: true` y aparecerá marcada como "Próximamente".
 */
export const playlist = [
  {
    id: 'afirmaciones-manana',
    titulo: 'Afirmaciones para la mañana',
    autor: 'Amor propio, autoestima y confianza',
    duracion: '15:46',
    src: '/audios/afirmaciones-manana.mp3',
  },
  {
    id: 'frecuencia-528',
    titulo: 'Frecuencia 528 Hz',
    autor: 'Frecuencia del amor y la sanación',
    duracion: '25:08',
    src: '/audios/frecuencia-528.mp3',
  },
  {
    id: 'frecuencia-432',
    titulo: 'Frecuencia 432 Hz',
    autor: 'Sanación, equilibrio y armonía',
    duracion: '22:23',
    src: '/audios/frecuencia-432.mp3',
  },
  {
    id: 'afirmaciones-noche',
    titulo: 'Afirmaciones para dormir',
    autor: 'Suelta el día y descansa feliz',
    duracion: '08:42',
    src: '/audios/afirmaciones-noche.mp3',
  },
  {
    id: 'lluvia-calma',
    titulo: 'Lluvia y calma',
    autor: 'Sonidos de la naturaleza',
    duracion: '—',
    src: '/audios/placeholder.mp3', // pendiente: subir el audio real
    proximamente: true,
  },
];
