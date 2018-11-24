import *  from "./plotly-latest.min.js";
var map;
var mapName;
var startMarker;
var endMarker;

var landmarks = {
  "University_of_Glasgow": "https://en.wikipedia.org/wiki/University_of_Glasgow"
}

$(document).ready(function () {
	drawMap();
	
	TESTER = document.getElementById('tester');
	
			Plotly.plot( TESTER, [{
			x: [1, 2, 3, 4, 5],
			y: [1, 2, 4, 8, 16] }], {
			margin: { t: 0 } } );
});

function fetchRoute(elem) {
	
	
	map.eachLayer(function(layer){
		if (layer._path != undefined)
			map.removeLayer(layer);
});
		filepassed = elem.getAttribute("value");
		var path = "../Kelvingrover/" + filepassed
		if (window.XMLHttpRequest) {
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
					document.getElementById("routeIdentifier").innerHTML = mapName;
					map.setView(routeCoords[0]);
				}
			};
			
			xhttp.open("GET", path , true);
		}
		else {
			alert("Your browser is too secure for this un-deployed site.");
		}
		document.getElementById("routeIdentifier").html = "Test";
		xhttp.send();
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

function Wiki_uog() {
	
	/*var wiki_url = landmarks["University_of_Glasgow"];
	alert(wiki_url);
    $.ajax({
        type: "GET",
        url: wiki_url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {

            var markup = data.parse.text["*"];
            var blurb = $('<div></div>').html(markup);
            $('#article').html($(blurb).find('p'));

        },
        error: function (errorMessage) {
        }
    });*/
};


function drawMap () {
    
    map = L.map('mapid').setView([55.8692, -4.2834], 15);

    // draws map
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoicG1hY2FsZCIsImEiOiJjam9lZ2dmNnkwOG5mM3RwaXVpenNjZjl2In0.xY30r6ME_IZuTEAqHvXqbg'
        }).addTo(map);
    // adds icon for Kelvingrove museum
    L.marker([55.8686, -4.2906]).addTo(map)
        .bindPopup("<b>Kelvingrove Museum</b><br />Museum")
        .openPopup();
    // adds icon for Cameronians War Memorial
    L.marker([55.8694, -4.2922]).addTo(map)
        .bindPopup("<b>Cameronians War Memorial</b><br />Statue")
        .openPopup();
	// adds icon for University of Glasgow
	L.marker([55.8721, -4.2882]).addTo(map)
	.bindPopup("<b>University of Glasgow</b><br />Historic University");
	//temp.on('click', Wiki_uog);
		
    // adds icon for Kelvingrove Bandstand
    L.marker([55.8694, -4.2858]).addTo(map)
        .bindPopup("<b>Kelvingrove Bandstand</b><br />Live Music Venue")
        .openPopup();
    // adds icon for Kelvingrove Lawn Bowls and Tennis Centre
    L.marker([55.8674, -4.2883]).addTo(map)
        .bindPopup("<b>Kelvingrove Lawn Bowls and Tennis Centre</b><br />Bowling and Tennis")
        .openPopup();
    // adds icon for Tigress and Cubs
    L.marker([55.8684, -4.2824]).addTo(map)
        .bindPopup("<b>Tigress and Cubs</b><br />Statue")
        .openPopup();
    // adds icon for MacTassos
    L.marker([55.8697, -4.2866]).addTo(map)
        .bindPopup("<b>MacTassos</b><br />Scran")
        .openPopup();
    // adds icon for Lord Frederick Roberts
    L.marker([55.8703, -4.2818]).addTo(map)
        .bindPopup("<b>Lord Frederick Roberts</b><br />Statue")
        .openPopup();

}





