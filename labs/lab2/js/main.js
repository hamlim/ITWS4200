$(document).ready(function() {
	//api key to Forcast.io
	//notice using google stylistic guidelines for javascript code : http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
	
	//Gobal variables
	var FORECAST_API_KEY = "648a4e350fb8d404fbc681ec80093fb5";
	var MAPS_API_KEY = "AIzaSyASrrlc2kv3xENimk6GQRKJuIvrjdDfNEg";
	var returnarr = [];
	
	
	//general notes:
	//the query for the weather request is formatted as bellow:
	//	https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE
	// where latitude and longitude are the current location values using the geolocation API
	//city name is determined using the Google Maps API 3.0
	//called reverse geodecoding 
	//general form is being used in the geocall nested function
	
	// Here is there the program is split up into three different sections
	//One for determining the location of the user, one for calling to the forecast.io api to get the conditions and one for determining the city name using GMaps api

	//Begin the Geolocation API
	function errorHandler(error) {
  	switch(error.code) {
    	case error.PERMISSION_DENIED:
      	alert("User denied the request for Geolocation.");
      	break;
    	case error.POSITION_UNAVAILABLE:
				alert("Location information is unavailable.");
      	break;
    	case error.TIMEOUT:
				alert("The request to get user location timed out.");
      	break;
    	case error.UNKNOWN_ERROR:
				alert("An unknown error occurred.");
      	break;
    }
  };
	
	function geocall() {
		navigator.geolocation.getCurrentPosition(function(position){
			//begin the html5 geolocation api call
			//we push the locations (lat and long) into the global array returnarr
			returnarr.push(position.coords.latitude);
			returnarr.push(position.coords.longitude);
			//debugging use we log the array
//			console.log(returnarr);	
			//begin Forecast.io api call
			var url = "https://api.forecast.io/forecast";
			var lati = returnarr[0];
			var long = returnarr[1];
			var data;
			var tempb = "<li class='temp'>";
			var endli = "</li>";
			var iconb = "<li class='icon'>";
			var locationli = "<li class='city'>";
			var windb = "<li class='wind'>";
			var humidityb = "<li class='humidity'>";
			//use an ajax call to get the json file from Forecast.io's servers
			$.ajax({
				type: "GET",
				url: url +"/"+ FORECAST_API_KEY + "/" + lati + "," + long,
				dataType: "jsonp", //notice the jsonp use is to avoid the Cross Domian problems
				success: function(data, status) {
					console.log(data);
					//variables for outputting stuff
					var temp = "<li class='temp'><img src='SVG/Thermometer.svg' height='50px' width='50px'/>" + data.currently.temperature +"<img src='SVG/Degrees-Fahrenheit.svg' height='50px' width='50px'/>" + endli;
					var wind = "<li class='wind'><img src='SVG/Wind.svg' height='50px' width='50px'/>" + data.currently.windSpeed + " MPH" + endli;
					var icon_text = "<li class='icon'>";
					var citynmb = "<li class='city-name'>";
					
					//begin Google maps api call
					//declare needed variables
					var geocoder;
					var cityname = "";
					//begin functions
					geocoder = new google.maps.Geocoder();
					var latlng = new google.maps.LatLng(returnarr[0], returnarr[1]);
					geocoder.geocode({'latLng': latlng}, function(results, status){
						if (status == google.maps.GeocoderStatus.OK){
							if(results[0]) {
								console.log(results[0]);
								//formatted address
								cityname = results[0].formatted_address;
								citynmb = citynmb + cityname + endli;
								//now append all the items to the ul element
								
								$(".card ul.right").append(temp);
								$(".card ul.right").append(wind);
								//now begins the long if else chain of determining the picture to show as the weather icon
								//we go through every weather condition all found on the forecast.io api docs and match it to a reasonable svg in our resources
								//List of all icons:
								//	icon: A machine-readable text summary of this data point, suitable for selecting an icon for display. If defined, this property will have one of the 
								//	following values:{clear-day}, [clear-night], [rain], [snow], [sleet], [wind], [fog], [cloudy],[ partly-cloudy-day], or [partly-cloudy-night].
								//  (Developers ensure that a sensible default is defined, as additional values, such as hail, thunderstorm, or tornado, may be defined in the future.)
								//define the url variable
								var icon_image = "";
								if (data.currently.icon == "clear-day"){
									//now we need to set a variable to represent the location of the icon that is related to the icon text value
									//this is based off of opinion and may not be the correct symbol because the icons far outnumber the values available from forecast.io
									icon_image = "SVG/sun.svg";
									//note to future editors, attempted to make the definition of the weather user-friendly
									icon_text = icon_text + "It's clear outside go have fun!" + endli;
								} else if (data.currently.icon == "clear-night"){
									icon_image = "SVG/Moon.svg";
									icon_text = icon_text + "It's clear tonight, go out and look at the stars!" + endli;
								} else if (data.currently.icon == "rain"){
									icon_image = "SVG/Cloud-Rain.svg";
									icon_text = icon_text + "Time to break out the umbrellas!" + endli;
								} else if (data.currently.icon == "snow"){
									icon_image = "SVG/Cloud-Snow-Alt.svg";
									icon_text = icon_text + "Prepare the snow clothes, get your friends ready to build snowmen!" + endli;
								} else if (data.currently.icon == "sleet"){
									icon_image = "SVG/Cloud-Snow.svg";
									icon_text = icon_text + "Maybe it's not worth going outside today, then again maybe it is!" + endli;
								} else if (data.currently.icon == "wind"){
									icon_image = "SVG/Wind.svg";
									icon_text = icon_text + "Hold onto your hats, its gusty out!" + endli;
								} else if (data.currently.icon == "fog"){
									icon_image = "SVG/Cloud-Fog.svg";
									icon_text = icon_text + "Be careful when driving, visibility is reduced!" + endli;
								} else if (data.currently.icon == "cloudy"){
									icon_image = "SVG/Cloud.svg";
									icon_text = icon_text + "Don't expect too much sun today, I am sure it will clear up!" + endli;
								} else if (data.currently.icon == "partly-cloudy-day"){
									icon_image = "SVG/Cloud-Sunb.svg";
									icon_text = icon_text + "The sun is sure to show up at sometime today!" + endli;
								} else if (data.currently.icon == "partly-cloudy-night"){
									icon_image = "SVG/Cloud-Moon.svg";
									icon_text = icon_text + "The moon probably looks amazing tonight!" + endli;
								} else if (data.currently.icon == "hail"){ //notice that I am future proofing the image selection to make the work easier on others
									icon_image = "SVG/Cloud-Hail.svg";
									icon_text = icon_text + "Looks like it's hailing outside, be careful and bring your hard hat!" + endli;
								} else if (data.currently.icon == "thunderstorm"){
									icon_image = "SVG/Cloud-Lightning.svg";
									icon_text = icon_text + "Watch the lightning and listen to the thinder somewhere safely!" + endli;
								} else if (data.currently.icon == "tornado"){
									icon_image = "SVG/Tornado.svg";
									icon_text = icon_text + "Quickly get somewhere safe, it's going to be windy!!" + endli;
								} else {
									icon_image = "SVG/Shades.svg";
									icon_text = icon_text + "Well, erm I am not exactly sure what it's like outside... Look for a window, life is an adventure!" + endli;
								};
								//now we display the icon floated to the right
								var im = "<li class='icon-image'><img src='" + icon_image + "' width='100px' height='100px'/></li>"
								$(".card ul.left").append(im);
								$(".card ul.last").append(citynmb);
								var emptyli = "<li class='spacingli'></li>";
								$(".card ul.last").append(emptyli);
								$(".card ul.last").append(icon_text);
								
							}
						}
					});	
					
				}
			});
			
		}, errorHandler);
	};
	
	geocall();
	

	
	
	
	
});
