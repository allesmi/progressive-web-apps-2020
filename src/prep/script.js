//////////////////////////////////////
// JavaScript Allgemein
//////////////////////////////////////

var i = 1;
let j = 2;
const k = 3;

// Typsicherheit von == und ===
let isEqualTypeUnsafe = ('1' == 1);
let isEqual = (1 === 1);

// string -> int
parseInt('1');

// string -> float
parseFloat('1.10');

// float -> string mit 2 Nachkommastellen
let cost = 1.2;
cost.toFixed(2); // 1.10 = 1.1

if (true) {

}

for (let item in collection) {

}

for (let i = 0; i < collection.length; i++) {

}

//////////////////////////////////////
// DOM-Tree
//////////////////////////////////////

// Zugriff auf Elemente im DOM
document.querySelector('#id');
document.querySelectorAll('a');
document.getElementById('id');

// Selektoren wie in CSS:
// .day
// button.btn
let ul = document.querySelector('ul');
ul.querySelector('li.active');

// Eingegebener Wert bei input-Elementen:
document.querySelector('input').value;

// Ein neues DOM-Element erzeugen:
let li = document.createElement('li');
// innerText sorgt automatisch für HTML Escaping
li.innerText = 'Option A <strong>Gut</strong>';
// innerHTML kann auch neue HTML-Elemente erzeugen
li.innerHTML = 'Option B <strong>Schlecht</strong>';
// Attribute setzen:
li.id = 'li-id';
li.classList.add('active');

// Hinzufuegen an ein bestehendes Element im DOM-Tree
ul.appendChild(li);

//////////////////////////////////////
// Events
//////////////////////////////////////

const button = document.querySelector('button');

// Einen Event Handler hinzufuegen:
button.addEventListener('click', function (event) {});

// Genau einen Event Handler setzen:
button.onclick = function (event) {};

//////////////////////////////////////
// AJAX
//////////////////////////////////////

// JavaScript Objekt -> JSON String
JSON.stringify({
  user: 'Anton',
  age: 12
}); // -> { "user": "Anton", "age": 12}

// JSON String -> JavaScript
let o = JSON.parse('{ "user": "Anton", "age": 12}');
o.user;
o.age;

// Variante 1: XMLHttpRequest
// https://developer.mozilla.org/de/docs/Web/API/XMLHttpRequest
let xhr = new XMLHttpRequest();

xhr.setRequestHeader('Content-Type', 'application/json');

xhr.onreadystatechange = function (event) {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    // ...
  }
};

// Fehlerfall:
xhr.timeout = 30000;
xhr.onerror = function (event) {
  // Netzwerk-Fehlerfall
};

xhr.open('POST', url);
xhr.send(JSON.stringify(o));

// Variante 2: fetch
// https://developer.mozilla.org/de/docs/Web/API/Fetch_API
let options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(o),
  time
};

fetch(url, options)
  .then(response => {
    // Entspricht XMLHttpRequest.HEADERS_RECEIVED
    if (response.ok) {
      return response.json();
    }
  })
  .then(parsedData => {
    // Entspricht XMLHttpRequest.DONE

    // Einen weiteren Request abschicken
    return fetch('api/person/' + parsedData.id);
  })
  .then(response2 => {
    if (response2.ok) {
      return response2.json();
    }
  });

//////////////////////////////////////
// Geolocation API
//////////////////////////////////////

// Geolocation API
// - HTTPS oder localhost

// 1. Unterstuetzt der Browser die Geolocation API?
if (navigator.geolocation) {}
if ('geolocation' in navigator) {}

// 2. Berechtigung durch den User
navigator.permissions.query({
    name: 'geolocation'
  })
  .then(result => {
    result.state; // 'granted', 'prompt', 'denied'


  });

// 3. Verwendung
navigator.geolocation.getCurrentPosition(onSuccess, onError);

//////////////////////////////////////
// Manifest
//////////////////////////////////////

// in HTML:
// <link rel="manifest" href="manifest.json">

// Installierbarkeit
// 1. name, short_name, ...
// 2. icons
// 3. Service Worker in JavaScript

//////////////////////////////////////
// ServiceWorker
//////////////////////////////////////

// Lifecycle
// - 1. Aufruff
// - Update

// Network First, Cache First

// siehe PDF