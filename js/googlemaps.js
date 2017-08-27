
// Ikoner
var ikonBase  = "img/ikoner/";
var ikoner = {
          buss: ikonBase + 'ikon_buss.png',
          trikk: ikonBase + 'ikon_buss.png',
          tbane: ikonBase + 'ikon_buss.png',
          tog: ikonBase + 'ikon_buss.png'
        };

// Map
var osloCoords = {lat: 59.9138688, lng: 10.7522454};

var bussMarkers = new Array(50);

setInterval(updateMap, 100); 

function initMap()
{
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: osloCoords
        });
    
    generateBusses(120, map);
}

function updateMap()
{
    for(var i = 0; i < bussMarkers.length; i++)
    {
        bussMarkers[i].move();
    }
}

function generateBusses(antall, map)
{
    for(var i = 0; i < antall; i++)
    {
        var marker = new google.maps.Marker({
            icon: ikoner.buss,
            map: map,
            title: "30",
            label: "411"
        });
        bussMarkers[i] = new Transport(i, marker, osloCoords);
        var ranVel = {x: Math.random() * 0.001, y: Math.random() * 0.001};
        bussMarkers[i].setVelocity(ranVel);
    }
}