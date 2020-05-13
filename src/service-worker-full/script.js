function getData() {
    let peopleList = document.querySelector('#ajax');

    fetch('data.json')
        .then(res => res.json())
        .then(people => {

            peopleList.innerHTML = '';

            for (let person of people) {
                let li = document.createElement('li');
                li.classList.add('person')

                li.innerText = `Name: ${person.name} (${person.age})`;

                peopleList.appendChild(li);
            }
        })
        .catch(() => {
            peopleList.innerHTML = '<li>Network error</li>';
        });
}

document.querySelector('#ajax-button').addEventListener('click', getData);

window.addEventListener('online', () => {
    let o = document.querySelector('#info');
    o.classList.remove('offline');
    o.innerText = 'Browser is online';
});

window.addEventListener('offline', () => {
    let o = document.querySelector('#info');
    o.classList.add('offline');
    o.innerText = 'Browser is offline';
});

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js', {
        scope: './'
    })
        .then(() => {
            console.log('Service Worker registered');
        });
}