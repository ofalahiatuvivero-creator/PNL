import './globals.css';
import Script from 'next/script';
import { Fraunces, Manrope } from 'next/font/google';
import BottomNav from '@/components/BottomNav';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import AmbientSound from '@/components/AmbientSound';
import FondoVivo from '@/components/FondoVivo';
import SelectorAtmosfera from '@/components/SelectorAtmosfera';
import Umbral from '@/components/Umbral';

/* -------------------------------------------------------------
   TIPOGRAFÍAS — "Aurora de bosque"
   Fraunces -> títulos, afirmaciones y frases (serif editorial suave)
   Manrope  -> interfaz y texto (reemplaza a Poppins y Nunito)
   Se cargan con next/font para un rendimiento óptimo.
   ------------------------------------------------------------- */
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = {
  title: 'Raíces · PNL y Sanación Emocional',
  description:
    'Un refugio que respira: ejercicios de PNL, respiración, meditaciones y bienestar emocional.',
  applicationName: 'Raíces',
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
  themeColor: '#17091F',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

/* Fija la atmósfera antes de pintar (evita el "flash" de tema). */
const atmosferaScript = `(function(){try{
var q=new URLSearchParams(location.search).get('atmosfera');
var validas=['amanecer','dia','atardecer','noche','nebulosa'];
var a;
if(q&&validas.indexOf(q)>=0){a=q;}
else{var p=localStorage.getItem('raices-atmosfera')||'nebulosa';
if(p==='nebulosa'){a='nebulosa';}else if(p==='noche'){a='noche';}else if(p==='claro'){a='dia';}
else if(p==='auto'){var h=new Date().getHours();a=(h>=5&&h<11)?'amanecer':(h>=11&&h<17)?'dia':(h>=17&&h<20)?'atardecer':'noche';}
else{a='nebulosa';}}
document.documentElement.setAttribute('data-atmosfera',a);
}catch(e){document.documentElement.setAttribute('data-atmosfera','nebulosa');}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      data-atmosfera="nebulosa"
      suppressHydrationWarning
      className={`${fraunces.variable} ${manrope.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: atmosferaScript }} />
        {/* Fondo ambiental vivo (mesh + grano + luciérnagas de noche) */}
        <FondoVivo />
        {/* Marco tipo app móvil, centrado en pantallas grandes */}
        <div className="app-shell pb-28">
          {children}
          <BottomNav />
        </div>

        {/* Controles flotantes (arriba a la derecha): atmósfera + música */}
        <div className="pointer-events-none fixed left-1/2 top-0 z-50 w-full max-w-md -translate-x-1/2">
          <div
            className="flex justify-end gap-2 px-4"
            style={{ paddingTop: 'calc(env(safe-area-inset-top) + 0.9rem)' }}
          >
            <div className="pointer-events-auto">
              <SelectorAtmosfera />
            </div>
            <div className="pointer-events-auto">
              <AmbientSound />
            </div>
          </div>
        </div>

        {/* Ritual de entrada (una vez por sesión) */}
        <Umbral />
        {/* Registra el service worker (PWA / soporte sin conexión) */}
        <ServiceWorkerRegister />

        {/* Analítica Umami (anónima y sin cookies) */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="c13741ac-895e-4868-8e13-0692d6353afe"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
