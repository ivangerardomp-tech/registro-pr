// SW cache v14 (network-first for PRs.csv and *.kml)
const CACHE_NAME = "pr-live-cache-v14";
const ASSETS = ["./", "./index.html", "./manifest.json", "./PRs.csv"];

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
        const clonedResponse = r.clone(); // Clone only for caching
        caches.open(CACHE_NAME).then(c => c.put(e.request, clonedResponse));
        return r; // Return the original response
      }).catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});
