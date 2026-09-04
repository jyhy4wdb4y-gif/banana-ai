const CACHE='bahasa-ai-release-v14';
const ASSETS=['./','./index.html','./style.css','./textbook-source-registry.js','./textbook-map-sjk.js','./curriculum.js','./content-packs.js','./content-quality-v70.js','./full-content-matrix.js','./textbook-content-y1-v3.js','./textbook-content-y6-v6.js','./textbook-content-y2-y5-v7.js','./content-consolidation-v8.js','./content-quality-v9.js','./content-quality-v10.js','./content-quality-v11.js','./content-finalization-v12.js','./content-polish-v13.js','./content-release-v14.js','./app.js','./content-depth-v120.js','./runtime-core-v250.js','./complete-rc1.js','./stable-v1.js','./manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
