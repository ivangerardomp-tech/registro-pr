# Registro PR v16 (fusionado)
- Selección de TRAMO desde PRs.csv (repo) y carga del `TRAMO.kml` desde el mismo repo.
- Mantiene cámara, GPS, overlay, captura con barra y texto, compartir/descargar.
- Parser CSV robusto (TAB/;/,) y encabezados insensibles a mayúsculas/espacios.
- Cambia `KML_BASE` a `./kml/` si los KML están en subcarpeta.
- Service Worker con caché `registro-pr-cache-v16`.
