import './globals.css';
import { Nunito, Poppins, Lora } from 'next/font/google';
import BottomNav from '@/components/BottomNav';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';

/* -------------------------------------------------------------
   TIPOGRAFÍAS
   Nunito  -> cuerpo (redondeada y muy legible)
   Poppins -> interfaz, botones y etiquetas
   Lora    -> títulos (serif suave con alma)
   Se cargan con next/font para un rendimiento óptimo.
   ------------------------------------------------------------- */
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata = {
  title: 'Raíces · PNL y Sanación Emocional',
  description:
    'Un espacio cálido para reconectar contigo: ejercicios de PNL, respiración, meditaciones y bienestar emocional.',
  applicationName: 'Raíces',
  // Permite "Añadir a pantalla de inicio" con buen aspecto en iPhone.
  appleWebApp: {
    capable: true,
    title: 'Raíces',
    statusBarStyle: 'default',
  },
  icons: {
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  themeColor: '#FBF7F0',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${nunito.variable} ${poppins.variable} ${lora.variable}`}>
      <body>
        {/* Marco tipo app móvil, centrado en pantallas grandes */}
        <div className="app-shell pb-24">
          {children}
          {/* Navegación inferior fija (los 4 pilares + inicio) */}
          <BottomNav />
        </div>
        {/* Registra el service worker (PWA / soporte sin conexión) */}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
