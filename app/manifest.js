/**
 * WEB APP MANIFEST (PWA)
 * -------------------------------------------------------------
 * Permite "instalar" la app en la pantalla de inicio del celular y que se
 * abra a pantalla completa, como una aplicación nativa.
 * Next.js sirve esto automáticamente en /manifest.webmanifest.
 *
 * El administrador puede cambiar el nombre, los colores o los íconos aquí.
 * Los íconos PNG están en /public (icon-192, icon-512, maskable, apple).
 */
export default function manifest() {
  return {
    name: 'Raíces · PNL y Sanación Emocional',
    short_name: 'Raíces',
    description:
      'Un espacio cálido para reconectar contigo: ejercicios de PNL, respiración, meditaciones y bienestar emocional.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    lang: 'es',
    background_color: '#FBF7F0',
    theme_color: '#FBF7F0',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
