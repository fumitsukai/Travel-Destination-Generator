//  API key from OpenWeatherMap
const weatherapiKey = '79d4bf887f35318f325936bf38d2e5ba';
//Default city
//const city = locationInput.val();
const city = $('#formGroupExampleInput');

// Fetch weather data using Fetch API
function showWeather() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.val()}&appid=${weatherapiKey}&units=metric`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(city.val())
            displayWeatherInfo(data);
        })
        .catch(function (error) {
            console.error('Error fetching weather data:', error);
        });
}
// Function to display weather information in the card
function displayWeatherInfo(currentdata) {
    const weatherInfoElement = colweather;

    const temperature = currentdata.main.temp;
    const description = currentdata.weather[0].description;
    const iconUrl = `https://openweathermap.org/img/wn/${currentdata.weather[0].icon}.png`;

//<img src="${iconUrl}" class="weather-img" alt="Weather Icon"></img>
    const weatherHtml = `
    <div class="custom-card mb-2">
    
    <p class="card-title-custom">${description}</p>
    <p class="card-title-custom">Temperature: ${temperature} °C</p>
    </div>
    `;

    weatherInfoElement.append(weatherHtml);
};
