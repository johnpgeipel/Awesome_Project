$(document).ready(function(){

    // User submits location
        $("#submit-btn").click("event", function() {
            event.preventDefault();
    
            
    
            var weatherMessage = [
                "Nothing",
                "We see clear skies in your area! The weather seems to be nice and light. If this sounds right, click 'confirm' to see our recommended beers to match.",
                "A few clouds in your area, but nothing to get depressed over. If this sounds right, click 'confirm' to see our recommended beers to match.",
                "We see some darker skies and maybe some drizzle. Bummer... If this sounds right, click 'confirm' to see our recommended beers to match.",
                "We see some rain or some regional weirdness in your area. It's okay to get a little weird. If this sounds right, click 'confirm' to see our recommended beers to match.",
                "We see heavy precipitation and some possible thunder in your area. Best to stay indoors. If this sounds right, click 'confirm' to see our recommended beers to match.",
                "We see some pretty heavy weather coming your way. Good time for a heavy beer. If this sounds right, click 'confirm' to see our recommended beers to match.",
                "We see some awful weather in your area. Unless you're into that kind of thing, we recommend shutting out the world with some a little more high gravity. If this sounds right, click 'confirm' to see our recommended beers to match.",
                "There is either a blizzard or a tornado outside. If it's the former, we hope you have on of these beers already in your fridge. If it's the latter, we hope you have them in your basement. If this sounds right, click 'confirm' to see our recommended beers to match."
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
            //test
    
            var userCity = $("#city-location").val();
            var apiKeyWeather = "833bd52e347bb8bdb8573f3eb16011cc";
            if (isNaN(userCity)) {
                var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q="+userCity+"&appid=" + apiKeyWeather;
                } else {
                var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?zip="+userCity+"&appid=" + apiKeyWeather;
            }
    
            // var apiKeyWeather = "833bd52e347bb8bdb8573f3eb16011cc";
            // var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q="+userCity+"&appid=" + apiKeyWeather;
            var lowABV;
            var highABV;
            var beerQueryURL;
    // AJAX from Openweathermap API
            
            $("#city-location").val("Enter city or zipcode");
    
    
            function setHighest() {
                if(weatherSeverity > weatherSeverityMax) {
                    weatherSeverityMax = weatherSeverity
                    console.log("This is the max weather severity: " + weatherSeverityMax)
                    $(".severity-score").html(weatherSeverityMax);
                    $(".message").html(weatherMessage[weatherSeverityMax])
                }
            }
    
            function setABVs() {
                if(weatherSeverityMax === 1) {
                    lowABV = 2;
                    highABV = 3.9;
                } else if (weatherSeverityMax > 1){
                    lowABV = weatherSeverityMax + 1.9;
                    highABV = weatherSeverityMax + 3;
                }
                beerQueryURL = "https://api.punkapi.com/v2/beers?&per_page=80&abv_gt=" + lowABV + "&abv_lt=" + highABV
            }
    
            
                
            $.getJSON(weatherQueryURL,function(json){
                $("#city").html(json.name);
                $("#main_weather").html(json.weather[0].main);
                $("#description_weather").html(json.weather[0].description);
                $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
                $("#temperature").html((Math.floor(((json.main.temp) * (9/5)) - 459.67)) + " º F");
                $("#humidity").html(json.main.humidity);
                console.log(json)
            });
            
    
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
                            setABVs();
                        }
                        if (weather === 801 || weather === 802) {
                            partCloudy = true;
                            weatherSeverity = 2;
                            setHighest();
                            setABVs();
                        }
                        if (weather === 803 || weather === 804) {
                            heavyCloudy = true;
                            weatherSeverity = 3;
                            setHighest();
                            setABVs();
                        }
                        if(weather === 300 || weather === 310) {
                            lightDrizz = true;
                            weatherSeverity = 3;
                            setHighest();
                            setABVs();
                        }
                        if (weather === 301 || weather === 311 || weather === 313 || weather === 321) {
                            modDrizz = true;
                            weatherSeverity = 4;
                            setHighest();
                            setABVs();
                        }
                        if (weather === 500 || weather === 520) {
                            lightRain = true;
                            weatherSeverity = 4;
                            setHighest();
                            setABVs();
                        }
                        if (weather >= 701 && weather <= 771) {
                            regionalAtmo = true;
                            weatherSeverity = 4;
                            setHighest();
                            setABVs();
                        }
                        if (weather === 302 || weather === 312 || weather === 314) {
                            sevDrizz = true;
                            weatherSeverity = 5;
                            setHighest();
                            setABVs();
                        }
                        if (weather === 501 || weather === 521 || weather === 531) {
                            modRain = true;
                            weatherSeverity = 5;
                            setHighest();
                            setABVs();
                        }    
                        if(weather === 200 || weather === 210 || weather === 230 || weather === 231) {
                            lightThun = true;
                            weatherSeverity = 5;
                            setHighest();
                            setABVs();
                        } 
                        if(weather === 201 || weather === 211 || weather === 232 || weather === 221) {
                            modThun = true;
                            weatherSeverity = 6;
                            setHighest();
                            setABVs();
                        }
                        if (weather === 502 || weather === 503 || weather === 504 || weather === 511 || weather === 522) {
                            sevRain = true;
                            weatherSeverity = 6;
                            setHighest();
                            setABVs();
                        }
                        if (weather === 600 || weather === 612 || weather === 615 || weather === 620) {
                            lightSnow = true;
                            weatherSeverity = 6;
                            setHighest();
                            setABVs();
                        }   
                        if(weather === 202 || weather === 212) {
                            sevThun = true;
                            weatherSeverity = 7;
                            setHighest();
                            setABVs();
                        } 
                        if (weather === 601 || weather === 611 || weather === 613 || weather === 616 || weather === 621) {
                            modSnow = true;
                            weatherSeverity = 7;
                            setHighest();
                            setABVs();
                        } 
                        if (weather === 602 || weather === 622) {
                            sevSnow = true;
                            weatherSeverity = 8;
                            setHighest();
                            setABVs();
                        } 
                        if (weather === 781) {
                            tornado = true;
                            weatherSeverity = 8;
                            setHighest();
                            setABVs();
                        } 
                    }
                })
    
    
    // Depending on “Weather Severity Score”, sets an ABV Range variable
    
        $("#confirm-btn").on("click", function() {
            event.preventDefault();
                console.log("Beer URL: " + beerQueryURL);
    
                
                
                $.ajax({url: beerQueryURL, method: "GET"})
                    .then(function(response) {
                        console.log(response);
            // From response, get 3 random beers
                        var beer1 = response[Math.floor(Math.random()*response.length)];
                            console.log(beer1);
                            
                            $("#recommend1").empty().append("<img src=" + beer1.image_url + ">" + "<h5>" + beer1.name + "</h5>" + "<h6>ABV: " + beer1.abv + "</h6>", "<p>" + beer1.description + "</p>");
                            // $("#pic1").empty().append("<img src=" + beer1.image_url + ">");
                        var beer2 = response[Math.floor(Math.random()*response.length)];
                            console.log(beer2);
                            $("#recommend2").empty().append("<img src=" + beer2.image_url + ">" + "<h5>" + beer2.name + "</h5>" + "<h6>ABV: " + beer2.abv + "</h6>", "<p>" + beer2.description + "</p>");
                        var beer3 = response[Math.floor(Math.random()*response.length)];
                            console.log(beer3);
                            $("#recommend3").empty().append("<img src=" + beer3.image_url + ">" + "<h5>" + beer3.name + "</h5>" + "<h6>ABV: " + beer3.abv + "</h6>", "<p>" + beer3.description + "</p>");
    
                        if (!beer1.image_url) {
                                $("#recommend1").empty().append("<img src='assets/images/empty-bottle.png'>" + "<h5>" + beer1.name + "</h5>" + "<h6>ABV: " + beer1.abv + "</h6>", "<p>" + beer1.description + "</p>");
                            };
                        if (!beer2.image_url) {
                            $("#recommend2").empty().append("<img src='assets/images/empty-bottle.png'>" + "<h5>" + beer2.name + "</h5>" + "<h6>ABV: " + beer2.abv + "</h6>", "<p>" + beer2.description + "</p>");
                        };
                        if (!beer3.image_url) {
                            $("#recommend3").empty().append("<img src='assets/images/empty-bottle.png'>" + "<h5>" + beer3.name + "</h5>" + "<h6>ABV: " + beer3.abv + "</h6>", "<p>" + beer3.description + "</p>");
                        };
                        
                }
            )
        })
        
    
            })
            
        })

