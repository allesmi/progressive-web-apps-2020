function savePerson() {
  let name = document.querySelector('#name').value;
  let age = document.querySelector('#age').value;

  console.log(age, name);
}

// https://dexie.org/docs/Tutorial/Getting-started
let db = new Dexie('person-db');
db.version(1).stores({
  people: 'name,age'
});

db.people.put({
    name: 'Anton',
    age: 12
  })
  .then(() => {
    console.log('Saved.')
  });

document.querySelector('#save-button').addEventListener('click', savePerson);

o = {
  user: 'asdf',
  password: 'asdfsdf'
};

// fetch POST
fetch('/login', {
  method: 'POST',
  body: JSON.stringify(o),
  headers: {
    'Content-Type': 'application/json'
  }
});

// XHR POST
let httpRequest = new XMLHttpRequest();

httpRequest.setRequestHeader('Content-Type', 'application/json');
httpRequest.open('POST', '/login');
httpRequest.send(JSON.stringify(o));

for (let i = 0; i < 10000; i++) {
  fetch('/user', {
      method: 'POST',
      body: JSON.stringify({name: 'Viagra Werbung', age: 12})
    )
  }