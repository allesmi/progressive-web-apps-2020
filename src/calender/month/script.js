function getLastDayOfCurrentMonth() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    return (new Date(year, month + 1, 0)).getDate();
}

let lastDay = getLastDayOfCurrentMonth();

let listElement = document.querySelector('#day-list');

for (let day = 1; day <= lastDay; day++) {
    let div = document.createElement('div');

    let a = document.createElement('a');

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    // Herausfinden, welcher Wochentag der 1. ist
    // die entsprechende CSS Klasse setzen

    // a.classList.add('klasse');
    // Variante 1: switch
    // Variante 2: Objekt
    let weekday = {
        0: 'sunday',
        1: 'monday',
        // ...
    };
    // Variante 3: Array
    weekday = ['sunday', 'monday', /* ... */];
    let cssClass = weekday[day];

    a.href = `../day/index.html?date=${year}-${month}-${day}`;
    a.innerText = day;

    div.appendChild(a);

    listElement.appendChild(div);
}