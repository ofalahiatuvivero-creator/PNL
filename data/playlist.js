/**
 * MÚSICA PNL Y AFIRMACIONES (Zona Zen)
 * -------------------------------------------------------------
 * Lista de reproducción para frecuencias, música relajante y audios
 * de afirmaciones positivas.
 *
 * >>> PARA EL ADMINISTRADOR <<<
 * Sube tus archivos .mp3 a la carpeta /public/audios/ y cambia el campo
 * "src" por la ruta correspondiente, por ejemplo: '/audios/mi-audio.mp3'.
 * Mientras tanto, todas apuntan a un placeholder para que la interfaz funcione.
 */
export const playlist = [
  {
    id: 'frecuencia-528',
    titulo: 'Frecuencia 528 Hz',
    autor: 'Frecuencia del amor y la reparación',
    duracion: '10:00',
    src: '/audios/placeholder.mp3', // <-- reemplazar por el mp3 real
  },
  {
    id: 'afirmaciones-manana',
    titulo: 'Afirmaciones para la mañana',
    autor: 'Voz femenina · Comienza tu día',
    duracion: '06:30',
    src: '/audios/placeholder.mp3',
  },
  {
    id: 'lluvia-calma',
    titulo: 'Lluvia y calma',
    autor: 'Sonidos de la naturaleza',
    duracion: '15:00',
    src: '/audios/placeholder.mp3',
  },
  {
    id: 'frecuencia-432',
    titulo: 'Frecuencia 432 Hz',
    autor: 'Armonía y equilibrio',
    duracion: '12:00',
    src: '/audios/placeholder.mp3',
  },
  {
    id: 'afirmaciones-noche',
    titulo: 'Afirmaciones para dormir',
    autor: 'Voz femenina · Suelta el día',
    duracion: '08:15',
    src: '/audios/placeholder.mp3',
  },
];
