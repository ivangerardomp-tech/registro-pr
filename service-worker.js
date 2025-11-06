// SW cache v17 (network-first para PRs.csv y *.kml)
const CACHE_NAME = "registro-pr-cache-v17";
const ASSETS = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./PRs.csv"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k); }));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (url.pathname.endsWith("/PRs.csv") || url.pathname.endsWith("PRs.csv") || url.pathname.toLowerCase().endsWith(".kml")) {
    e.respondWith(
      fetch(e.request).then(r => {
        // Clone response before caching it
        const clonedResponse = r.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clonedResponse));
        return r;
      }).catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});
