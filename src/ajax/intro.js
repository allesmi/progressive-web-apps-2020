function showData(persons) {
    let main = document.querySelector('main');
    for (let i = 0; i < persons.length; i++) {
        let div = document.createElement('div');
        let span1 = document.createElement('span');
        let span2 = document.createElement('span');

        span1.innerText = 'Name: ' + persons[i].name;
        span2.innerText = 'Alter: ' + persons[i].age;

        div.append(span1, span2);

        main.appendChild(div);
    }
}

// Variante 1: XMLHttpRequest
let httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function (event) {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status >= 200 && httpRequest.status < 300) {
            let responseText = event.target.responseText;
            let persons = JSON.parse(responseText);

            showData(persons);
        }
        else {
            console.log('Fehler');
        }
    }
};

httpRequest.open('GET', 'data1.json');
httpRequest.send();

// Variante 2: fetch
fetch('data.json')
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            console.log('Fehler');
        }
    })
    .then(function (persons) {
        showData(persons);
    })
    .catch(function (error) {
        console.log('Fehler');
    });