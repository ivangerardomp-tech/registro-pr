# Registro PR Live (PWA) — Lee PRs.csv del repositorio

- Coloca **PRs.csv** en la **misma carpeta** que `index.html` (raíz del repo de GitHub Pages).
- La app lo carga automáticamente desde `./PRs.csv` (sin subir archivos).
- El TRAMO se infiere del nombre del KML, p.ej. `ruta_densa_10m_4505.kml → TRAMO=4505`.
- Cálculo de PR: mayor `DISTANCIA` ≤ (distancia_origen + offset), `METROS = objetivo − DISTANCIA(PR)`, redondeado.

## Pasos
1) Sube estos archivos al repo (GitHub Pages). Asegúrate de incluir **PRs.csv**.
2) Abre la página en HTTPS.
3) Carga el **KML densificado**. La app intentará cargar **PRs.csv** automáticamente.
4) Activa GPS o ingresa lat/lon; verás `PR`, `dist_origen`, `dist_a_ruta`, etc.
