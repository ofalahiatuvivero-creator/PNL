# 🌿 Raíces · App de PNL y Sanación Emocional

Aplicación web **mobile-first** de Programación Neurolingüística (PNL) y bienestar
emocional. Diseñada para transmitir calidez, empatía y calma, evitando la
estética fría de las herramientas tecnológicas.

Construida con **Next.js 14 (App Router)**, **Tailwind CSS** y **lucide-react**.

---

## 🚀 Puesta en marcha

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run dev
```

Abre <http://localhost:3000> en tu navegador (o en tu móvil).

Para producción:

```bash
npm run build
npm start
```

---

## 🎨 Identidad visual

- **Paleta orgánica**: verde salvia (calma), arena/beige (seguridad) y
  terracota/melocotón (calidez humana). Se define en `tailwind.config.js` →
  puedes cambiar toda la identidad desde ese único archivo.
- **Tipografías**: Nunito (cuerpo), Poppins (interfaz) y Lora (títulos),
  cargadas con `next/font`.
- **Micro-copy** empático y en primera persona del plural.

---

## 🧩 Estructura del proyecto

```
app/                         Rutas (App Router de Next.js)
├── page.jsx                 Dashboard / Inicio
├── ejercicios/              Módulo 2 · Ejercicios PNL
│   ├── page.jsx             Listado con filtros por necesidad
│   └── [id]/page.jsx        Ejercicio paso a paso
├── zen/page.jsx             Módulo 3 · Zona Zen (respiración + música)
├── meditaciones/            Módulo 4 · Meditaciones guiadas
│   ├── page.jsx             Listado
│   ├── [id]/page.jsx        Reproductor genérico (sin preparación)
│   └── corazones-gemelos/
│       ├── page.jsx         Preparación OBLIGATORIA (aviso + checklist)
│       └── reproducir/      Reproductor (protegido por la preparación)
├── diccionario/page.jsx     Módulo 5 · Diccionario Bio-Emocional (A-Z)
├── biblioteca/page.jsx      Módulo 6 · Biblioteca (visor de PDF + subida)
├── diario/page.jsx          Mi Espacio · Diario emocional + check-in de ánimo
└── icon.svg                 Ícono de la app (favicon)

components/                  Componentes reutilizables y documentados
data/                        CONTENIDO EDITABLE (ver más abajo)
lib/                         Utilidades (almacenamiento local seguro)
public/                      Audios (mp3) y libros (pdf)
```

---

## ✍️ Guía para el administrador (psicólogo/coach)

Todo el contenido de relleno vive en la carpeta **`/data`** y está pensado para
editarse sin tocar el diseño:

| Archivo | Qué controla |
|---|---|
| `data/affirmations.js` | Frases de la "Afirmación del día". |
| `data/exercises.js` | Ejercicios de PNL, categorías y sus pasos. |
| `data/playlist.js` | Pistas de la Zona Zen (música, frecuencias, afirmaciones). |
| `data/meditations.js` | Meditaciones guiadas (incluida Corazones Gemelos). |
| `data/preparation.js` | Aviso médico y checklist de ejercicios previos. |
| `data/dictionary.json` | Entradas del diccionario bio-emocional (A-Z). |
| `data/books.js` | Libros de la biblioteca. |
| `data/moods.js` | Estados de ánimo del check-in del diario. |

### Mi Espacio (Diario emocional)
Un rincón privado con check-in de ánimo diario, notas de gratitud, racha de
días y historial. **Los datos se guardan solo en el dispositivo de la persona
(localStorage)**; no se envían a ningún servidor. Para sincronizar entre
dispositivos haría falta conectar un backend. Es accesible desde el check-in
del Dashboard ("Mi diario").

### Subir tus audios (MP3)
1. Copia los `.mp3` a `public/audios/`.
2. Cambia el campo `src` en `data/playlist.js` y/o `data/meditations.js`,
   por ejemplo: `src: '/audios/respiracion.mp3'`.

### Subir tus libros (PDF)
1. Copia los `.pdf` a `public/libros/`.
2. Cambia el campo `pdf` en `data/books.js`, por ejemplo:
   `pdf: '/libros/mi-libro.pdf'`.
3. (Opcional) Portada real: sube una imagen a `public/portadas/` y añade
   `portada: '/portadas/mi-portada.jpg'` al libro.

### Iconos
Se usa [lucide-react](https://lucide.dev/icons). En los datos, los iconos se
indican por su nombre en texto (p. ej. `icon: 'Heart'`).

---

## 💛 Módulo especial: Corazones Gemelos

La meditación de **Corazones Gemelos (Master Choa Kok Sui)** incluye, por
seguridad, una **pantalla de preparación obligatoria** antes de poder
reproducir el audio:

1. **Aviso de contraindicaciones** (banner cálido).
2. **Checklist de ejercicios físicos previos**: el botón de continuar solo se
   habilita cuando la persona marca todos los pasos.

El acceso directo al reproductor por URL redirige de nuevo a la preparación.

> El texto del aviso y los ejercicios se editan en `data/preparation.js`.
> Se recomienda **no eliminar** la advertencia médica.

---

## 📝 Notas

- La subida de PDF desde la Biblioteca permite **visualizar** un documento al
  instante durante la sesión. Para guardarlos de forma permanente se necesita
  conectar un almacenamiento/servidor (backend).
- El diccionario bio-emocional es una guía de reflexión y **no sustituye** el
  diagnóstico ni el tratamiento médico profesional.
