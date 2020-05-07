self.onmessage = (event) => {
    let person = event.data;

    person.age = 60;

    self.postMessage(`Hello Main, updated age.`);
};