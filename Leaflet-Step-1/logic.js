// Create a map object
var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 5
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  }).addTo(myMap);
  
url =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Perform a GET request to the url
d3.json(url, function(data) {

  for (var i = 0; i < data.features.length; i++) {
    var latitude = data.features[i].geometry.coordinates[1];
    var longitude = data.features[i].geometry.coordinates[0];
    var location = [latitude, longitude];
    var magnitude = data.features[i].properties.mag;
      
  function getColor(d) {
    return d > 5 ? '#bd0026' :
            d > 4 ? '#f03b20' :
            d > 3 ? '#fd8d3c' :
            d > 2 ? '#feb24c' :
            d > 1 ? '#fed976' :
                    '#ffffb2';
  }
    
  L.circle(location, {
    fillOpacity: 1,
    color: 'black',
    fillColor: getColor(magnitude),
    weight: 1,
    opacity: 2,
    radius: (magnitude*20000)
    }).bindPopup("<h3>" + data.features[i].properties.place + "</h3> <hr> <h4>Mag: " + magnitude + "</h4>").addTo(myMap);
      
  }

  //Add legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (leg) {

	var div = L.DomUtil.create('div', 'info legend');
		grades = [0, 1, 2, 3, 4, 5];
		labels = [];

	for (var i = 0; i < grades.length; i++) {
		div.innerHTML +=
			'<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
			grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
	}

	return div;
};

legend.addTo(myMap);

});

