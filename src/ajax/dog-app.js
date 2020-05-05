class DogApiService {
    constructor() {
        this._listUrl = 'https://dog.ceo/api/breeds/list/all';
        this._detailUrl = 'https://dog.ceo/api/breed/';
    }

    _makeRequest(url, successCallback, errorCallback) {
        let httpRequest = new XMLHttpRequest();

        httpRequest.onreadystatechange = function (event) {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    let response = JSON.parse(httpRequest.responseText);

                    if (response.status === 'success') {
                        successCallback(response.message);
                    }
                    else {
                        errorCallback();
                    }
                }
                else {
                    errorCallback();
                }
            }
        };

        httpRequest.open('GET', url);
        httpRequest.send();
    }

    _makeRequestAsFetch(url) {
        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error in response');
                }
                return response.json();
            })
            .then((data) => {
                if (data.status !== 'success') {
                    throw new Error('Error in API response');
                }

                return data.message;
            });
    }

    /**
     * Returns a list of dog breeds.
     * 
     * @param {function} successCallback 
     * @param {function} errorCallback 
     */
    getList(successCallback, errorCallback) {
        this._makeRequest(this._listUrl, successCallback, errorCallback);
    }

    /**
     * @returns {Promise} A promise that is resolved when the list of dogs is received.
     */
    getListAsPromise() {
        return this._makeRequestAsFetch(this._listUrl);
    }

    /**
     * Returns a list of images for a specific dog breed.
     * 
     * @param {string} breed 
     * @param {function} successCallback 
     * @param {function} errorCallback 
     */
    getImages(breed, successCallback, errorCallback) {
        let url = this._detailUrl + breed + '/images';
        this._makeRequest(url, successCallback, errorCallback);
    }

    /**
     * 
     * @param {string} breed
     * @returns {Promise} A promise that is resolved when the list of images is received.
     */
    getImagesAsPromise(breed) {
        let url = `${this._detailUrl}${breed}/images`;
        return this._makeRequestAsFetch(url);
    }
}

class DogListComponent {
    constructor(targetElement, apiService, dogDetailComponent) {
        this._targetElement = targetElement;
        this._apiService = apiService;
        this._dogDetailComponent = dogDetailComponent;

        // this._apiService.getList((dogs) => { this.showDogs(dogs); }, function () { console.log('Fehler'); });
        this._apiService.getListAsPromise()
            .then((dogs) => { this.showDogs(dogs) })
            .catch((error) => { console.log('Fehler', error) });
    }

    showDogs(dogs) {
        let breedList = document.createElement('ul');

        for (let breed in dogs) {
            let breedListItem = document.createElement('li');

            breedListItem.innerText = breed;

            breedListItem.addEventListener('click', (event) => {
                // apiService.getImages(breed, (images) =>
                //     this._dogDetailComponent.showImage(images[0]));
                this._apiService.getImagesAsPromise(breed)
                    .then((images) => {
                        this._dogDetailComponent.showImage(images[0]);
                    })
            });

            let subbreeds = dogs[breed];
            if (subbreeds.length > 0) {
                let subbreedList = document.createElement('ul');
                for (let i = 0; i < subbreeds.length; i++) {
                    let subbreed = subbreeds[i];
                    let subbreedListItem = document.createElement('li');
                    subbreedListItem.innerText = subbreed;
                    subbreedList.appendChild(subbreedListItem);
                }
                breedListItem.appendChild(subbreedList);
            }
            breedList.appendChild(breedListItem);
        }

        this._targetElement.appendChild(breedList);
    }
}

class DogDetailComponent {
    constructor(targetElement) {
        this._targetElement = targetElement;
    }

    showImage(url) {
        let img = this._targetElement.querySelector('img');

        if (img === null) {
            img = document.createElement('img');
            this._targetElement.appendChild(img);
        }

        img.src = url;
    }
}

// main:
let apiService = new DogApiService();
let dogDetailComponent = new DogDetailComponent(document.querySelector('#dog-detail-component'));
let dogListComponent = new DogListComponent(document.querySelector('#dog-list-component'), apiService, dogDetailComponent);
