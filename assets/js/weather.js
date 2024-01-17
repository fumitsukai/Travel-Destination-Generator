// Creates the file for weather api 

// initilization variables 
const apiKey = '79d4bf887f35318f325936bf38d2e5ba';

const clickButton = document.getElementById('click-button');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');

searchButton.addEventListener('click', function (e) {
    e.preventDefault();
    getWeatherForecast(searchInput.value);
});

function getWeatherForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayFiveDayForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}