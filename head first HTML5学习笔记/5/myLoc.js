window.onload = getMyLocation;


var displayerr  = (error) => {
    var errorTypes = {
        0: 'unknow error',
        1: 'permission denied by user',
        2: 'position is not aviliable',
        3: 'requrest timed out'
    };

    var errMessage = errorTypes[error.code];
    if( error.code  === 0 ||error.code === 2) {
        errMessage = errMessage + '' + error.message;
    };

    var div = document.getElementById('location');
    div.innerHTML = errMessage;

    options.timeout +=100;
    navigator.geolocation.getCurrentPosition(
        displayLocation,
        displayerr,
        options
    )
};

var options = {
    enableHigthAccuracy: true,
    maximumAge: 60000,
    timeout:100
};

var computeDistance = (s,d) => {
    var slatrads = dtr(s.latitude);
    var slong = dtr(s.longitude);

    var dlatrads = dtr(d.latitude);
    var dlong = dtr(d.longitude);

    var Radius = 6371;

    var distance = Math.acos(Math.sin(slatrads) * Math.sin(dlatrads) + Math.cos(slatrads) * Math.cos(dlatrads) * Math.cos(slong - dlong)) * Radius;

    return distance
}

function dtr(x) {
    var radians = (x * Math.PI) / 180;
    return radians;
}

function getMyLocation() {
    if (navigator.geolocation) {
        var watchButton = document.getElementById('watch');
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById('clearWatch');

    } else {
        alert('obbs, no geolocation support')
    }
};

var ourCoords = {
    latitude : 47.6248,
    longitude: -122.52099
}

var map;

function showMap(coords) {
    var googleLatAndLong = new google.maps.LatLng(coords.latitude,coords.longitude);

    var mapOptions = {
        zoom : 10,
        center : googleLatAndLong,
        mapTypeId : 'roadmap'
    };
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv,mapOptions);

    var title = 'your location';
    var content = 'you are here: ' + coords.latitude + ',' + coords.longitude ;
    
    addMarker(map,googleLatAndLong,title,content);
};


var displayLocation = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    console.log(1);
    let div = document.getElementById('location');

    div.innerHTML = `Your are at Latitude：${latitude}, Longitude: ${longitude}`;
    div.innerHTML += ` (with ${position.coords.accuracy} meters accuracy)`;
    div.innerHTML += ` (found in ${options.timeout} milliseconds)`;

    var km = computeDistance(position.coords, ourCoords);
    console.log(km);
    var distance = document.getElementById('distance');
    distance.innerHTML = `you are ${km} km from the wickdedlymar hq`;

    if (map == null) {
        showMap(position.coords);
    };


};

function addMarker(map,latlong,title,content) {
    var markerOptions = {
        position: latlong,
        map: map,
        title: title,
        content: content
    };

    var marker = new google.maps.Marker(markerOptions);

    var infoWindowOptions = {
        content: content,
        position: latlong,
    };

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    google.maps.event.addListener(marker,'click',function() {
        infoWindow.open(map);
    });
};


var watchId = null;
function watchLocation() {
    watchId = navigator.geolocation.watchPosition(displayLocation,displayerr,options);
};

function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    };
};

