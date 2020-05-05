// let main = document.querySelector('main');

function onPositionSuccess(position) {
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let altitude = position.coords.altitude;

    let accuracy = position.coords.accuracy;

    // main.innerHTML += `<br>Latitude: ${latitude.toFixed(2)} Grad, Longitude: ${longitude.toFixed(2)} Grad, Accuracy: ${accuracy}m`;
}

function onPositionError(positionError) {
    console.log(positionError);
}

let map = L.map('map');

let layer = L.tileLayer('https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png',
    {
        maxZoom: 19,
        minZoom: 1,
        subdomains: ['maps1', 'maps2', 'maps3']
    });

layer.addTo(map);
map.setView([47.8, 13.03], 16);

let marker = L.marker([47.85, 13.035]);
marker.addTo(map);

// Erkennen, ob der Browser die Geolocation API unterstützt
if (navigator.geolocation) {
    // main.innerText = 'Der Browser unterstützt Geolocation.';

    navigator.permissions.query({ name: 'geolocation' })
        .then((result) => {
            if (result.state === 'granted') {
                // main.innerHTML += '<br>Der User hat die Erlaubnis für die Geolocation erteilt';
            }
            else if (result.state === 'prompt') {
                // main.innerHTML += '<br>Der User wurde noch nicht gefragt.';
            }
            else if (result.state === 'denied') {
                // main.innerHTML += '<br>Der User hat die Verwendung abgelehnt.';
                return;
            }

            navigator.geolocation.getCurrentPosition(onPositionSuccess, onPositionError);
        });
}
else {
    // main.innerText = 'Der Browser unterstützt keine Geolocation';
}