const STATIC_CACHE = 'static-cache-v1';
const RUNTIME_CACHE = 'runtime-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/css/styles.css',

  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',

  // cache webpack generated manifest, js bundles, and assets
  '/dist/manifest.json',

  '/dist/assets/js/index.bundle.js',

  '/dist/assets/icons/icon_72x72.png',
  '/dist/assets/icons/icon_96x96.png',
  '/dist/assets/icons/icon_128x128.png',
  '/dist/assets/icons/icon_144x144.png',
  '/dist/assets/icons/icon_152x152.png',
  '/dist/assets/icons/icon_192x192.png',
  '/dist/assets/icons/icon_384x384.png',
  '/dist/assets/icons/icon_512x512.png',
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
      .catch((error) => console.log(error))
  );

  self.skipWaiting();
});

// Activate
self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE, RUNTIME_CACHE];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter(
          (cacheName) => !currentCaches.includes(cacheName)
        );
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete);
          })
        );
      })
  );

  self.clients.claim();
});

// Fetch
