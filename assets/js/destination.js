const APIkey = `5ae2e3f221c38a28845f05b6245b5bfa6f7e4dad55c2a379dc99093c`;
const geolocation = `https://api.opentripmap.com/0.1/en/places/geoname?name=london&apikey=${APIkey}`;


// fetch(geolocation)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         const lon = data.lon;
//         const lat = data.lat;

//         const queryURL = `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&limit=5&rate=2&format=json&lon=${lon}&lat=${lat}&apikey=${APIkey}`;

//         fetch(queryURL)
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (data) {
//                 console.log(data);
//             })

//     })


    //will need to use geolocation to grab the lat and log by name 
    //will need to use radius to grab all the things to do in the area
    //will need to use xid to grab pictures and descriptions from the objects created by the radius method
    //need a function to grab api based on method and query

    function getAPI (method, query) {
        var apiURL = `https://api.opentripmap.com/0.1/en/places/${method}?apikey=${APIkey}`;
        if (query !== undefined) {
            apiURL += "&" + query;
        }
        return fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            return data;
        })
    }

    const data = getAPI('geoname','&name=London').then(data => console.log(data));
    
