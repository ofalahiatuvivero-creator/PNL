# Raíces — Documento de Construcción del Software

> App de PNL, respiración y sanación emocional.
> Documento técnico y de proceso. Versión 1.0 · Noviembre 2026.

**Autor y creador de la idea · Dirección y experto en PNL:**
**Jhon Fredy Primiciero Malaver** — Programador Neurolingüístico.
Autor de la concepción, el contenido y el enfoque de PNL de toda la aplicación.

---

## 1. Resumen ejecutivo

**Raíces** es una aplicación web progresiva (PWA) de bienestar emocional: ejercicios de PNL,
técnicas de respiración, meditaciones guiadas, un diccionario bio‑emocional, herbolaria,
biblioteca y un diario privado. Está diseñada **mobile‑first**, con una estética cálida y
cósmica ("Un refugio que respira") y es **instalable** como app en el teléfono.

- **Tipo:** PWA (web app instalable), no requiere tienda para funcionar.
- **Audiencia:** personas que buscan acompañamiento emocional y autoconocimiento.
- **Estado:** en producción, lista para usar y para empaquetar hacia Google Play.

---

## 2. Objetivo y alcance

**Objetivo:** ofrecer un espacio digital cálido y seguro para la regulación emocional y el
autoconocimiento, accesible desde cualquier dispositivo, sin fricción.

**Dentro del alcance:** contenido original de bienestar, herramientas interactivas
(respiración, check‑in de ánimo, diario), reproducción de audios, y una experiencia de
marca coherente.

**Fuera del alcance (por ahora):** cuentas de usuario en servidor, backend con base de datos,
sincronización entre dispositivos y pagos dentro de la app. El diario y las preferencias se
guardan **solo en el dispositivo** (privacidad por diseño).

---

## 3. Principios y reglas de construcción (el "orden")

1. **Primero el contenido y la seguridad del usuario.** Los avisos de salud (diccionario,
   herbolaria, preparación de Corazones Gemelos) son obligatorios y siempre visibles.
2. **Mobile‑first.** Todo se diseña para el teléfono y luego se adapta.
3. **Sistema de diseño por tokens.** Los colores viven como variables CSS y cambian por
   "atmósfera"; nunca se fijan colores a mano que rompan el modo oscuro.
4. **Componentes reutilizables y pequeños.** Cada pieza (esfera, tarjeta, navegación) es
   independiente y legible.
5. **No romper la lógica existente** al rediseñar: bloqueos, guardado del diario, subida de
   PDF, filtros y navegación paso a paso se conservan.
6. **Verificar antes de entregar.** Cada cambio se compila y se prueba en el navegador antes
   de desplegar.
7. **Accesibilidad y movimiento responsable.** Etiquetas accesibles, foco visible y respeto a
   "reducir movimiento" (salvo la guía de respiración, que necesita animar para funcionar).
8. **Despliegue continuo.** Cada cambio aprobado se publica solo al subirlo al repositorio.

---

## 4. Stack tecnológico

| Capa | Tecnología | Por qué |
|------|------------|---------|
| Framework | **Next.js 14.2.x** (App Router) | Rendimiento, rutas, PWA, despliegue sencillo |
| Librería UI | **React 18** | Base de Next; componentes |
| Estilos | **Tailwind CSS 3** + variables CSS | Diseño rápido y sistema de atmósferas |
| Íconos | **lucide-react** | Íconos de línea coherentes |
| Tipografías | **next/font** (Fraunces + Manrope) | Se auto‑alojan: rápidas y sin depender de terceros |
| Analítica | **Umami** (anónima, sin cookies) | Métricas respetuosas con la privacidad |
| Hosting | **Vercel** | Build e infraestructura para Next.js |
| Repositorio | **GitHub** | Control de versiones y disparo de despliegues |

Dependencias **mínimas e intencionales** (sin librerías pesadas innecesarias).

---

## 5. Arquitectura y estructura de carpetas

Aplicación **estática/renderizada en el cliente**: no hay servidor propio con base de datos;
el estado del usuario vive en el navegador (localStorage/sessionStorage).

```
D:\pnl
├─ app/                  Rutas (una carpeta = una pantalla)
│  ├─ layout.jsx         Capa global: fuentes, fondo, navegación, analítica
│  ├─ page.jsx           Inicio (saludo, afirmación, check‑in, menú)
│  ├─ ejercicios/        Ejercicios PNL (listado y detalle paso a paso)
│  ├─ zen/               Zona Zen (respiración + música)
│  ├─ meditaciones/      Meditaciones (incluye Corazones Gemelos con preparación)
│  ├─ diccionario/       Diccionario Bio‑Emocional (A–Z)
│  ├─ herbolaria/        Herbolaria (plantas)
│  ├─ biblioteca/        Biblioteca (lectura y subida de PDF)
│  ├─ diario/            Mi Diario (privado)
│  └─ globals.css        Sistema de diseño: tokens por atmósfera + animaciones
├─ components/           Piezas reutilizables (Esfera, navegación, tarjetas…)
├─ data/                 Contenido (ejercicios, diccionario, plantas, ánimos…)
├─ lib/                  Utilidades (almacenamiento)
├─ public/               Estáticos: logo, íconos, audios, manifest, service worker
├─ next.config.js        Configuración + cabeceras de seguridad
├─ tailwind.config.js    Mapa de colores → variables CSS
└─ package.json          Dependencias y scripts
```

**Separación clave:** el **contenido** (carpeta `data/`) está separado del **código**, así se
puede ampliar el diccionario o las plantas sin tocar la lógica.

---

## 6. Sistema de diseño ("Un refugio que respira")

- **5 atmósferas** (`amanecer`, `dia`, `atardecer`, `noche`, `nebulosa`) que intercambian las
  variables de color mediante el atributo `data-atmosfera` en la página. **Nebulosa**
  (rosa cósmico, inspirado en el James Webb) es la atmósfera por defecto.
- **Cristal (glassmorphism):** tarjetas translúcidas con desenfoque que se adaptan a cada
  atmósfera (clases `.card` / `.glass`).
- **Elemento firma:** la **Esfera de Luz**, que respira, flota y guía la respiración.
- **Tipografías:** Fraunces (títulos y frases) + Manrope (interfaz).
- **Movimiento:** transiciones suaves, respeto a "reducir movimiento", fundidos de audio.

---

## 7. Datos y privacidad

- **El diario, el ánimo y las preferencias se guardan solo en el dispositivo** (localStorage).
  No viajan a ningún servidor. Esto es privacidad por diseño y evita obligaciones de
  tratamiento de datos personales.
- **Analítica Umami:** anónima y **sin cookies**; mide visitas y páginas, no identifica
  personas. Por eso no se requiere banner de consentimiento.
- **Avisos de salud** presentes y legibles en Diccionario, Herbolaria y en la preparación de
  Corazones Gemelos. La app es una guía de autoconocimiento, **no** sustituye atención
  profesional.

---

## 8. Seguridad (blindaje)

- **Cabeceras de seguridad** (en `next.config.js`): Content‑Security‑Policy,
  Strict‑Transport‑Security (HTTPS forzado), X‑Content‑Type‑Options, X‑Frame‑Options
  (anti‑clickjacking), Referrer‑Policy y Permissions‑Policy (cámara/micrófono/ubicación
  desactivados).
- **Sin secretos en el repositorio.** No hay llaves ni contraseñas; el ID de Umami es público
  por diseño. `.gitignore` bloquea `.env` y archivos de credenciales.
- **HTTPS siempre** (Vercel).
- **Service worker seguro:** no sirve una página por otra ni guarda HTML viejo; solo cachea
  medios estáticos.
- **Dependencias auditadas:** las alertas restantes son de herramientas de compilación (no se
  exponen a los usuarios).

**Pendiente recomendado (acción del dueño):** repositorio en **privado** y **2FA** activo en
GitHub y Vercel.

---

## 9. Proceso de build y despliegue (CI/CD)

1. Se programa/edita en local (`D:\pnl`).
2. Se compila y verifica: `npm run build` + prueba en el navegador.
3. Se sube a GitHub (rama `main`).
4. **Vercel despliega automáticamente** cada cambio de `main` a producción.
5. El service worker se actualiza solo en los dispositivos en la siguiente visita.

> Regla de oro: **nunca** ejecutar `npm run build` mientras `next dev` está corriendo (corrompe
> la carpeta `.next`).

---

## 10. Convenciones de código y flujo de trabajo

- **Idioma:** interfaz y comentarios en español.
- **Commits** descriptivos, en español, por cambio coherente.
- **Componentes** con comentario de propósito al inicio.
- **Colores** siempre vía tokens/variables (nunca `bg-white` fijo en superficies).
- **Contenido** nuevo (plantas, entradas) se agrega en `data/`, no en la lógica.
- **Rutas** se conservan; no se rompen enlaces existentes.

---

## 11. Verificación y calidad

Antes de cada entrega: compilación exitosa, revisión de consola sin errores, prueba de la
funcionalidad afectada en el navegador (y en varias atmósferas cuando aplica), y captura de
pantalla de evidencia. Se respeta la accesibilidad (etiquetas, foco, contraste).

---

## 12. PWA e ingreso a Google Play

- La app ya es **instalable** (manifest + íconos + service worker + HTTPS).
- Para **Google Play** se empaqueta como **TWA (Trusted Web Activity)** con **Bubblewrap** o
  **PWABuilder**: genera un instalable Android (.aab) que abre la app desde su dirección web.
- Requisitos: cuenta de **Google Play Console** (pago único ~25 USD), verificación de dominio
  (`assetlinks.json`) y, recomendado, un **dominio propio**.

---

## 13. Mantenimiento y roadmap

- **Ampliar contenido:** más plantas, entradas del diccionario, ejercicios.
- **Audios:** opción futura (guías de voz) — hoy fuera de alcance por decisión del dueño.
- **Dominio propio** para instalación estable y marca.
- **Posible nivel Premium** y funnel hacia servicios de la profesional (ver estrategia de
  monetización).
- **Cuentas/sincronización** solo si el producto lo requiere más adelante (implicaría backend).

---

## 14. Glosario

- **PWA:** web app instalable que funciona como una app nativa.
- **Atmósfera:** tema visual (amanecer/día/atardecer/noche/nebulosa).
- **Service worker:** proceso que da soporte offline y gestiona el caché.
- **TWA:** técnica para publicar una PWA en Google Play.
- **ASO:** optimización para posicionar la app en la tienda.
- **localStorage:** almacenamiento en el propio dispositivo del usuario.

---

## Créditos

**Autoría, concepción y contenido de PNL:** Jhon Fredy Primiciero Malaver —
Programador Neurolingüístico, experto en todo lo aplicado en la app (ejercicios,
técnicas, diccionario bio‑emocional, enfoque y experiencia).

Raíces es una obra original de su autor. © 2026 Jhon Fredy Primiciero Malaver.
Todos los derechos reservados.

---

*Documento vivo: actualizar al cambiar el stack, el proceso o el alcance.*
