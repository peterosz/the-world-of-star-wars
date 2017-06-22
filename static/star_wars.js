function loadTable(url) {
    var table = document.getElementById('sw-table');
    var planets = getPlanets(url);
    var tableBody = document.createElement('tbody');
    tableBody.setAttribute('id', 'table-body');
    table.appendChild(tableBody);
    planets = planets['results'];
    for (let i = 0; i < planets.length; i++) {
        var newRow = document.createElement('tr');
        var planetName = document.createElement('td');
        var planetDiameter = document.createElement('td');
        var planetClimate = document.createElement('td');
        var planetTerrain = document.createElement('td');
        var planetSurface = document.createElement('td');
        var planetPopulation = document.createElement('td');    
        tableBody.appendChild(newRow);
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
    if (typeof url === 'string' && url.indexOf('api') > -1) {
        xhttp.open("GET", url, false);
    } else {
        xhttp.open("GET", "http://swapi.co/api/planets/", false);
    }
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    return response;
}


function loadNewPage(pageNumber) {
    var table = document.getElementById('sw-table');
    var oldRows = document.getElementById('table-body');
    table.removeChild(oldRows);
    url = 'https://swapi.co/api/planets/?page=' + pageNumber;
    loadTable(url);
}


function main() {
    var pageNumber = 1;
    var url = "http://swapi.co/api/planets/";
    var nextBtn = document.getElementById('next');
    var prevBtn = document.getElementById('prev');
    nextBtn.addEventListener('click', function() {
        while (pageNumber < 7) {
        pageNumber++;
        loadNewPage(pageNumber);
        return pageNumber;
        }
    });
    prevBtn.addEventListener('click', function() {
        while (pageNumber > 1) {
            pageNumber--;
            loadNewPage(pageNumber);
            return pageNumber;
        }
    });
    loadTable(url);
}


window.addEventListener('load', main());