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

    a.href = `../day/index.html?date=${year}-${month}-${day}`;
    a.innerText = day;

    div.appendChild(a);

    listElement.appendChild(div);
}