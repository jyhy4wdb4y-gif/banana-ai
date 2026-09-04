const CACHE='bahasa-ai-ultimate-v250';
const ASSETS=['./','./index.html','./style.css','./curriculum.js','./content-packs.js','./content-quality-v70.js','./app.js','./content-depth-v120.js','./runtime-core-v250.js','./manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
