// Create a map object
var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 6
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
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

    // Conditionals for earthquake magnitude
      var color = "";
      if (magnitude >= 5) {
        color = "#581845";
      }
      else if (magnitude >= 4) {
        color = "#900C3F";
      }
      else if (magnitude >= 3) {
        color = "#C70039";
      }
      else if (magnitude >= 2) {
        color = "#FF5733";
      }
      else if (magnitude >= 1) {
        color = "#FFC300";
      }
      else {
        color = "#DAF7A6";
      }  
    
    L.circle(location, {
      fillOpacity: 1,
      color: color,
      fillColor: color,
      weight: 1,
      opacity: 2,
      radius: magnitude * 20000
      }).bindPopup("<h3>" + data.features[i].properties.place + "</h3> <hr> <h4>Mag: " + magnitude + "</h4>").addTo(myMap);
       
    }

});

