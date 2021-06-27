const STATIC_CACHE = 'static-cache-v1';
const RUNTIME_CACHE = 'runtime-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/css/styles.css',
  '/assets/js/indexeddb.js',

  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js@2.8.0',

  // cache webpack generated manifest, js bundles, and assets
  '/dist/manifest.json',

  // '/dist/assets/js/indexeddb.bundle.js',
  '/dist/assets/js/index.bundle.js',
  '/dist/assets/js/loadSW.bundle.js',

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
      .then(self.skipWaiting())
      .catch((error) => console.log(error))
  );
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
      .then(self.clients.claim())
  );
});

// Fetch
self.addEventListener('fetch', (event) => {
  // non GET requests or requests to other origins are not cached
  if (
    event.request.method !== 'GET' ||
    !event.request.url.startsWith(self.location.origin)
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Submit api requests to server, fallback to cache if unavailable
  if (/\/api\//.test(event.request.url)) {
    event.respondWith(
      caches
        .open(RUNTIME_CACHE)
        .then((cache) => {
          return fetch(event.request)
            .then((response) => {
              if (response.status === 200) {
                cache.put(event.request, response.clone());
              }
              return response;
            })
            .catch((error) => cache.match(event.request));
        })
        .catch((error) => console.log(error))
    );
    return;
  }

  // Submit non-api requests to the cache: Cache falling back to network approach
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
