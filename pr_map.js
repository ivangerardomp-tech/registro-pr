// pr_map.js – Utilidad para mapear distancia → PR usando PRs.csv
(function(){
  const cache = { byTramo: null, rows: null };

  async function loadPRs(){
    if (cache.rows) return cache.rows;
    const resp = await fetch('PRs.csv', { cache: 'no-store' });
    if (!resp.ok) throw new Error('No se pudo cargar PRs.csv');
    const text = await resp.text();
    const lines = text.trim().split(/\r?\n/);
    const header = lines.shift().split(',');
    const idx = {};
    header.forEach((h,i)=> idx[h.trim().toUpperCase()] = i);
    function get(row, key){ return row[idx[key]]; }

    const rows = lines.map(l => l.split(',')).map(cols => ({
      TRAMO: (get(cols,'TRAMO')||'').trim(),
      PR: (get(cols,'PR')||'').trim(),
      LATITUD: parseFloat(get(cols,'LATITUD')),
      LONGITUD: parseFloat(get(cols,'LONGITUD')),
      DISTANCIA: parseFloat(get(cols,'DISTANCIA'))
    })).filter(r => r.TRAMO && !Number.isNaN(r.DISTANCIA));

    const byTramo = new Map();
    for (const r of rows){
      if (!byTramo.has(r.TRAMO)) byTramo.set(r.TRAMO, []);
      byTramo.get(r.TRAMO).push(r);
    }
    for (const [t, arr] of byTramo){
      arr.sort((a,b)=> a.DISTANCIA - b.DISTANCIA);
    }

    cache.rows = rows;
    cache.byTramo = byTramo;
    return rows;
  }

  function prFromDistance(tramo, d){
    if (!cache.byTramo) throw new Error('PRs.csv aún no cargado. Llama a loadPRs() primero.');
    tramo = String(tramo||'').trim();
    const arr = cache.byTramo.get(tramo);
    if (!arr || !arr.length) return null;

    let lo = null, hi = null;
    for (let i=0;i<arr.length;i++){
      const r = arr[i];
      if (r.DISTANCIA <= d) lo = r;
      if (r.DISTANCIA >  d){ hi = r; break; }
    }

    if (!lo){
      const offset = Math.round(d - arr[0].DISTANCIA);
      const txt = `PR ${arr[0].PR}+${String(Math.max(offset,0)).padStart(3,'0')}`;
      return { prIni: null, prFin: arr[0].PR, dIni: null, dFin: arr[0].DISTANCIA, offset, texto: txt, entre: 'Antes del primer PR' };
    }
    if (!hi){
      const offset = Math.round(d - lo.DISTANCIA);
      const txt = `PR ${lo.PR}+${String(Math.max(offset,0)).padStart(3,'0')}`;
      return { prIni: lo.PR, prFin: null, dIni: lo.DISTANCIA, dFin: null, offset, texto: txt, entre: 'Después del último PR' };
    }

    const offset = Math.round(d - lo.DISTANCIA);
    const txt = `PR ${lo.PR}+${String(Math.max(offset,0)).padStart(3,'0')}`;
    return { prIni: lo.PR, prFin: hi.PR, dIni: lo.DISTANCIA, dFin: hi.DISTANCIA, offset, texto: txt, entre: `Entre PR ${lo.PR} y PR ${hi.PR}` };
  }

  window.PRHelper = { loadPRs, prFromDistance };
})();
