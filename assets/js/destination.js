const APIkey = `5ae2e3f221c38a28845f05b6245b5bfa6f7e4dad55c2a379dc99093c`;
// from index.html
const dropdownMenu = $('#dropdown-menu');

//from destinations.html

const cardsContainer = $('#cards-container');
const cardRowOne = $('#card-row-one');

//will need to use geolocation to grab the lat and log by name 
//will need to use radius to grab all the things to do in the area
//will need to use xid to grab pictures and descriptions from the objects created by the radius method
//need a function to grab api based on method and query

function getAPI(method, query) {
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

//console.log(geolocation.then(data => console.log(data.lon)));

//will need a function to get the coordinaties of the selected area
//will need to get from input the area

let area = 'United';
let limit = 3;
let interest = "architecture"

function getCoordinates(area) {
    const geolocation = getAPI('geoname', `&name=${area}`).then(data => {
        console.log(data);
        const coordinates = {
            lon: data.lon,
            lat: data.lat
        }
        return coordinates;
    });
    return geolocation;
}

getCoordinates(area).then(data => console.log(data.lon,data.lat));

//do a radius search of the area
function searchArea(area, interest) {
    //get lon and lat from the selected area
    getCoordinates(area)
        .then(data => {
            let lon = data.lon;
            let lat = data.lat;
            //fetch data from api
            getAPI('radius', `&radius=1000&limit=${limit}&rate=3&lon=${lon}&lat=${lat}&format=json&kinds=${interest}`)
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        getAPI('xid/' + data[i].xid)
                            .then(data => {
                                console.log(data);
                                createCard(data);
                            })
                    }
                })
        })
}

//need to use xid to get detailed info about the object

function goToLocation(id) {
    getAPI('xid/' + id).then(data => {
        return data;
    })
}

searchArea(area, interest);

//function to create destination cards
//it will need a picture ,short description and a button
function createCard(data) {
    const cardCol = $('<div>').addClass('col-md-4');
    const cardDiv = $('<div>').addClass('card');
    const cardBody = $('<div>').addClass('card-body');
    const prwImg = $('<img>').addClass('card-img-top');
    const cardTitle = $('<h5>').addClass('card-title');
    //create img and append to div
    if(data.preview) {
    prwImg.attr('src', data.preview.source);
    } else prwImg.attr('src', "./assets/images/Ecuador.jpg");
    //create description element
    const descriptionEl = $('<p>').addClass('card-text').text(data.wikipedia_extracts.text);
    //create button
    const exploreBtn = $('<button>').addClass('btn btn-primary').text('Explore');
    cardTitle.text(`${data.address.country}/${data.address.city}`);
    cardBody.append(cardTitle,descriptionEl,exploreBtn);
    cardDiv.append(prwImg,cardBody);
    cardCol.append(cardDiv);
    cardRowOne.append(cardCol);
}