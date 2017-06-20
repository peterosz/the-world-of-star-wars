function loadTable() {
    var planets = getPlanets();
    var table = document.getElementById('sw-table');
    for (let i = 0; i < planets.length; i++) {
        var newRow = document.createElement('tr');
        var planetName = document.createElement('td');
        var planetDiameter = document.createElement('td');
        var planetClimate = document.createElement('td');
        var planetTerrain = document.createElement('td');
        var planetSurface = document.createElement('td');
        var planetPopulation = document.createElement('td');
        table.appendChild(newRow);
        newRow.appendChild(planetName);
        newRow.appendChild(planetDiameter);
        newRow.appendChild(planetClimate);
        newRow.appendChild(planetTerrain);
        newRow.appendChild(planetSurface);
        newRow.appendChild(planetPopulation);
        planetName.innerHTML = planets[i].name;
        planetDiameter.innerHTML = planets[i].diameter;
        planetClimate.innerHTML = planets[i].climate;
        planetTerrain.innerHTML = planets[i].terrain;
        planetSurface.innerHTML = planets[i].surface_water;
        planetPopulation.innerHTML = planets[i].population;
    }
}


function getPlanets(url) {
    var xhttp = new XMLHttpRequest();
    if (url) {
        xhttp.open("GET", url, false);
    } else {
        xhttp.open("GET", "http://swapi.co/api/planets/", false);
    }
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    return response['results'];
}


function main() {
    loadTable();
    var nextButton = document.getElementById('next');
}


window.addEventListener('load', main());