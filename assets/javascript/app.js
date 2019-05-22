$(document).ready(function(){

// User submits location
    $("#submit-btn").click("event", function() {
        event.preventDefault();

        var weatherMessage = [
            "Nothing",
            "We see clear skies in your area! The weather seems to be nice and light. If this sounds right, click 'confirm' to see our recommended beers to match.",
            "A few clouds in your area, but nothing to get depressed over. How about one of these beers to match?",
            "We see some darker skies and maybe some drizzle. Bummer... how about one of these beers to match?",
            "We see some rain or some regional weirdness in your area. It's okay to get a little weird. How about one of these beers?",
            "We see heavy precipitation and some possible thunder in your area. Best to stay indoors with one of these beers!",
            "We see some pretty heavy weather coming your way. Good time for a heavy beer. How about one of these?",
            "We see some awful weather in your area. Unless you're into that kind of thing, we recommend shutting out the world with one of these high gravity beers.",
            "There is either a blizzard or a tornado outside. If it's the former, we hope you have on of these beers already in your fridge. If it's the latter, we hope you have them in your basement."
        ]

        var weatherSeverity = 0;

        var weatherSeverityMax = 0;

        var lightThun = false;
        var modThun = false;
        var sevThun = false;
        var lightDrizz = false;
        var modDrizz = false;
        var sevDrizz = false;
        var lightSnow = false;
        var modSnow = false;
        var regionalAtmo = false;
        var sevSnow = false;
        var lightRain = false;
        var modRain = false;
        var sevRain = false;
        var tornado = false;
        var clearSkies = false;
        var partCloudy = false;
        var heavyCloudy = false;

        var userCity = $("#city-location").val();

        var apiKeyWeather = "833bd52e347bb8bdb8573f3eb16011cc";
        var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q="+userCity+"&appid=" + apiKeyWeather;
// AJAX from Openweathermap API

        function setHighest() {
            if(weatherSeverity > weatherSeverityMax) {
                weatherSeverityMax = weatherSeverity
                console.log("This is the max weather severity: " + weatherSeverityMax)
            }
        }

        $.ajax({url: weatherQueryURL,method: "GET"})
            .then(function(response) {
                console.log(response);
                // From response, retrieves and logs weather and temperature (possible other)
                for(var i = 0; i < response.weather.length; i++) {
                    var weather = response.weather[i].id;
                    console.log(response.weather[i].id);
                    if (weather === 800) {
                        clearSkies = true;
                        weatherSeverity = 1;
                        setHighest();
                        console.log(clearSkies);
                        console.log("clearSkies");
                        console.log(weatherSeverity);
                    }
                    if (weather === 801 || weather === 802) {
                        partCloudy = true;
                        weatherSeverity = 2;
                        setHighest();
                        console.log(partCloudy);
                        console.log("partCloudy");
                        console.log(weatherSeverity);
                    }
                    if (weather === 803 || weather === 804) {
                        heavyCloudy = true;
                        weatherSeverity = 3;
                        setHighest();
                        console.log(heavyCloudy);
                        console.log("heavyCloudy");
                        console.log(weatherSeverity);
                    }
                    if(weather === 300 || weather === 310) {
                        lightDrizz = true;
                        weatherSeverity = 3;
                        setHighest();
                        console.log(lightDrizz);
                        console.log("lightDrizz")
                        console.log(weatherSeverity);
                    }
                    if (weather === 301 || weather === 311 || weather === 313 || weather === 321) {
                        modDrizz = true;
                        weatherSeverity = 4;
                        setHighest();
                        console.log(modDrizz);
                        console.log("modDrizz");
                        console.log(weatherSeverity);
                    }
                    if (weather === 500 || weather === 520) {
                        lightRain = true;
                        weatherSeverity = 4;
                        setHighest();
                        console.log(lightRain);
                        console.log("lightRain");
                        console.log(weatherSeverity);
                    }
                    if (weather >= 701 && weather <= 771) {
                        regionalAtmo = true;
                        weatherSeverity = 4;
                        setHighest();
                        console.log(regionalAtmo);
                        console.log("regionalAtmo");
                        console.log(weatherSeverity);
                    }
                    if (weather === 302 || weather === 312 || weather === 314) {
                        sevDrizz = true;
                        weatherSeverity = 5;
                        setHighest();
                        console.log(sevDrizz);
                        console.log("sevDrizz");
                        console.log(weatherSeverity);
                    }
                    if (weather === 501 || weather === 521 || weather === 531) {
                        modRain = true;
                        weatherSeverity = 5;
                        setHighest();
                        console.log(modRain);
                        console.log("modRain");
                        console.log(weatherSeverity);
                    }    
                    if(weather === 200 || weather === 210 || weather === 230 || weather === 231) {
                        lightThun = true;
                        weatherSeverity = 5;
                        setHighest();
                        console.log(lightThun);
                        console.log("lightThun");
                        console.log(weatherSeverity);
                    } 
                    if(weather === 201 || weather === 211 || weather === 232 || weather === 221) {
                        modThun = true;
                        weatherSeverity = 6;
                        setHighest();
                        console.log(modThun);
                        console.log("modThun");
                        console.log(weatherSeverity);
                    }
                    if (weather === 502 || weather === 503 || weather === 504 || weather === 511 || weather === 522) {
                        sevRain = true;
                        weatherSeverity = 6;
                        setHighest();
                        console.log(sevRain);
                        console.log("sevRain");
                        console.log(weatherSeverity);
                    }
                    if (weather === 600 || weather === 612 || weather === 615 || weather === 620) {
                        lightSnow = true;
                        weatherSeverity = 6;
                        setHighest();
                        console.log(lightSnow);
                        console.log("lightSnow");
                        console.log(weatherSeverity);
                    }   
                    if(weather === 202 || weather === 212) {
                        sevThun = true;
                        weatherSeverity = 7;
                        setHighest();
                        console.log(sevThun);
                        console.log("sevThun");
                        console.log(weatherSeverity);
                    } 
                    if (weather === 601 || weather === 611 || weather === 613 || weather === 616 || weather === 621) {
                        modSnow = true;
                        weatherSeverity = 7;
                        setHighest();
                        console.log(modSnow);
                        console.log("modSnow");
                        console.log(weatherSeverity);
                    } 
                    if (weather === 602 || weather === 622) {
                        sevSnow = true;
                        weatherSeverity = 8;
                        setHighest();
                        console.log(sevSnow);
                        console.log("sevSnow");
                        console.log(weatherSeverity);
                    } 
                    if (weather === 781) {
                        tornado = true;
                        weatherSeverity = 8;
                        setHighest();
                        console.log(tornado);
                        console.log("tornado");
                        console.log(weatherSeverity);
                    } 




                }

            })


// Create variable to hold “Weather Severity Score” (Scale of 1 to 9)
	
	// If, else if statements

// Display “Weather Severity Score” to user

// Depending on “Weather Severity Score”, sets an ABV Range variable

// AJAX from PunkAPI based on “abv” endpoint (ABV Range variable)

// Return and display 10 random beers with abvs within a range that matches the “Weather Severity Score”

// Display name of beer, brewery, image (if exists), and description (if exists) ! 

    })
})