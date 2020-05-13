const SW_NAME = 'service-worker-full';

const CACHE_NAME = `${SW_NAME}-v2`;
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/script.js',
    '/style.css'
];
const DATA_CACHE_NAME = 'data-cache-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('SW: Pre-caching offline files');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
    console.log(`SW '${SW_NAME}' installed`);
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                    console.log('Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
    console.log(`SW '${SW_NAME}' activated`);
});

self.addEventListener('fetch', evt => {
    if (evt.request.url.includes('data.json')) {
        console.log('SW: Fetch (data)', evt.request.url);
        evt.respondWith(
            caches.open(DATA_CACHE_NAME).then((cache) => {
                return fetch(evt.request)
                    .then((response) => {
                        // If the response was good, clone it and store it in the cache.
                        if (response.ok) {
                            cache.put(evt.request.url, response.clone());
                        }
                        return response;
                    }).catch((err) => {
                        // Network request failed, try to get it from the cache.
                        return cache.match(evt.request);
                    });
            }));
        return;
    }
    evt.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(evt.request)
                .then((response) => {
                    return response || fetch(evt.request);
                });
        })
    );
});