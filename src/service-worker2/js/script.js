if (navigator.serviceWorker) {
  navigator.serviceWorker.register('sw.js', {
    scope: './'
  }).then(() => console.log('Service Worker registriert.'));
}

function getData() {
  fetch('data.json')
    .then(response => response.json())
    .then(people => {
      let peopleList = document.querySelector('#info');
      peopleList.innerHTML = '';

      for (let i = 0; i < people.length; i++) {
        let person = people[i];

        let li = document.createElement('li');
        li.innerText = `Name: ${person.name} (${person.age})`;

        peopleList.appendChild(li);
      }
    });
}

document.querySelector('button').addEventListener('click', getData);