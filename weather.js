var x = document.getElementById("message"); 
var mess = "";

$( function () {
    var height_diff = $( window ).height() - $( 'body' ).height();
    if ( height_diff > 0 ) {
        $( 'footer' ).css( 'margin-top', height_diff );
    }
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    window.alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
    //x.innerHTML= "Latitude: "+position.coords.latitude+"<br>Longitude: "+position.coords.longitude;

  $.ajax({
  url: "https://api.darksky.net/forecast/22f50e7cc38a7f97f7b2ea07373baa31/"+position.coords.latitude+","+position.coords.longitude,
  dataType: "jsonp"
}).done(function(json) {
  strweather = JSON.stringify(json);
  details = JSON.parse(strweather);
  
 var skies = details.currently.summary.toLowerCase();//separate weather desc for our background changing functionality
 var temp = Math.floor(details.currently.temperature)+"°F";
 mess = "It is "+ skies +" "+ "and temperature outside is ";
  document.getElementById("weather").innerHTML = "It is "+ skies +" "+ "and temperature outside is " +temp;
    
    if (skies.search("cloud") !== -1 ){
    $("body").css("background-image", "url(https://s2.postimg.org/v94veod09/cloud.png)").fadeIn(2000);
  }
    else if (skies.search("rain") !== -1 ){
      $("body").css("background-image", "url(https://s4.postimg.org/d1ps9n67x/rain.jpg)");
    }
    else if( skies.search("clear") !== -1 ){
            $("body").css("background-image", "url(https://s4.postimg.org/h0rl67k8t/clear.jpg)");
            }
    else $("body").css("background-image", "url(https://s12.postimg.org/pmplove71/weather-default.jpg)")
    
})
  
}; 


function changeTemp(){
  var temp2 = Math.floor(((details.currently.temperature)-32)*5/9)+"°C";
  document.getElementById("weather").innerHTML = mess+temp2; 
};