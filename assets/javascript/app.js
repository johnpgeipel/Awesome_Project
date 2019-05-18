$(document).ready(function(){

// User submits location
    $("#submit-btn").click("event", function() {
        event.preventDefault();
        var lightThun = false;
        var modThun = false;
        var sevThun = false;
        var lightDrizz = false;
        var modDrizz = false;
        var sevDrizz = false;
        var userCity = $("#city-location").val();
        var userZip = $("#zipcode-location").val();
        var apiKeyWeather = "833bd52e347bb8bdb8573f3eb16011cc";
        var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q="+userCity+"&appid=" + apiKeyWeather;
// AJAX from Openweathermap API

        $.ajax({url: weatherQueryURL,method: "GET"})
            .then(function(response) {
                console.log(response);
                // From response, retrieves and logs weather and temperature (possible other)
                for(var i = 0; i < response.weather.length; i++) {
                    var weather = response.weather[i].id;
                    console.log(response.weather[i].id);
                    if(weather === 200 || weather === 210 || weather === 230 || weather === 231) {
                        lightThun = true;
                        console.log(lightThun);
                        console.log("lightThun")
                    } else if (weather === 201 || weather === 211 || weather === 232 || weather === 221) {
                        modThun = true;
                        console.log(modThun);
                        console.log("modThun");
                    } else if (weather === 202 || weather === 212) {
                        sevThun = true;
                        console.log(sevThun);
                        console.log("sevThun");
                    } else if(weather === 300 || weather === 310) {
                        lightDrizz = true;
                        console.log(lightDrizz);
                        console.log("light")
                    } else if (weather === 301 || weather === 311 || weather === 313 || weather === 321) {
                        modDrizz = true;
                        console.log(modDrizz);
                        console.log("modDrizz");
                    } else if (weather === 302 || weather === 312 || weather === 314) {
                        sevDrizz = true;
                        console.log(sevDrizz);
                        console.log("sevDrizz");
                    }
                } 

                })

            })


// Create variable to hold “Weather Severity Score” (Scale of 1 to 9)
	
	// If, else if statements

// Display “Weather Severity Score” to user

// Depending on “Weather Severity Score”, sets an ABV Range variable

// AJAX from PunkAPI based on “abv” endpoint (ABV Range variable)

// Return and display 10 random beers with abvs within a range that matches the “Weather Severity Score”

// Display name of beer, brewery, image (if exists), and description (if exists) ! 


});