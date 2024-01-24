//This JS file will add info into local storage and interact with the DOM

const searchBtn = $('#search-btn');
const formEl = $('.questions-container');
const carousel = $('.carousel-container-main');
const locationInput = $('#formGroupExampleInput');

let interest = "architecture";
//$('form-check-input:checked')


//search button event listener
searchBtn.on('click', function () {
    gridContainer.empty();

    const discoverCity = $('<h1>')
    .addClass('destination-header fw-semibold pb-3')
    .text(`Discover ${locationInput.val()}`);

    gridContainer.append(discoverCity);

    searchArea(locationInput.val(), interest);
})

//function to save to local storage

$('body').on('click', '.saveBtn', function() {
     var thisBtn = $(this);
     const fav = JSON.parse(localStorage.getItem('id')) || [];
     const save = {
        id: thisBtn.data('id')
    }
     fav.push(save);
     localStorage.setItem('id', JSON.stringify(fav));
})