function loadTable(pageUrl) {
    var table = document.getElementById('sw-table');
    var planets = getApiData(pageUrl);
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
        if (planets[i].diameter !== 'unknown') {
            planetDiameter.innerHTML = planets[i].diameter+' km';
        } else {
            planetDiameter.innerHTML = planets[i].diameter;
        }
        planetClimate.innerHTML = planets[i].climate;
        planetTerrain.innerHTML = planets[i].terrain;
        if (planets[i].surface_water !== 'unknown') {
            planetSurface.innerHTML = planets[i].surface_water+'%';
        } else {
            planetSurface.innerHTML = planets[i].surface_water;
        }
        if (planets[i].population !== 'unknown') {
            planetPopulation.innerHTML = planets[i].population/1000000 + ' million';
        } else {
            planetPopulation.innerHTML = planets[i].population
        }
        planetName.setAttribute('data-name', planets[i].name);
        planetName.setAttribute('id', 'planet-name'+i);
        planetName.setAttribute('data-id'+i, planets[i].url.replace( /[^\d]/g, '' ));
        newRow.setAttribute('class', 'sw-tr');
        voteColumn(i, planets);
        if (planets[i].residents.length > 0) {
            var residentsButton = document.createElement('button');
            residentsButton.innerHTML = planets[i].residents.length +' resident(s)';
            planetResidents.appendChild(residentsButton);
            var residentsList = planets[i].residents;
            residentsButton.setAttribute('id', 'residentBtn'+i);
            residentsButton.setAttribute('data-residents', planets[i].residents);
            residentsButton.addEventListener('click', function() {return loadModalTable(i);});
        } else {
            planetResidents.innerHTML = 'No known residents';
        }
    }
}


function voteColumn(i, planets) {
    var headerColumns = document.getElementsByClassName('sw-th');
    var lastColumn = headerColumns[headerColumns.length - 1];
    var voteCell = document.createElement('td');
    var voteBtn = document.createElement('button');
    var rows = document.getElementsByClassName('sw-tr');
    voteBtn.setAttribute('class', 'vote-button');
    voteBtn.setAttribute('data-planetid', planets[i].url.replace( /[^\d]/g, '' ));
    voteBtn.innerHTML = 'Vote on this planet';
    if (lastColumn.innerHTML === 'Vote') {
        rows[i].appendChild(voteCell);
        voteCell.appendChild(voteBtn);
    }
}


function loadModalTable(i) {
    var modal = document.getElementById('modal');
    var modalTable = document.getElementsByClassName('modal-table')[0];
    var modalTableBody = document.createElement('tbody');
    
    var modalTableHeader = document.createElement('thead');
    modalTableHeader.setAttribute('id', 'modal-table-head');
    var modalHeaderRow = document.createElement('tr');
    var modalTableHeaderNames = ['Name',
                            'Height',
                            'Mass',
                            'Hair color',
                            'Skin color',
                            'Eye color',
                            'Birth year',
                            'Gender'];
    for (let h = 0; h < modalTableHeaderNames.length; h++) {
        var modalHeaderCell = document.createElement('th');
        modalHeaderCell.innerHTML = modalTableHeaderNames[h];
        modalHeaderRow.appendChild(modalHeaderCell);
    }
    modalTable.appendChild(modalTableHeader);
    modalTableHeader.appendChild(modalHeaderRow);

    modalTableBody.setAttribute('id', 'modal-table-body');
    modal.style.display = 'block';
    var closeBtn = document.getElementsByClassName('modal-close-button')[0];
    var closeBtnX = document.getElementsByClassName('modal-close')[0];
    
    window.onclick = function(event) {
    if (event.target === modal) {
        var modalOldRows = document.getElementById('modal-table-body');
        var modalOldHead = document.getElementById('modal-table-head');
        modalTable.removeChild(modalOldRows);
        modalTable.removeChild(modalOldHead);
        modal.style.display = "none";       
        }
    }
    closeBtn.onclick = function() {
        var modalOldRows = document.getElementById('modal-table-body');
        var modalOldHead = document.getElementById('modal-table-head');
        modalTable.removeChild(modalOldRows);
        modalTable.removeChild(modalOldHead);
        modal.style.display = "none";        
    }
    closeBtnX.onclick = function() {
        var modalOldRows = document.getElementById('modal-table-body');
        var modalOldHead = document.getElementById('modal-table-head');
        modalTable.removeChild(modalOldRows);
        modalTable.removeChild(modalOldHead);
        modal.style.display = "none";
    }
    var planetName = document.getElementById('planet-name'+i);
    var getPlanetName = planetName.getAttribute('data-name');
    var modalTitle = document.getElementById('modal-title');
    modalTitle.innerHTML = 'Residents of '+getPlanetName;
    modalTable.appendChild(modalTableBody);
    residentBtn = document.getElementById('residentBtn'+i);
    residentsList = residentBtn.getAttribute('data-residents');
    residentsList = residentsList.split(',');
    for (let x = 0; x < residentsList.length; x++) {
        var residentsData = getApiData(residentsList[x]);
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
        residentName.innerHTML = residentsData.name;
        residentHeight.innerHTML = residentsData.height;
        residentMass.innerHTML = residentsData.mass;
        residentHairColor.innerHTML = residentsData.hair_color;
        residentSkinColor.innerHTML = residentsData.skin_color;
        residentEyeColor.innerHTML = residentsData.eye_color;
        residentBirthYear.innerHTML = residentsData.birth_year;
        residentGender.innerHTML = residentsData.gender;
    }
}


function getApiData(pageUrl) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', pageUrl, false);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    return response;
}


function loadNewPage(pageNumber) {
    var table = document.getElementById('sw-table');
    var oldRows = document.getElementById('table-body');
    table.removeChild(oldRows);
    pageUrl = 'https://swapi.co/api/planets/?page=' + pageNumber;
    loadTable(pageUrl);
}


function statModal() {
    var modal = document.getElementById('modal');
    var closeBtn = document.getElementsByClassName('modal-close-button')[0];
    var closeBtnX = document.getElementsByClassName('modal-close')[0];
    modal.style.display = 'block';
    window.onclick = function(event) {
        if (event.target === modal) {
            var modalOldRows = document.getElementById('modal-table-body');
            var modalOldHead = document.getElementById('modal-table-head');
            modalTable.removeChild(modalOldRows);
            modalTable.removeChild(modalOldHead);
            modal.style.display = "none";       
        }
    }
    closeBtn.onclick = function() {
        var modalOldRows = document.getElementById('modal-table-body');
        var modalOldHead = document.getElementById('modal-table-head');
        modalTable.removeChild(modalOldRows);
        modalTable.removeChild(modalOldHead);
        modal.style.display = "none";        
    }
    closeBtnX.onclick = function() {
        var modalOldRows = document.getElementById('modal-table-body');
        var modalOldHead = document.getElementById('modal-table-head');
        modalTable.removeChild(modalOldRows);
        modalTable.removeChild(modalOldHead);
        modal.style.display = "none";
    }

    var modalTable = document.getElementsByClassName('modal-table')[0];
    var modalTableHeader = document.createElement('thead');
    modalTableHeader.setAttribute('id', 'modal-table-head');
    var modalHeaderRow = document.createElement('tr');
    var modalTableHeaderNames = ['Planet name', 'Votes'];
                            
    for (let h = 0; h < modalTableHeaderNames.length; h++) {
        var modalHeaderCell = document.createElement('th');
        modalHeaderCell.innerHTML = modalTableHeaderNames[h];
        modalHeaderRow.appendChild(modalHeaderCell);
    }
    modalTable.appendChild(modalTableHeader);
    modalTableHeader.appendChild(modalHeaderRow);

    var modalTableBody = document.createElement('tbody');
    modalTableBody.setAttribute('id', 'modal-table-body');
    modalTable.appendChild(modalTableBody);

    $.ajax({
            type: 'POST',
            url: '/statistics',
            dataType: 'json',
            success: function(response) {
                for (property of response) {
                    handleStatistics(property[0], property[1]);
                }
            },
            error: function() {
                alert('Error in network request!');
            }
        });
}


function handleStatistics(planetId, numberOfVotes) {
        $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://swapi.co/api/planets/' + planetId,
        success: function(response) {
            var planetName = response.name;
            displayStatistics(planetName, numberOfVotes)
        },
        error: function() {
            alert('Error loading planets data!');
            }
        });
    };


function displayStatistics(planetName, numberOfVotes) {
        $('#modal-table-body').append('<tr>' +
                                    '<td>' + planetName + '</td>' +
                                    '<td>' + numberOfVotes + '</td>' +
                                    '</tr>');                    
   }



function main() {
    var pageNumber = 1;
    var nextBtn = document.getElementById('next');
    var prevBtn = document.getElementById('prev');
    var statBtn = document.getElementById('statistics');
    var pageUrl = 'http://swapi.co/api/planets/';
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
    $(document).on('click', '.vote-button', function () {
        var planetId = $(this).attr('data-planetid');
        var votedPlanetId = JSON.stringify({votedplanet:planetId});
        $.ajax({
            type : 'POST',
            url : '/vote',
            contentType: 'application/json;charset=UTF-8',
            data : JSON.stringify({votedPlanetId}),
            success : function(response) {
                alert('Successfully voted on planet!');
            },
            error: function(error) {
                alert('Failed to vote!');
            }
        })
        }
    );
    statBtn.addEventListener('click', function() {return statModal();});
    loadTable(pageUrl);
}


window.addEventListener('load', main());