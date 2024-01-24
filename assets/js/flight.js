$(document).ready(function () {
    const apiKey = "65b102486c73229c59781bc2";

    // Datepicker initialization
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
    });

    // Event handler for the 'search-btn' 
    $('#search-btn').click(function () {
        // Retrieve user input
        const departure_date = formatDepartureDate($('#departure_date').val());
        // const rawDepartureDate = $('#departure_date').val();
        // console.log('Raw Departure Date:', rawDepartureDate);

        // Build API URL
        const apiURL = buildApiURL(apiKey, departure_date);

        fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (data) {

            console.log('Form Submitted');
            console.log(data);
            

            // Display the result

            displayResult(data);

        }).catch(function (error) {
            console.error('Error with fetching travel options', error);
        } )
    });

    // Event handler for the 'departure_date' change
    $('#departure_date').change(function () {
        const selectedDate = String($(this).val());
        console.log('Selected Departure Date:', selectedDate);
    });

    // Function to build API URL
    function buildApiURL(apiKey, departure_date) {
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

    // Function to format departure date
    function formatDepartureDate(rawDate) {
        const date = new Date(rawDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
});
