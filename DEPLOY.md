# 🚀 Cómo publicar la app (para que se pruebe en el celular)

La app es **Next.js**, así que la forma más sencilla y gratuita de publicarla es
**Vercel** (los creadores de Next.js). Aquí tienes dos caminos.

El proyecto ya está listo: build verificado, `.gitignore` configurado y un
primer commit de Git hecho.

---

## ✅ Opción B — GitHub + Vercel (recomendada)

Cada vez que hagas un cambio y lo subas, la web se actualiza sola.

### 1. Sube el proyecto a GitHub
1. Entra en <https://github.com> e inicia sesión (o crea tu cuenta).
2. Crea un repositorio nuevo (botón **New**). Ponle un nombre, por ejemplo
   `raices-pnl`. **No** marques "Add a README" (ya tenemos uno).
3. GitHub te mostrará unos comandos. Aquí, en la carpeta del proyecto, ejecuta
   (reemplaza la URL por la de TU repositorio):

   ```bash
   git remote add origin https://github.com/TU-USUARIO/raices-pnl.git
   git branch -M main
   git push -u origin main
   ```

   > Al hacer `push`, Git te pedirá iniciar sesión en GitHub. Sigue las
   > instrucciones en pantalla (se abre el navegador para autorizar).

### 2. Conecta Vercel
1. Entra en <https://vercel.com> y pulsa **Sign up** → **Continue with GitHub**.
2. **Add New… → Project** e importa el repositorio `raices-pnl`.
3. Vercel detecta Next.js automáticamente. **No cambies nada**, pulsa **Deploy**.
4. En ~1 minuto tendrás una URL tipo `https://raices-pnl.vercel.app`.
   Ábrela en tu celular y compártela con tu clienta. 🎉

A partir de aquí, cada `git push` publica los cambios solos.

---

## ⚡ Opción A — Vercel CLI (sin GitHub, más rápido de una vez)

1. Instala la herramienta (una sola vez):

   ```bash
   npm install -g vercel
   ```

2. En la carpeta del proyecto, ejecuta y sigue las preguntas (Enter a casi todo):

   ```bash
   vercel
   ```

   La primera vez te pedirá iniciar sesión (se abre el navegador).

3. Para publicar la versión final de producción:

   ```bash
   vercel --prod
   ```

---

## 📝 Antes de compartirla con tu clienta

- Sube tus **audios reales** a `public/audios/` y actualiza las rutas en
  `data/playlist.js` y `data/meditations.js`.
- Sube tus **PDF reales** a `public/libros/` y actualiza `data/books.js`.
- Revisa y ajusta los textos en la carpeta `data/`.

(Todo esto está explicado en el `README.md`.)

---

## 🔒 Nota de seguridad

`npm audit` marca un aviso que cubre toda la línea de Next.js 14; su único
"arreglo" es saltar a Next 16 (un cambio mayor). En un despliegue **gestionado
por Vercel** la mayoría de esos avisos no aplican (afectan a configuraciones
self-hosted que esta app no usa). Publicar en Vercel es seguro. La migración a
Next 16, si algún día se desea, se planifica aparte.
