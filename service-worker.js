const CACHE_NAME = "lexouvriere-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/app.html",
  "/style.css",
  "/inscription.js",
  "/images/logo-cuivre.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE)));
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

