//map API
const travelAPIkey = `5ae2e3f221c38a28845f05b6245b5bfa6f7e4dad55c2a379dc99093c`;
// from index.html

let limit = 6;

let radius;
$('.form2').change(function () {
    radius = $(this).val();
})

//from destinations.html

const gridContainer = $('.main-container');

//will need to use geolocation to grab the lat and log by name 
//will need to use radius to grab all the things to do in the area
//will need to use xid to grab pictures and descriptions from the objects created by the radius method
//need a function to grab api based on method and query

function getAPI(method, query) {
    var apiURL = `https://api.opentripmap.com/0.1/en/places/${method}?apikey=${travelAPIkey}`;
    if (query !== undefined) {
        apiURL += "&" + query;
    }
    return fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            return data;
        })
}


//will need a function to get the coordinaties of the selected area
//will need to get from input the area

function getCoordinates(area) {
    const geolocation = getAPI('geoname', `&name=${area}`).then(data => {
        const coordinates = {
            lon: data.lon,
            lat: data.lat
        }
        return coordinates;
    });
    return geolocation;
}

//do a radius search of the area
function searchArea(area, interest) {
    //get lon and lat from the selected area
    getCoordinates(area)
        .then(data => {
            let lon = data.lon;
            let lat = data.lat;
            //fetch data from api
            getAPI('radius', `&radius=${radius}&limit=${limit}&rate=3&lon=${lon}&lat=${lat}&format=json&kinds=${interest}`)
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        getAPI('xid/' + data[i].xid)
                            .then(data => {
                                createGrid(data);
                            })
                    }
                })
        })
}

//create grid for locations and descriptions
//need one row with 2 col, 1 col for the pic,1 for the description

function createGrid(data) {
    //create a row with 2 col
    const rowDiv = $('<div>')
        .addClass('row myRow text-center');
    const colPic = $('<div>')
        .addClass('col-md-3 col-sm-12');
    const colDescr = $('<div>')
        .addClass('col-md-9 col-sm-12 d-flex flex-column');
    //add image and text from api
    const prwImg = $('<img>')
        .addClass('rounded float-start rowImg');
    if (data.preview) {
        prwImg.attr('src', data.preview.source);
    } else prwImg.attr('src', "./assets/images/Paris.jpg");
    const name = $('<p>')
        .text(data.name)
        .addClass('fs-4 text-lg-start pt-sm-2 ps-lg-4 poiName fw-bold');
    const description = $('<p>')
        .text(data.wikipedia_extracts.text)
        .addClass('text-break lh-md text-lg-start ps-lg-4 mt-3');
    const saveBtn = $('<button>')
        .addClass('btn saveBtn float-start ms-lg-4 mt-auto')
        .text('Save').attr('data-id', data.xid);
    const iconFA = $('<i>').addClass('fa fa-map-marker ps-2');
    const address = $('<p>')
        .text(`${data.address.city},${data.address.house},${data.address.house_number},${data.address.pedestrian},${data.address.postcode}`)
        .addClass('text-break lh-md text-lg-start ps-lg-4 mt-3');
    address.append(iconFA);
    //append 
    container.append(rowDiv);
    rowDiv.append(colPic, colDescr);
    colPic.append(prwImg);
    colDescr.append(name, description, address, saveBtn);
    gridContainer.append(container);
}

function createGridNoBtn(data) {
    //create a row with 2 col
    const rowDiv = $('<div>')
        .addClass('row myRow text-center');
    const colPic = $('<div>')
        .addClass('col-md-3 col-sm-12');
    const colDescr = $('<div>')
        .addClass('col-md-9 col-sm-12 d-flex flex-column');
    //add image and text from api
    const prwImg = $('<img>')
        .addClass('rounded float-start rowImg');
    if (data.preview) {
        prwImg.attr('src', data.preview.source);
    } else prwImg.attr('src', "./assets/images/Paris.jpg");
    const name = $('<p>')
        .text(data.name)
        .addClass('fs-4 text-lg-start pt-sm-2 ps-lg-4 poiName fw-bold');
    const description = $('<p>')
        .text(data.wikipedia_extracts.text)
        .addClass('text-break lh-md text-lg-start ps-lg-4 mt-3');
    const iconFA = $('<i>').addClass('fa fa-map-marker ps-2');
    const address = $('<p>')
        .text(`${data.address.city},${data.address.house},${data.address.house_number},${data.address.pedestrian},${data.address.postcode}`)
        .addClass('text-break lh-md text-lg-start ps-lg-4 mt-3');
    address.append(iconFA);
    //append 
    container.append(rowDiv);
    rowDiv.append(colPic, colDescr);
    colPic.append(prwImg);
    colDescr.append(name, description, address);
    gridContainer.append(container);
}
