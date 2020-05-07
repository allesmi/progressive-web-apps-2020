if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js', {
        scope: './'
    })
        .then(event => {
            console.log('Main: Der ServiceWorker wurde registriert.')
        });
}

function makeFetch() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => console.log(data));
}

setTimeout(makeFetch, 2000);
