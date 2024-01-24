$(document).ready(function () {
    const apiKey = "65b102486c73229c59781bc2";

    // Event handler for the 'arrival_airport_code' input
    $('#arrival_airport_code').on('input', function () {
        let inputValue = $(this).val();
        inputValue = inputValue.replace(/[^A-Z]/g, '');
        inputValue = inputValue.slice(0, 3);
        $(this).val(inputValue);
    }); 

// Datepicker
$('.datepicker').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
});

// Event handler for the 'fetchButton' 
$('#fetchButton').click(function () {
    // Retrieve user input
    const arrival_airport_code = String($('#arrival_airport_code').val());
    const departure_date = formatDepartureDate($('#departure_date').val());
});

// Build API URL
const apiURL = buildApiURL(apiKey, arrival_airport_code, departure_date);

fetch(apiURL).then(function (response) {
    return response.json();
}).then(function (data) {

    console.log(data);

    // Display the result

    displayResult(data);

}).catch(function (error) {
    console.error('Error with fetching travel options', error);
});

 // Event handler for the 'departure_date' change
 $('#departure_date').change(function () {
    const selectedDate = String($(this).val());
});

// Function to build API URL
function buildApiURL(apiKey, arrival_airport_code, departure_date) {
    const baseApiURL = 'https://api.flightapi.io/onewaytrip';
    return `${baseApiURL}/${apiKey}/HEL/HEL/${departure_date}/1/0/0/Economy/USD`;
}

});


