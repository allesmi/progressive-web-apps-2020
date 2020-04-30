class PersonApiService {
    constructor() {

    }

    /**
     * Returns a list of people.
     * 
     * @returns {Promise} The promise that is resolved
     * once the list of people is received.
     */
    getList() {
        // fetch
    }
}

class PersonListComponent {
    constructor(targetElement, personApiService) {
        this._targetElement = targetElement;
        this._personApiService = personApiService;

        this._personApiService.getList()
            .then((people) => this.showPeople(people));
    }

    showPeople(people) {
        // ul erzeugt
        // li fuer jede Person
    }
}

let personApiService = new PersonApiService();
let personListComponent = new PersonListComponent(
    document.querySelector('main'), personApiService);

let user = { name: 'user1', password: 'asdf' };

fetch('users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
});

let httpRequest = new XMLHttpRequest();

httpRequest.setRequestHeader('Content-Type', 'application/json');
httpRequest.open('POST', 'users');
httpRequest.send(JSON.stringify(user));
