//  API key from OpenWeatherMap
const weatherapiKey = '79d4bf887f35318f325936bf38d2e5ba';
//Default city
//const city = locationInput.val();
const city = "london";


const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherapiKey}&units=metric`;

// Fetch weather data using Fetch API
function showWeather() {
    fetch(apiUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
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
    // const iconUrl = `https://openweathermap.org/img/w/${currentdata.weather[0].icon}.png`;
    // <img src="${iconUrl}" alt="Weather Icon">

    const weatherHtml = `
    <div class="custom-card">
        <h5 class="card-title-custom">${city}</h5>
        <p class="card-title-custom">${description}</p>
        <p class="card-title-custom">Temperature: ${temperature} °C</p>
    </div>
    `;

    weatherInfoElement.append(weatherHtml);
};
