function loadTable(url) {
    var table = document.getElementById('sw-table');
    var planets = getApiData(url);
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
        var planetResidents = document.createElement('td');
        tableBody.appendChild(newRow);
        newRow.appendChild(planetName);
        newRow.appendChild(planetDiameter);
        newRow.appendChild(planetClimate);
        newRow.appendChild(planetTerrain);
        newRow.appendChild(planetSurface);
        newRow.appendChild(planetPopulation);
        newRow.appendChild(planetResidents);
        planetName.innerHTML = planets[i].name;
        planetDiameter.innerHTML = planets[i].diameter;
        planetClimate.innerHTML = planets[i].climate;
        planetTerrain.innerHTML = planets[i].terrain;
        planetSurface.innerHTML = planets[i].surface_water;
        planetPopulation.innerHTML = planets[i].population;
        if (planets[i].residents.length > 0) {
            var residentsButton = document.createElement('button');
            residentsButton.setAttribute('class', 'residents');
            residentsButton.innerHTML = planets[i].residents.length +' residents';
            planetResidents.appendChild(residentsButton);
            residentsButton.setAttribute('data-residents', planets[i].residents);
        } else {
            planetResidents.innerHTML = 'No known residents';
        }
    }
    var residentsEvent = document.getElementsByClassName('residents');
    for (var j = 0; j < residentsEvent.length; j++) {
            residentsEvent[j].addEventListener('click', loadModalTable(j));
        }
}


function loadModalTable(x) {
    var modal = document.getElementById('modal');
    var modalTable = document.getElementsByClassName('modal-table')[0];
    var modalTableBody = document.createElement('tbody');
    modal.style.display = 'block';
    modalTable.appendChild(modalTableBody);
    var residentsData = [];
    var residents = document.getElementsByClassName('residents')[x];
    
    residents = residents.getAttribute('data-residents');
    residents.split(',');
    for (let i = 0; i < residents.length; i++) {
        residentsData.push(getApiData(residents[i]));
    }
    for (let r = 0; r < residentsData.length; r++) {
        var residentnewRow = document.createElement('tr');
        var residentName = document.createElement('td');
        var residentHeight = document.createElement('td');
        var residentMass = document.createElement('td');
        var residentHairColor = document.createElement('td');
        var residentSkinColor = document.createElement('td');
        var residentEyeColor = document.createElement('td');  
        var residentBirthYear = document.createElement('td');
        var residentGender = document.createElement('td');
        modalTableBody.appendChild(residentnewRow);
        residentnewRow.appendChild(residentName);
        residentnewRow.appendChild(residentHeight);
        residentnewRow.appendChild(residentMass);
        residentnewRow.appendChild(residentHairColor);
        residentnewRow.appendChild(residentSkinColor);
        residentnewRow.appendChild(residentEyeColor);
        residentnewRow.appendChild(residentBirthYear);
        residentnewRow.appendChild(residentGender);
        residentName.innerHTML = residentsData[r].name;
        residentHeight.innerHTML = residentsData[r].heigth;
        residentMass.innerHTML = residentsData[r].mass;
        residentHairColor.innerHTML = residentsData[r].hair_color;
        residentSkinColor.innerHTML = residentsData[r].skin_color;
        residentEyeColor.innerHTML = residentsData[r].eye_color;
        residentBirthYear.innerHTML = residentsData[r].birth_year;
        residentGender.innerHTML = residentsData[r].gender;
    }
    
    
    var closeBtn = document.getElementsByClassName('modal-close-button')[0];
    var closeBtnX = document.getElementsByClassName('modal-close')[0];
    window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        }
    }
    closeBtn.onclick = function() {
    modal.style.display = "none";
    }
    closeBtnX.onclick = function() {
    modal.style.display = "none";
    }
}


function getApiData(url) {
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
    var nextBtn = document.getElementById('next');
    var prevBtn = document.getElementById('prev');
    prevBtn.style.display = 'none';
    nextBtn.addEventListener('click', function() {
        prevBtn.style.display = 'inline-block';
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
    loadTable();
}


window.addEventListener('load', main());