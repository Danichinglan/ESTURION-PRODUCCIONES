// ESTURIÓN: cache only static application assets; never cache Supabase data or authenticated responses.
const CACHE='esturion-shell-v1';
const ASSETS=['/','/index.html','/manifest.webmanifest','/icons/icon-192.png','/icons/icon-512.png','/icons/icon-180.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;const url=new URL(req.url);if(url.pathname==='/'||url.pathname==='/index.html'){event.respondWith(fetch(req).catch(()=>caches.match('/index.html')));return;}if(ASSETS.includes(url.pathname)){event.respondWith(caches.match(req).then(hit=>hit||fetch(req)));}});
