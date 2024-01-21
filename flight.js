const apiKey = "65ad178e83315ee42281d5d4";
const apiURL = `https://api.flightapi.io/onewaytrip/${apiKey}/HEL/OUL/2024-05-20/1/0/0/Economy/USD`;

// Function to make API requests using fetch
async function fetchData(apiURL) {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error("HTTP error, Status: " + response.status);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data from " + apiURL + ": " + error);
        return null;
    }
}

// Add click event listener to the button using class selector
document.querySelector('.btn.btn-primary').addEventListener('click', function () {
    // Make the first API request
    fetchData(apiURL)
        .then(function (data) {
            console.log("Data from the first request:", data);

            // Make the second API request (same URL, same parameters)
            return fetchData(apiURL);
        })
        .then(function (data) {
            console.log("Data from the second request:", data);
        })
        .catch(function (err) {
            console.log("Error:", err);
        });
});

//