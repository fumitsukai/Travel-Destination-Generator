const apiKey = "65a98f671a6d1f8ec51779f1";
const apiURL = `https://api.flightapi.io/onewaytrip/${apiKey}/HEL/OUL/2024-05-20/1/0/0/Economy/USD`;

// Function to make API requests using fetch
function fetchData(apiURL) {
    return fetch(apiURL)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("HTTP error, Status: " + response.status);
            }
            return response.json();
        })
        .catch(function(error) {
            console.error("Error fetching data from " + apiURL + ": " + error);
            return null;
        });
}

// Make the first API request
fetchData(apiURL)
    .then(function(data) {
        console.log("Data from the first request:", data);

        // Make the second API request (same URL, same parameters)
        return fetchData(apiURL);
    })
    .then(function(data) {
        console.log("Data from the second request:", data);
    })
    .catch(function(err) {
        console.log("Error:", err);
    });

