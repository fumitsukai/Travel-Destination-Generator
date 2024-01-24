//This JS file will add info into local storage and interact with the DOM

const searchBtn = $('#search-btn');
const locationInput = $('#formGroupExampleInput');
//const dep_date = $('.datepicker').datepicker("getDate");

let interests = $('.form-check-input');
let interest;
let selectedDate;

interests.change(function() {
    interest = $(this).val();
})

//Event handler for the 'departure_date' change
 $('#departure_date').change(function () {
     selectedDate = String($(this).val());
     console.log('Selected Departure Date:', selectedDate);
 });

  // Datepicker initialization
  $('.datepicker').datepicker({
      format: 'yyyy-mm-dd',
      autoclose: true,
  });

//search button event listener
searchBtn.on('click', function () {
    gridContainer.empty();

    const discoverCity = $('<h1>')
        .addClass('destination-header fw-semibold pb-3')
        .text(`Discover ${locationInput.val()}`);
        console.log(interest);

    gridContainer.append(discoverCity);
    searchArea(locationInput.val(), interest);
    console.log(selectedDate);
    //displayFlightData(selectedDate);
})

//function to save to local storage

$('body').on('click', '.saveBtn', function () {
    var thisBtn = $(this);
    const fav = JSON.parse(localStorage.getItem('id')) || [];
    const save = {
        id: thisBtn.data('id')
    }
    fav.push(save);
    localStorage.setItem('id', JSON.stringify(fav));

})