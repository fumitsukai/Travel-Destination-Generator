const flightapiKey = "65b2de243f45ced3a293c290";

const container = $('<div>').addClass('container text-center');
const row = $('<div>').addClass('row myRow text-center');
const colweather = $('<div>').addClass('col-md-6 col-sm-12'); // Equal width on medium screens
const colflight = $('<div>').addClass('col-md-6 col-sm-12 d-flex flex-column'); // Equal width on medium screens
row.append(colweather, colflight);
container.append(row);

function displayFlightData(date) {
    
    // Retrieve user input
    const departure_date = formatDepartureDate(date);
    // const rawDepartureDate = $('#departure_date').val();
    // console.log('Raw Departure Date:', rawDepartureDate);

    // Build API URL
    const apiURL = buildApiURL(flightapiKey, departure_date);

    fetch(apiURL).then(function (response) {
        return response.json();
    }).then(function (data) {
        
        // Display the result

        displayResult(data);
        $('#spinner').hide();

    }).catch(function (error) {
        console.error('Error with fetching travel options', error);
    })
}


// Function to build API URL
function buildApiURL(flightapiKey, departure_date) {
    const baseApiURL = 'https://api.flightapi.io/onewaytrip';
    return `${baseApiURL}/${flightapiKey}/HEL/HEL/${departure_date}/1/0/0/Economy/USD`;
}


function displayResult(data) {

    const agents = data.agents || [];
    if (agents.length > 0) {

        const randomIndex = Math.floor(Math.random() * agents.length);
        const randomAgentName = agents[randomIndex].name;
        const resultString = `
        <div class="custom-card flight-card"> 
            <div>
                <h3 class="card-title-custom">Booking Provider: </h3>
            </div>
            <div class="card-content-custom">
                <p class="card-title-custom">${randomAgentName}</p>
            </div>
        </div>
    `;

        colflight.append(resultString);
    }
     
    }


// Function to format departure date
function formatDepartureDate(rawDate) {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

