// Creates the file for weather api 

$(document).ready(function(){
    $("#form-submit").submit(function(e){
        doingSearch(e);
    })
})

function doingSearch(e){
    e.preventDefault();
    let request;

   request = $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        type: "GET",
        data: {
            q: $("#city").val(),
            appid : '79d4bf887f35318f325936bf38d2e5ba',
            units : 'metric'
        }
    });
    request.done(function(response){
        formatSearch(response);
    });
}

function formatSearch(jsonObject){
    let city_name = jsonObject.name;
    let city_weather = jsonObject.weather[0].main;
    let city_temp = jsonObject.main.temp;

    $("#city-name").text(city_name);
    $("#city-weather").text(city_weather);
    $("#city-temp").text(city_temp + " °C");
}

















{/* <div id="weather-container">
    <h2>Real-time Weather Updates</h2>
    <label for="city">Enter city:</label>
    <input type="text" id="city" placeholder="City">
    <button onclick="getWeather()">Get Weather</button>

    <div id="weather-info"></div>
</div> */}

    // function getWeather() {
    //     const apiKey = '79d4bf887f35318f325936bf38d2e5ba';
    //     const city = document.getElementById('city').value;

    //     if (city === '') {
    //         alert('Please enter a city.');
    //         return;
    //     }

    //     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    //     fetch(apiUrl)
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.cod === '404') {
    //                 alert('City not found. Please enter a valid city.');
    //                 return;
    //             }

    //             const weatherInfo = `
    //                 <h3>${data.name}, ${data.sys.country}</h3>
    //                 <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
    //                 <p>Weather: ${data.weather[0].description}</p>
    //             `;

    //             document.getElementById('weather-info').innerHTML = weatherInfo;
    //         })
    //         .catch(error => {
    //             console.error('Error fetching weather data:', error);
    //             alert('An error occurred while fetching weather data. Please try again.');
    //         });
    // }