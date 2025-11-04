// --- Utilidades para coordenadas y cálculo --- //
function toRad(x) { return x * Math.PI / 180; }

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// --- Leer KML y extraer coordenadas --- //
async function loadKML(url) {
  const text = await fetch(url).then(r => r.text());
  const coords = [...text.matchAll(/<coordinates>([\s\S]*?)<\/coordinates>/g)]
    .flatMap(m => m[1].trim().split(/\s+/).map(c => c.split(',').slice(0,2).map(Number)));
  return coords.map(([lon, lat]) => ({lat, lon}));
}

// --- Calcular distancia acumulada --- //
function acumulada(coords) {
  let dist = [0];
  for (let i=1; i<coords.length; i++) {
    dist[i] = dist[i-1] + haversine(coords[i-1].lat, coords[i-1].lon, coords[i].lat, coords[i].lon);
  }
  return dist;
}

function puntoMasCercano(coords, lat, lon) {
  let minDist = Infinity, idx = 0;
  for (let i=0; i<coords.length; i++) {
    const d = haversine(lat, lon, coords[i].lat, coords[i].lon);
    if (d < minDist) { minDist = d; idx = i; }
  }
  return idx;
}

// --- Principal --- //
document.getElementById("getLocationBtn").addEventListener("click", async () => {
  const status = document.getElementById("status");
  const distance = document.getElementById("distance");
  status.textContent = "Cargando KML...";

  const coords = await loadKML("ruta_densa_10m_4505.kml");
  const distAcum = acumulada(coords);

  status.textContent = "Obteniendo ubicación GPS...";

  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const idx = puntoMasCercano(coords, lat, lon);
    const dist = distAcum[idx];
    status.textContent = "Ubicación obtenida ✅";
    distance.textContent = `Distancia desde inicio del tramo: ${dist.toFixed(1)} m`;
  }, err => {
    status.textContent = "Error obteniendo ubicación: " + err.message;
  });
});

// --- Mostrar foto --- //
document.getElementById("photoInput").addEventListener("change", evt => {
  const file = evt.target.files[0];
  if (!file) return;
  const img = document.getElementById("preview");
  img.src = URL.createObjectURL(file);
});
