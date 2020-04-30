let parameters = new URLSearchParams(window.location.search);
let date = parameters.get('date');

document.querySelector('main').innerText = date;