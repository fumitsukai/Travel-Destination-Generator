APIkey = `5ae2e3f221c38a28845f05b6245b5bfa6f7e4dad55c2a379dc99093c`;
queryURL = `https://api.opentripmap.com/0.1/en/places/autosuggest?${APIkey}`;

fetch(queryURL)
.then(function(response) {
    return response.json();
})
.then(function(data){ 
    console.log(data);
})

