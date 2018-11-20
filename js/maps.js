var map;
var mapName;
var startMarker;
var endMarker;

$(document).ready(function () {
	map = drawMap();
});

function fetchRoute(elem) {
	
	
	map.eachLayer(function(layer){
		if (layer._path != undefined)
			map.removeLayer(layer);
});
	filepassed = elem.getAttribute("value");
		var path = "../Kelvingrover/" + filepassed
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var routeCoords = parseXML(this);
				var route = L.polyline(routeCoords, {color: 'red'});
				route.addTo(map);
				if (startMarker != null)
					map.removeLayer(startMarker);
				if (endMarker != null)
					map.removeLayer(endMarker);
				startMarker = L.marker(routeCoords[0]).addTo(map).bindPopup("<b>Start</b>")
        .openPopup();
				endMarker = L.marker(routeCoords[routeCoords.length-1]).addTo(map).bindPopup("<b>End</b>");
					
				map.setView(routeCoords[0]);
			}
		};
		
		xhttp.open("GET", path , true);
		
		xhttp.send();
		document.getElementById("routeIdentifier").innerHTML = mapName;
}

function parseXML (xml) {
    
    var xmlDoc = xml.responseXML;
    getTitle(xmlDoc);
    coords = getTrack(xmlDoc);

    return coords;
}

function getTitle (xmlDoc) {
    var names = xmlDoc.getElementsByTagName("name");
    mapName = names[0].childNodes[0].nodeValue;
}

function getTrack (xmlDoc) {
    
    var points = xmlDoc.getElementsByTagName("trkpt");
    var coords = [];

    for (i = 0; i < points.length; i++)
        coords.push([points[i].getAttribute("lat"), points[i].getAttribute("lon")]);
    

    return coords;
}

function drawMap () {
    
    var mymap = L.map('mapid').setView([55.8692, -4.2834], 15);

    // draws map
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoicG1hY2FsZCIsImEiOiJjam9lZ2dmNnkwOG5mM3RwaXVpenNjZjl2In0.xY30r6ME_IZuTEAqHvXqbg'
        }).addTo(mymap);
    // adds icon for Kelvingrove museum
    L.marker([55.8686, -4.2906]).addTo(mymap)
        .bindPopup("<b>Kelvingrove Museum</b><br />Museum")
        .openPopup();
    // adds icon for Cameronians War Memorial
    L.marker([55.8694, -4.2922]).addTo(mymap)
        .bindPopup("<b>Cameronians War Memorial</b><br />Statue")
        .openPopup();
    // adds icon for Kelvingrove Bandstand
    L.marker([55.8694, -4.2858]).addTo(mymap)
        .bindPopup("<b>Kelvingrove Bandstand</b><br />Live Music Venue")
        .openPopup();
    // adds icon for Kelvingrove Lawn Bowls and Tennis Centre
    L.marker([55.8674, -4.2883]).addTo(mymap)
        .bindPopup("<b>Kelvingrove Lawn Bowls and Tennis Centre</b><br />Bowling and Tennis")
        .openPopup();
    // adds icon for Tigress and Cubs
    L.marker([55.8684, -4.2824]).addTo(mymap)
        .bindPopup("<b>Tigress and Cubs</b><br />Statue")
        .openPopup();
    // adds icon for MacTassos
    L.marker([55.8697, -4.2866]).addTo(mymap)
        .bindPopup("<b>MacTassos</b><br />Scran")
        .openPopup();
    // adds icon for Lord Frederick Roberts
    L.marker([55.8703, -4.2818]).addTo(mymap)
        .bindPopup("<b>Lord Frederick Roberts</b><br />Statue")
        .openPopup();

    return mymap;
}



