function parse(valueText) {
    if (valueText.toLowerCase() === 'pi') {
        return Math.PI;
    }

    return parseFloat(valueText);
}

function calculateV1() {
    const value1 = document.querySelector('#value1').value;
    const value2 = document.querySelector('#value2').value;

    const operatorElement = document.querySelector('#operator');
    const selectedIndex = operatorElement.selectedIndex;
    const operator = operatorElement.options[selectedIndex].value;

    // Variante if ... else
    if (operator === '+') {
        result = value1 + value2;
    }
    else if (operator === '-') {
        result = value1 - value2;
    }
    else if (operator === '*') {
        result = value1 * value2;
    }
    else if (operator === '/') {
        result = value1 / value2;
    }
    else {
        console.log('Unbekannter Operator');
    }

    // // Variante switch
    // switch (operator) {
    //     case '+':
    //         // ...
    //         break;
    //     default:
    //     // ...
    // }
}

function calculate() {
    const inputs = document.querySelectorAll('input.value');

    let values = [];
    for (let i = 0; i < inputs.length; i++) {
        values.push(parse(inputs[i].value));
    }

    const operatorElement = document.querySelector('#operator');
    const selectedIndex = operatorElement.selectedIndex;
    const operator = operatorElement.options[selectedIndex].value;

    let result = values[0];

    for (let i = 1; i < values.length; i++) {
        if (operator === '+') {
            result += values[i];
        }
        else if (operator === '-') {
            result -= values[i];
        }
        else if (operator === '*') {
            result *= values[i];
        }
        else if (operator === '/') {
            result /= values[i];
        }
        else {
            console.log('Unbekannter Operator');
        }
    }

    const output = document.querySelector('#result');

    const div = document.createElement('div');
    div.innerText = 'Ergebnis: ' + result;

    output.appendChild(div);
}

const button = document.querySelector('#calculate-button');

button.addEventListener('click', calculate);

function generateHTMLElements(targetElement, numberOfElements) {
    for (let i = 0; i < numberOfElements; i++) {
        const label = document.createElement('label');
        const input = document.createElement('input');
        const id = 'value' + i;

        label.htmlFor = id;
        label.innerText = (i + 1) + '. Zahl: ';

        input.type = 'text';
        input.id = id;
        input.classList.add('value');

        targetElement.appendChild(label);
        targetElement.appendChild(input);
    }
}

const generateButton = document.querySelector('#count-button');
generateButton.addEventListener('click', function () {
    const valuesDiv = document.querySelector('#values');
    const numberOfElements = parseInt(document.querySelector('#count').value);

    valuesDiv.innerHTML = '';

    generateHTMLElements(valuesDiv, numberOfElements);
});