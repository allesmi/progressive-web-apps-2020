self.addEventListener('install', event => {
    console.log('SW: Der ServiceWorker wurde installiert');
});

self.addEventListener('activate', event => {
    console.log('SW: Ich bin jetzt aktiviert');
});

self.addEventListener('fetch', event => {
    let url = new URL(event.request.url);
    console.log('SW: Es passiert ein fetch');
    if (url.origin === location.origin && url.pathname.endsWith('/data.json')) {
        console.log('SW: Zugriff auf data.json');

        let response = new Response('[100, 200, 300]', {
            header: {
                'Content-Type': 'application/json'
            }
        });
        event.respondWith(response);
    }
});