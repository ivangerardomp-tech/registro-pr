# Registro PR PWA (iOS-friendly)

Ajustes clave para iPhone/iOS:
- No usamos `input[type=file]` con `display:none` + `click()` programático (iOS lo bloquea a veces).
- En su lugar, usamos `<label for="inputCam">` que dispara el input de forma nativa.
- Metas PWA para iOS: `apple-mobile-web-app-capable`, `apple-touch-icon`.
- Botón "Obtener GPS" que dispara el permiso con un gesto del usuario.
- Revisa permisos: Ajustes → Safari → Cámara/Localización → Permitir.

## Publicación en GitHub Pages
Mismo procedimiento que la versión anterior (Settings → Pages → Deploy from a branch → main → /(root)).
