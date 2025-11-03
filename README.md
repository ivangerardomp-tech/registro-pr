# Registro PR PWA

Esta es una PWA (Progressive Web App) pensada para campo:
- Tomar foto con la cámara del celular (cámara trasera).
- Leer GPS (lat / lon).
- Generar un nombre tipo PR_123+456.jpg.
- Descargar la foto con ese nombre directamente al celular.
- Funcionar offline (después de la primera carga con internet).

## Estructura de archivos
- `index.html`           : Interfaz principal + lógica JS.
- `manifest.json`        : Manifiesto PWA (nombre, iconos, etc.).
- `service-worker.js`    : Cache offline.
- `icon-192.png`, `icon-512.png` : Íconos de la app cuando se instala.

## Cómo publicarlo gratis en GitHub Pages

1. Crea un repo público nuevo en tu cuenta de GitHub, ejemplo: `registro-pr`.

2. Sube todos estos archivos al repo (usa "Add file" -> "Upload files" si quieres hacerlo rápido en la web).

3. Ve a:
   - Settings -> Pages
   - En "Build and deployment":
     - Source: "Deploy from a branch"
     - Branch: `main`
     - Folder: `/ (root)`
   - Guarda.

4. GitHub te va a dar una URL del estilo:
   https://TU_USUARIO.github.io/registro-pr

5. Abre esa URL desde el celular:
   - En Android (Chrome) -> "Agregar a pantalla principal".
   - En iPhone (Safari) -> icono de compartir -> "Agregar a pantalla de inicio".

6. A partir de ahí, se comporta como app instalada:
   - Pantalla completa (sin barra del navegador)
   - Ícono propio
   - Funciona offline (gracias al service worker)

## ¿Dónde se guardan las fotos?
Cuando presionas "Guardar en el teléfono":
- Se descarga la imagen con el nombre PR que tengas en el campo.
- En Android: normalmente va a "Descargas".
- En iPhone: te puede preguntar dónde guardar o la verás en "Archivos".
No tenemos control directo sobre la carpeta (limitación de PWA/iOS).

## Lógica de PR
Ahora mismo el PR es simulado con un número aleatorio.
Tienes que reemplazar esa parte en `index.html` dentro de la sección GPS:
```js
const prEstimado = "PR_" +
  Math.floor(Math.random()*200) + "+" +
  String(Math.floor(Math.random()*1000)).padStart(3,"0");
```
por tu cálculo real usando lat/lon vs. tu eje vial.

## Offline en campo
- La primera vez necesitas internet para que el navegador descargue y cachee los archivos.
- Luego, aunque no haya señal, la app abre porque viene del caché.
- GPS suele seguir funcionando sin datos (usa el chip GPS del teléfono).
- Las capturas que hagas se quedan en el teléfono.

## Próximo paso (pendiente futuro)
- Guardar cada captura (PR + foto + coords + timestamp) en IndexedDB local.
- Agregar botón "Sincronizar al servidor" que haga POST a tu FastAPI cuando vuelva la señal.

