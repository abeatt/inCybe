const CACHE_NAME = 'incybe-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/vite.svg'
];

// Install: Cache basic assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch: Stale-while-revalidate strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});