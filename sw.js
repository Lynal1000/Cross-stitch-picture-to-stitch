// Minimal offline cache for Cross Stitch My Picture.
// Caches the app shell on install so it opens even with no signal —
// useful since this is a single-page tool with no server dependency.
const CACHE_NAME = 'crossstitchmypicture-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './dmc_colors.js',
  './anchor_codes.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
