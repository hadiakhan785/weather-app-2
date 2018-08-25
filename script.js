function initialize() {
    $("#user-search").keyup(function(event){
        if(event.keyCode === 13){
            $("#button-addon2").click();
        }
    });
        
}


function showWeather() {
    let cityName = document.querySelector(".user-input").value;

    $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2397c981714f508680c83f4e4d49a998&units=metric`,

        success: function (data) {
            document.querySelector(".weather-info").style.display = "block";
            document.querySelector(".error-message").style.display = `none`;            
            document.querySelector(".city-name").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp);
            document.querySelector(".weather-name").innerHTML = data.weather[0].main;
            document.querySelector(".temp-min").innerHTML = Math.round(data.main.temp_min);
            document.querySelector(".temp-max").innerHTML = Math.round(data.main.temp_max);
    
            let updateTime = new Date();
            let newUpdate = updateTime.toLocaleString();
            document.querySelector(".update-time").innerHTML = newUpdate;

            let calcTime = new Date();
            let sunriseTime = new Date(data.sys.sunrise * 1000);
            let sunsetTime = new Date(data.sys.sunset * 1000);

            if(calcTime > sunriseTime && calcTime < sunsetTime){
                document.querySelector("body").style.background = `linear-gradient(to bottom, yellow, orange)`;
                document.querySelector("body").style["background-position"] = `bottom`;                
                document.querySelector("body").style["background-attachment"] = `fixed`;
                document.querySelector("body").style.color = `black`;                
                
            }else {
                document.querySelector("body").style.background = `linear-gradient(to bottom, blue, black)`;                
                document.querySelector("body").style["background-position"] = `bottom`;                
                document.querySelector("body").style["background-attachment"] = `fixed`;
                document.querySelector("body").style.color = `white`;                
            }

            let weatherName = data.weather[0].main;

            switch(weatherName){
                case "Clouds":
                document.querySelector(".weather-icon").innerHTML = `<i class="wi wi-cloud"></i>`;
                break;

                case "Smoke":
                document.querySelector(".weather-icon").innerHTML = `<i class="wi wi-smoke"></i>`;
                break;

                case "Fog":
                document.querySelector(".weather-icon").innerHTML = `<i class="wi wi-fog"></i>`;
                break;

                case "Rain":
                document.querySelector(".weather-icon").innerHTML = `<i class="wi wi-rain"></i>`;
                break;

                
                case "Mist":
                document.querySelector(".weather-icon").innerHTML = `<i class="wi wi-windy"></i>`;
                break;


                case "Smog":
                document.querySelector(".weather-icon").innerHTML = `<i class="wi wi-smog"></i>`;
                break;

                
                case "Clear":
                if(calcTime < sunsetTime){
                document.querySelector(".weather-icon").innerHTML = `<i class="wi wi-day-sunny"></i>`;                    
                } else {
                document.querySelector(".weather-icon").innerHTML = `<i class="wi wi-night-clear"></i>`;                    
                }
                break;

                case "Partly Cloudy":
                if(calcTime < sunsetTime){
                document.querySelector(".weather-icon").innerHTML = `<i class="wi wi-day-cloudy"></i>`;                    
                } else {
                document.querySelector(".weather-icon").innerHTML = `<i class="wi wi-night-alt-clear"></i>`;                    
                }
                break;

                case "Haze":
                document.querySelector(".weather-icon").innerHTML = `<i class="wi wi-dust"></i>`;
                break;

                
                case "Cloudy":
                document.querySelector(".weather-icon").innerHTML = `<i class="wi wi-cloudy"></i>`;
                break;

                
                case "Storm":
                document.querySelector(".weather-icon").innerHTML = `<i class="wi wi-sandstorm"></i>`;
                break;

                case "Thunderstorm":
                document.querySelector(".weather-icon").innerHTML = `<i class="wi wi-thunderstorm"></i>`;
                break;
                
            }

            document.querySelector(".humidity").innerHTML = data.main.humidity;
            document.querySelector(".cloudiness").innerHTML = data.clouds.all;
            document.querySelector(".wind").innerHTML = data.wind.speed;

            document.querySelector(".sunrise-time").innerHTML = sunriseTime.toLocaleString();
            document.querySelector(".sunset-time").innerHTML = sunsetTime.toLocaleString();

        },

        error: function (err) {
            document.querySelector(".error-message").style.display = `block`;
            document.querySelector("body").style.background = `linear-gradient(to bottom, red, white)`;
            document.querySelector(".weather-info").style.display = `none`;            
            document.querySelector(".error-message").innerHTML = err.responseJSON.message;
        }
    })
}
