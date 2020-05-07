let infoDiv = document.querySelector('.info');

let worker = new Worker('worker.js');

worker.onerror = (errorEvent) => {
    console.log('Fehler im Worker', errorEvent);
};

let person = { name: 'Anton', age: 42 };

function changeAge(person) {
    person.age = 80;
}

// Das Alter lokal ändern:
infoDiv.innerText += `Age vorher: ${person.age}`;
changeAge(person);
infoDiv.innerText += `Age nacher: ${person.age}`;

worker.onmessage = (event) => {

    let message = event.data;

    infoDiv.innerText += message;

    infoDiv.innerText += `Age: ${person.age}`;
};

// Eine Kopie von person an den Worker schicken
worker.postMessage(person);
