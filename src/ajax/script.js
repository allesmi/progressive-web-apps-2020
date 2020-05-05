// ECMAScript 6 (ES6)
class Person {
    constructor() {
        this.name = 'Anton';
        this.age = 42;

        this.greet();
        document.querySelector('button').addEventListener('click', () => { this.greet() });
    }

    greet() {
        console.log(`Hallo mein Name ist ${this.name}`);
    }
}

let person = new Person();

let fn1 = function (a, b) { return a + b; };
let fn2 = (a, b) => { return a + b; };
