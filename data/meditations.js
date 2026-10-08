/**
 * MEDITACIONES GUIADAS
 * -------------------------------------------------------------
 * Listado de meditaciones. La de "Corazones Gemelos" tiene una pantalla
 * de preparación obligatoria (ver /data/preparation.js).
 *
 * >>> PARA EL ADMINISTRADOR <<<
 * Sube los mp3 a /public/audios/ y actualiza el campo "src".
 */
export const meditations = [
  {
    id: 'corazones-gemelos',
    titulo: 'Meditación de los Corazones Gemelos',
    maestro: 'Master Choa Kok Sui',
    duracion: '40:10',
    descripcion:
      'Una meditación de bendición y sanación que abre el corazón hacia el planeta entero. Requiere una preparación previa.',
    requierePreparacion: true, // activa la pantalla de preparación obligatoria
    src: '/audios/corazones-gemelos.mp3', // audio real de la meditación
    color: 'terracotta',
  },
  {
    id: 'escaneo-corporal',
    titulo: 'Escaneo corporal para soltar tensión',
    maestro: 'Gabriela Litschi · Atención plena',
    duracion: '14:33',
    descripcion:
      'Recorre tu cuerpo con suavidad, liberando la tensión acumulada zona por zona.',
    requierePreparacion: false,
    src: '/audios/escaneo-corporal.mp3',
    color: 'sage',
  },
  {
    id: 'refugio-seguro',
    titulo: 'Tu refugio seguro',
    maestro: 'Gabriela Litschi · Visualización guiada',
    duracion: '16:57',
    descripcion:
      'Crea un lugar interno de calma al que podrás volver siempre que lo necesites.',
    requierePreparacion: false,
    src: '/audios/refugio-seguro.mp3',
    color: 'sand',
  },
];

export function getMeditationById(id) {
  return meditations.find((m) => m.id === id);
}
