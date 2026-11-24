# Raíces — Documento de Contexto Completo (Handoff)

> **Para la nueva cuenta de Claude / próximo desarrollador.**
> Este documento reúne TODO el contexto de la app web "Raíces" para poder
> continuar las modificaciones sin perder nada. Léelo completo antes de tocar
> código. Fecha de corte: noviembre 2026.

---

## 0. Resumen en 30 segundos

**Raíces** es una **PWA (web app instalable)** de bienestar emocional, en español,
hecha con **Next.js 14.2.x**. Mobile-first, estética cálida y cósmica ("Un refugio
que respira"). Está **en producción en Vercel** y se despliega sola al hacer push a
GitHub. Autor/creador de la idea y del contenido de PNL: **Jhon Fredy Primiciero
Malaver** (Programador Neurolingüístico). Usuaria principal: **Marcela** (psicóloga).

---

## 1. Dónde vive todo (enlaces y cuentas)

- **App en vivo (ÚNICA):** `https://pnl-lime.vercel.app`
  ⚠️ El guion es un **guion normal** (`-`). Al escribirlo a mano NO uses guiones
  especiales (– — ‑) o el navegador lo convierte en `xn--...` y da 404.
- **Repositorio (fuente de la verdad):** `https://github.com/ofalahiatuvivero-creator/PNL`
  (rama `main`). Push a `main` → Vercel despliega automático en ~30–60 s.
- **Hosting:** Vercel. Cuenta "Jhon / Hobby", project `pnl`. **Netlify fue retirado**
  (ya no se usa).
- **Analítica:** Umami (anónima, sin cookies). ID público `c13741ac-895e-4868-8e13-0692d6353afe`.
  Panel en `cloud.umami.is`.
- **Voz / audios:** **ElevenLabs** (cuenta PAGADA de la dueña). Voz elegida:
  **"Lolita Carré"**, `voice_id = 9wO0EaRg14bevRQMm4Md` (cálida, serena, español).
- **Carpeta local:** originalmente `D:\pnl`; esta sesión corre en `D:\pnl app`. El
  **repo de GitHub es la referencia**; la ruta local puede variar.

---

## 2. Cómo correr y desplegar

```bash
npm install
npm run dev     # desarrollo local (http://localhost:3000)
npm run build   # compilar para producción (verificar antes de desplegar)
```

**Flujo de despliegue:** editar en local → `npm run build` + probar en el navegador
→ `git add -A && git commit -m "..." && git push origin main` → Vercel publica solo.

### Reglas de oro (gotchas importantes)
1. **Mantener Next en 14.2.x.** Nunca forzar a v15/v16 (`npm audit fix --force` lo
   rompe). React 18.
2. **Nunca** correr `npm run build` mientras `next dev` está activo → corrompe `.next`.
3. **El guion del enlace** (ver arriba).
4. En algunos entornos de sandbox, el build puede **fallar al bajar las fuentes de
   Google** (next/font) — es transitorio/de red; reintentar el build. En Vercel
   compila bien siempre.
5. Tras desplegar, el **service worker** se actualiza solo en la siguiente visita.
   Si un dispositivo instaló la PWA, para ver un **icono nuevo** hay que
   desinstalar/reinstalar (el SO congela el icono al instalar).

---

## 3. Stack técnico

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 14.2.35 (App Router) |
| UI | React 18.3.1 |
| Estilos | Tailwind CSS 3 + variables CSS por atmósfera |
| Íconos | lucide-react |
| Fuentes | next/font (Fraunces serif + Manrope sans) — auto-alojadas |
| Analítica | Umami (next/script) |
| Hosting | Vercel · Repo GitHub |
| Audios | ElevenLabs (TTS) vía conector; MP3 estáticos en /public/audios |

La app es **estática / renderizada en el cliente**: **no hay backend ni base de
datos**. El estado del usuario vive en el navegador (localStorage/sessionStorage).

---

## 4. Estructura del proyecto

```
app/
  layout.jsx        Capa global: fuentes, FondoVivo, nav, Umbral, Umami, script anti-flash
  page.jsx          INICIO (saludo, afirmación, check-in de ánimo, menú "bento")
  globals.css       SISTEMA DE DISEÑO: tokens por atmósfera + animaciones (clave)
  manifest.js       Manifiesto PWA (nombre, iconos, colores)
  template.jsx      Transición suave entre páginas
  ejercicios/       Ejercicios PNL (listado + [id] detalle paso a paso con audio-guía)
  zen/              Zona Zen (Respiración con técnicas + Música/Playlist)
  meditaciones/     Meditaciones (incluye Corazones Gemelos con preparación obligatoria)
  diccionario/      Diccionario Bio-Emocional (101 entradas A–Z, buscador)
  herbolaria/       Herbolaria (42 plantas, buscador, filtros, plantas de fondo sutiles)
  audios/           AUDIOTECA (audios originales de PNL/bienestar) — reemplazó a "Biblioteca"
  diario/           Mi Diario (privado, localStorage)
components/          ~30 componentes reutilizables (ver §6 y §7)
data/               Contenido: affirmations, audios, dictionary(.json), exercises,
                    herbs, meditations, moods, playlist, preparation
lib/storage.js      Hook useLocalStorage (guardado en el dispositivo)
public/             Estáticos: logo-gold.png, iconos, /audios/*.mp3, sw.js, manifest
next.config.js      Config + CABECERAS DE SEGURIDAD (CSP, HSTS, etc.)
tailwind.config.js  Colores → variables CSS
```

**Separación clave:** el **contenido** vive en `data/` (y los MP3 en `public/audios/`),
separado de la lógica. Para ampliar diccionario, plantas, audios o ejercicios se edita
`data/`, no la lógica.

---

## 5. Sistema de diseño ("Un refugio que respira")

- **5 atmósferas** que intercambian variables de color vía el atributo
  `data-atmosfera` en `<html>`: `amanecer` (base en `:root`), `dia`, `atardecer`,
  `noche`, `nebulosa`. **Nebulosa es la atmósfera POR DEFECTO** (rosa cósmico estilo
  James Webb: fondo `#17091F`, acento rosa, estrellas y destellos). Noche y nebulosa
  son modo oscuro real.
- **Preview de atmósfera:** añadir `?atmosfera=nebulosa` (o dia/noche/etc.) a cualquier
  URL la fuerza (útil para probar).
- **Regla de diseño:** usar las clases `.card` / `.glass` (cristal) y tokens Tailwind
  mapeados a variables (`bg-sage-100`, `text-ink`, `bg-cream`=var(--ground)…).
  **NUNCA** hardcodear `bg-white`/`shadow-card` en superficies: en modo noche quedan
  blancas y rompen el tema. Para inputs: fondo `var(--glass-strong)` + borde
  `var(--glass-border)`.
- **Logo:** `public/logo-gold.png` (cerebro dorado con raíces, degradado metálico).
  El icono de la app (iconos PWA) es ese logo dorado sobre fondo ciruela cósmico.
- **Fuentes:** Fraunces (títulos/frases) + Manrope (interfaz).
- **Elemento firma:** `EsferaDeLuz` (orbe iridiscente; props size/modo/escala/transMs).
- **Icono de ánimo:** `components/MoodFace.jsx` — orbe minimalista con expresión de
  línea, color por **psicología del color** (feliz=amarillo, calma=verde, normal=neutro,
  ansioso=lavanda, triste=azul, cansado=índigo). Se probaron gatitos (`MoodCat.jsx`,
  en desuso) pero la dueña los descartó por falta de seriedad.
- **Movimiento:** transiciones suaves, respeto a `prefers-reduced-motion` (excepto la
  guía de respiración, que anima por requestAnimationFrame para funcionar siempre).

---

## 6. Módulos / pantallas (estado actual)

1. **Inicio** (`app/page.jsx`): marca (logo dorado) + saludo (`Greeting`) + afirmación
   del día (`AffirmationCard`) + check-in de ánimo (`DailyCheckIn` → `MoodPicker` con
   `MoodFace`) + menú "bento" con los 7 módulos (incluye "Mi Diario") + cierre.
2. **Zona Zen** (`app/zen`): pestañas Respiración / Música.
   - Respiración (`BreathingCircle`): 4 técnicas en cuadrícula 2×2 — **Suspiro
     fisiológico, Coherencia cardíaca, Diafragmática, Wim Hof** (esta por rondas, en
     `WimHof.jsx`, con aviso de seguridad). La esfera se expande/recoge por
     **requestAnimationFrame** (variable CSS `--resp-escala`), no por transición CSS
     (así anima aunque haya "reducir movimiento"). Tiene **cronómetro de sesión**
     opcional (Libre / 1 / 3 / 5 min) con cuenta regresiva.
   - Música (`Playlist` + `data/playlist.js`): mantras, frecuencias, naturaleza.
3. **Ejercicios PNL** (`app/ejercicios`): listado por categorías + detalle paso a paso
   (`[id]/page.jsx`). **Cada ejercicio tiene GUÍA EN AUDIO** (voz, para hacerlo con los
   ojos cerrados) vía el campo `audio` en `data/exercises.js`. Son 6 ejercicios, los 6
   con audio.
4. **Meditaciones** (`app/meditaciones`): lista con esfera por meditación.
   **Corazones Gemelos** tiene **preparación obligatoria** (checklist de 14 ejercicios
   + aviso de salud) antes de reproducir — NO romper esa lógica. Reproductor inmersivo
   (`MeditationPlayer`) con esfera que late.
5. **Diccionario Bio-Emocional** (`app/diccionario` + `data/dictionary.json`): 101
   entradas A–Z, buscador, "¿Para qué?" y aviso de salud. Contenido ORIGINAL (no copiar
   de Vilanova/otros) y mantener el aviso médico.
6. **Herbolaria** (`app/herbolaria` + `data/herbs.js`): 42 plantas, buscador, filtros
   por categoría, aviso de seguridad, y **plantas de fondo sutiles** (`HojasHerbolaria`).
7. **Audioteca** (`app/audios` + `data/audios.js`): audios ORIGINALES de PNL/bienestar,
   narrados con la voz. Reemplazó a la antigua "Biblioteca de PDF". Agrupa por categoría
   (Para empezar / PNL en audio / Sanar y reconectar). Usa `AudioPlayer`.
8. **Mi Diario** (`app/diario`): privado, guarda en `localStorage` (clave
   `raices-diario`). Racha de días, historial, borrar. **Nada se envía a servidor.**
   La dueña decidió NO poner PIN/candado.

**Navegación** (`components/BottomNav.jsx`): barra flotante de cristal con **las 8
secciones visibles a la vez** (sin menú oculto). **"Inicio" es el botón central
destacado**; prácticas a la izquierda, contenido a la derecha. Un chip encima muestra
el nombre de la sección activa. (`template.jsx` da la transición entre páginas.)

---

## 7. Sistema de AUDIO (importante para seguir produciendo)

Todos los audios son **MP3 estáticos** en `public/audios/`. Dos usos:
- **Audioteca** → entradas en `data/audios.js` (campo `src`).
- **Guía de ejercicios** → campo `audio` en cada ejercicio de `data/exercises.js`.
- También hay audios de meditaciones, música y afirmaciones (ya existentes).

### Cómo generar un audio nuevo (pipeline con ElevenLabs)
La cuenta de ElevenLabs de la dueña está conectada como conector. Herramientas
(nombres del conector `creative_*`): `creative_list_voices`,
`creative_generate_speech`, `creative_get_flow_run_status`.

1. **Escribir un guion ORIGINAL** (nunca copiar texto de libros/obras con derechos).
   Usa "..." para pausas y cuenta los tiempos en las respiraciones.
2. `creative_generate_speech` con: `voice_id = 9wO0EaRg14bevRQMm4Md` (Lolita Carré),
   `model_id = eleven_multilingual_v2`, `generations_count = 1`, reusando un `flow_id`.
   Devuelve `session_id`.
3. `creative_get_flow_run_status(flow_id, [session_ids])` → cuando `all_completed`,
   trae `content_url` (MP3 con firma temporal).
4. Descargar: `curl -sL "<content_url>" -o public/audios/<nombre>.mp3`.
5. Conectarlo: añadir la entrada en `data/audios.js` (Audioteca) o el campo `audio` en
   `data/exercises.js` (ejercicio).
6. `npm run build` → commit → push.

**Costo (referencia):** ~1 min de voz ≈ 1.000–1.600 créditos ≈ **0,20–0,32 USD**.
Son créditos de la cuenta PAGADA de la dueña (uso comercial permitido en planes de
pago). Avisar el costo aproximado antes de lotes grandes.

**Contenido de audio ya hecho:**
- Audioteca: Bienvenida, ¿Qué es la PNL?, El poder de tus creencias, Anclaje emocional,
  Sanar a tu niño interior.
- Guías de los 6 ejercicios PNL (`public/audios/ej-*.mp3`).

---

## 8. Datos, privacidad y seguridad

- **Diario/ánimo/preferencias:** solo en el dispositivo (localStorage). Sin backend, sin
  sincronización entre dispositivos, sin respaldo en la nube.
- **Umami:** anónima, sin cookies → no requiere banner de consentimiento.
- **Seguridad (`next.config.js`):** cabeceras CSP, HSTS, X-Frame-Options,
  X-Content-Type-Options, Referrer-Policy, Permissions-Policy; oculta X-Powered-By. La
  CSP permite Umami (`cloud.umami.is`) y audios propios. Si agregas un recurso externo
  nuevo (script, dominio), hay que permitirlo en la CSP o lo bloquea.
- **Service worker** (`public/sw.js`, `raices-v3`): estrategia SEGURA — NO intercepta
  navegaciones ni `/_next/` (siempre red, evita servir una página por otra), solo cachea
  medios estáticos; al activarse borra cachés viejas. **Si cambias su lógica, sube el
  número de versión** (`raices-v4`…).
- **Sin secretos en el repo.** `.gitignore` bloquea `.env` y llaves.

---

## 9. Decisiones y contexto importantes (no repetir errores)

- **Derechos de autor:** se RETIRARON los PDF de libros de terceros (O'Connor,
  Stamateas…) porque son obras con derechos; "estar viejos o en la web" NO los hace
  legales. La Biblioteca se reemplazó por **Audioteca con contenido ORIGINAL**. Misma
  regla para música/mantras (usar royalty-free o enlaces oficiales). **Nunca** hospedar
  ni narrar obras de terceros con derechos.
  - ⚠️ **Pendiente de revisar:** la meditación **"Corazones Gemelos" (Master Choa Kok
    Sui)** y las de **Gabriela Litschi** ("Escaneo corporal", "Tu refugio seguro") están
    en la app; falta **permiso formal de los autores** (ver §10).
- **El diario** NO lleva PIN (decisión de la dueña).
- **Audios:** se usa voz de IA (ElevenLabs, Lolita Carré). La dueña descartó, por ahora,
  grabar con su propia voz.
- **Netlify** se retiró; solo Vercel.
- **Autoría:** el documento técnico atribuye la obra a **Jhon Fredy Primiciero Malaver**.

---

## 10. Pendientes / Roadmap

1. **Seguridad de cuentas (dueño):** poner el repo de GitHub **en privado** + activar
   **2FA** en GitHub y Vercel.
2. **Permisos de autores:** correo a **Gabriela Litschi** pidiendo permiso para sus 2
   meditaciones (borrador ya redactado en el chat; da opción de retirar). Revisar también
   la de Corazones Gemelos (Master Choa Kok Sui) — si no hay permiso, considerar
   reemplazarla por una meditación original.
3. **Dominio propio** (ej. `raicespnl.com`) para marca estable y para Google Play.
4. **Google Play:** empaquetar la PWA como **TWA** con **PWABuilder** o **Bubblewrap**
   (requiere Play Console ~25 USD, verificación de dominio `assetlinks.json`, ficha con
   ícono/capturas/política de privacidad).
5. **Más audios** para la Audioteca (ansiedad, autoestima, dormir mejor, gratitud…) —
   guiones originales + narración con la misma voz.
6. **Monetización** (rol sugerido: mezcla freemium + embudo a los servicios de la
   profesional + programa de pago; evitar anuncios). Redactar **política de privacidad**
   y **términos** (necesarios para Play).
7. **Opcional:** enlaces legales "Para profundizar" en la Audioteca (LibriVox dominio
   público, charlas oficiales de YouTube).

---

## 11. Personas

- **Marcela:** psicóloga/coach, usuaria principal y quien pide los cambios. Trato cálido,
  en español, explicar sin tecnicismos.
- **Jhon Fredy Primiciero Malaver:** Programador Neurolingüístico; autor/creador de la
  idea y del contenido de PNL. Aparece como autor en el documento de construcción
  (`DOCUMENTACION-CONSTRUCCION.md` y su PDF).

---

## 12. Historial resumido (lo construido)

Rediseño "Un refugio que respira" en varias fases (atmósferas, cristal, fuentes, fondo
vivo, Umbral de entrada, Inicio bento, navegación). Luego: atmósfera **Nebulosa** por
defecto; **logo dorado** + icono de app; **check-in con orbes** por psicología del color;
**Zona Zen** con 4 técnicas reales + cronómetro; **arreglo** de la esfera que no animaba
(reduce-motion); **nav** con todo visible + Inicio al centro + chip de sección;
**seguridad** (cabeceras) y **service worker** seguro (arreglo de navegación rota por
caché); **solo Vercel** (Netlify retirado); **Audioteca** (reemplaza PDF) con audios
originales; **guías en audio** para los 6 ejercicios PNL; **plantas sutiles** en
Herbolaria; **documento de construcción** (PDF) con autoría. Ver `git log` para el detalle.

---

*Documento vivo: actualízalo cuando cambie el stack, el proceso, el alcance o los
pendientes. Fuente de la verdad del código: el repo de GitHub, rama `main`.*
