# Registro PR Live (PWA) — overlay también en fallback + botón Compartir

**Incluye:**
- GPS en vivo (`watchPosition`) al cargar, y botón “Activar GPS” si Safari necesita gesto.
- Cámara en vivo + overlay cuando `getUserMedia` está disponible (Safari).
- **Fallback iOS/PWA**: `<input type=file capture="environment">` + canvas para **imprimir overlay** en el JPG final.
- Botón **Compartir** (Web Share API con archivos): en iOS permite **Guardar imagen** al Álbum de Fotos.
- Service Worker cache **v6** para que el dispositivo tome el build nuevo.

**Publicación:** GitHub Pages → Settings → Pages → Deploy from a branch → main /(root). Abre con `?v=6` para forzar update.
