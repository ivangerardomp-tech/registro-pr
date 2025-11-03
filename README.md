# Registro PR Live (PWA) — iOS friendly
**Qué hace:**  
- GPS en vivo: intenta `watchPosition` al cargar. Si Safari requiere gesto, aparece **Activar GPS** (usa `getCurrentPosition` para mostrar el prompt) y luego engancha `watchPosition`.
- Cámara: intenta `getUserMedia` (video + overlay). Si estás en **iOS PWA (standalone)** o el navegador no lo permite, activa **fallback** con `<input type=file capture="environment">`.
- Descarga JPG con nombre PR.

**Por qué así:** iOS a veces bloquea `getUserMedia` dentro de PWA instaladas. Safari en pestaña normal suele permitirlo. Este build detecta iOS+standalone y fuerza el modo alterno.

**Publicar en GitHub Pages:**  
Settings → Pages → Deploy from a branch → main /(root).

**Importante:** Este build usa *cache v5* para que el navegador descargue archivos nuevos.
