// SW v13
const CACHE="pr-live-cache-v13";
const ASSETS=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","./PRs.csv"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(u.pathname.endsWith("/PRs.csv")||u.pathname.endsWith("PRs.csv")||u.pathname.toLowerCase().endsWith(".kml")){e.respondWith(fetch(e.request).then(r=>{caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>caches.match(e.request)))}else{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))}});
