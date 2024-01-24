//This JS file will add info into local storage and interact with the DOM

const searchBtn = $('#search-btn');
const formEl = $('.questions-container');
const carousel = $('.carousel-container-main');
const mainContainer = $('.main-container');

//search button event listener


searchBtn.on('click', function() {
    mainContainer.empty();
    searchArea(area,interest);
    showWeather();
})