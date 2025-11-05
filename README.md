# Registro PR Live + Distancia desde origen (PWA)

Esta versión agrega **carga de KML** y el cálculo en el navegador de:
- Distancia desde el **inicio de la ruta** (m)
- Distancia mínima del GPS a la ruta (m)
- Punto más cercano (lat, lon) y segmento
- Conversión a PR `NNN+MMM` (PR 0 en el inicio del KML, o con offset manual)

**Cómo usar**

1) Abra `index.html` en HTTPS (GitHub Pages).
2) Cargue su archivo KML densificado (ej. cada 10 m). El lector soporta `<LineString><coordinates>` y `gx:Track/gx:coord`.
3) Active el GPS y/o introduzca coordenadas manuales para calcular.
4) Opcional: establezca un **offset PR (m)** si el PR 0 no coincide con el inicio del KML.
5) Puede capturar foto con overlay y **Compartir** o **Descargar**.

**Notas técnicas**

- Para proyectar a coordenadas planas se usa una proyección local equirectangular alrededor del primer vértice
  (x = R * (lon - lon0) * cos(lat0), y = R * (lat - lat0)). Esto evita dependencias.
- La distancia geodésica vértice-a-vértice y hacia el pie proyectado se calcula con **haversine**. Con una ruta densificada
  a 10 m, el error es despreciable para uso vial.
- La búsqueda del vértice más cercano es lineal O(N). Con ~12k puntos funciona fluido en móviles modernos.
  Si su ruta tiene cientos de miles de puntos, me avisa y migramos a un KD-tree.

