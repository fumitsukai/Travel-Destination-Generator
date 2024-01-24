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

function displayResult(data) {
  
    const agents = data.agents || [];
    const agentNames = agents.map(agent => agent.name);

    const resultString = agentNames.map(function (name) { 

        return '<li>' + name + '</li>'; }).join('') + '</ul>';

    $('#result').html(resultString);

}

// Event handler for Airport Code
$('#fetchButton').click(function () {
    const arrivalAirportCode = $('#arrival_airport_code').val().trim();

    if (arrivalAirportCode.length < 3) {
        alert('Please enter a valid arrival airport code (at least 3 characters).');
        return;
    }

    // Submit the form
    submitForm();
});

// Function to submit the form
function submitForm() {
    console.log('Form Submitted');
}

 // Function to format departure date
 function formatDepartureDate(rawDate) {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

});


