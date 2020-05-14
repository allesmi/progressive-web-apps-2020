const SW_VERSION = 'v5';
const CACHE_NAME = `service-worker2-${SW_VERSION}`;
const FILES_TO_CACHE = [
  './',
  './index.html',
  './js/script.js',
  './style.css'
];
const DATA_CACHE_NAME = 'data-cache-v1';

self.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(caches.open(CACHE_NAME).then(cache => {
    console.log('Offline Daten im Cache speichern');
    return cache.addAll(FILES_TO_CACHE);
  }));
  self.skipWaiting();
  console.log(`SW${SW_VERSION}: installiert`);
});

self.addEventListener('activate', (event) => {
  console.log(`SW${SW_VERSION}: aktiviert`);

  event.waitUntil(
    caches.keys().then(cacheNames => {
      for (let i = 0; i < cacheNames.length; i++) {
        let cacheName = cacheNames[i];

        if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
          caches.delete(cacheName);
        }
      }
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  console.log(`SW${SW_VERSION}: fetch`, event);

  if (event.request.url.includes('data.json')) {
    console.log('API Call: Network first');

    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(event.request)
          .then(response => {
            if (response.ok) {
              cache.put(event.request.url, response.clone());
            }
            return response;
          })
          .catch((error) => {
            return cache.match(event.request);
          });
      })
    );
    return;
  }

  // Cache first
  event.respondWith(
    caches.open(CACHE_NAME)
    .then(cache => {
      return cache.match(event.request)
        .then(response => {
          if (response !== undefined) {
            return response;
          } else {
            return fetch(event.request);
          }
        });
    })
  );
  // if (event.request.mode === 'navigate') {
  //   event.respondWith(
  //     fetch(event.request)
  //     .catch(() => {
  //       return caches.open(CACHE_NAME).then(cache => {
  //         return cache.match('offline.html');
  //       })
  //     })
  //   );
  // }
});