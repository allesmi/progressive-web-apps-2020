document.querySelector('#print-button').addEventListener('click', () => {
  window.print();
});

setInterval(() => {
  document.querySelector('h1').classList.toggle('bunt');
}, 1000);