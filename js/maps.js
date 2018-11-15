$(document).ready(function () {

    var map = drawMap();

    var directory = document.getElementById("mapcall").getAttribute("dirpassed");
    var filepassed = document.getElementById("mapcall").getAttribute("filepassed");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var routeCoords = parseXML(this);
            var route = L.polyline(routeCoords, {color: 'red'});
            route.addTo(map);

            map.setView(routeCoords[0]);
        }
    };
    var path = "../Kelvingrover/" + directory + "/" + filepassed
    xhttp.open("GET", path , true);
    xhttp.send();
});



function parseXML (xml)
{
    var xmlDoc = xml.responseXML;
    getTitle(xmlDoc);
    coords = getTrack(xmlDoc);

    return coords;
}


function getTitle (xmlDoc)
{
    var names = xmlDoc.getElementsByTagName("name");
    console.log(names[0].childNodes[0].nodeValue)
}


function getTrack (xmlDoc)
{
    var points = xmlDoc.getElementsByTagName("trkpt");
    var coords = [];

    for (i = 0; i < points.length; i++)
    {
        coords.push([points[i].getAttribute("lat"), points[i].getAttribute("lon")]);
    }

    return coords;
}



function drawMap ()
{
    var mymap = L.map('mapid').setView([55.8642, -4.2518], 14);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoicG1hY2FsZCIsImEiOiJjam9lZ2dmNnkwOG5mM3RwaXVpenNjZjl2In0.xY30r6ME_IZuTEAqHvXqbg'
        }).addTo(mymap);

    return mymap;
}



