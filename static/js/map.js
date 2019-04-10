// Creating tile layer - grayscale
var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 16,
    id: "mapbox.light",
    accessToken: API_KEY
});
console.log("suv1")
// var cityLong = prompt("Please enter long:", "<name goes here>");
// var cityLat = prompt("Please enter lat:", "<name goes here>");

// var initRecord = false;

// Load data from hours-of-tv-watched.csv
//"/alldata"
//d3.csv("./craigslist_data.csv", function(error, mapData) {
	

//d3.json("/alldata", function(error, mapData) {
//d3.json("/alldata",function(mapData){
d3.json("/alldata", function(error, mapData) {
console.log("suv")
console.log(mapData)
  //if (error) return console.warn(error);

  // Creating base map with focus on the selecte city   
  var map = L.map("map-id", {
    center: [37.52, -122.27],
    zoom: 11,
    layers: [lightmap]
  });

  // console.log("before loop");
    // Read the data
  mapData.forEach(function(data) {
      
    if (data.Latitude == "" || data.Longtitude == ""){
      console.log("Null Coordinates");
    }
    else {
      // console.log("marker:" + data.City);
      // console.log("lati: "+ data.Latitude);
      // console.log("longi:" + data.Longtitude);
      var newMarker = L.marker([data.Latitude, data.Longtitude], {
        opacity: 0.75,
        riseOnHover:true
      })
      .bindPopup('<h3>'+ data.name + '</h3><a href="' + data.url + '">Details</a>');

      // Adding the marker to the map 
      newMarker.addTo(map)  

    };  
  });

    
  map.setView(new L.LatLng(37.737, -122.5), 11);
});
