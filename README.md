# Registro PR Live (PWA)
- GPS en vivo automático con `watchPosition` al cargar.
- Botón "Abrir cámara" usa `getUserMedia` (video en vivo) y superpone coordenadas en la vista y en la captura.
- Fallback iOS: si la cámara en vivo está bloqueada en PWA, aparece un `<input type="file" capture="environment">`.
- Descarga el JPG con el nombre del PR.

## GitHub Pages
Settings → Pages → Deploy from a branch → main /(root). HTTPS automático.

## Notas iOS
Algunas versiones de iOS limitan `getUserMedia` en PWA. En ese caso:
- Usa Safari normal para tener cámara en vivo con overlay, o
- Usa el fallback de input para tomar fotos (sin overlay en la UI nativa).
