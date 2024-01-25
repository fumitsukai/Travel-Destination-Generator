//This JS file will add info into local storage and interact with the DOM

const searchBtn = $('#search-btn');
const locationInput = $('#formGroupExampleInput');
//const dep_date = $('.datepicker').datepicker("getDate");

let interests = $('.form1');
let interest;
let selectedDate;

interests.change(function () {
    interest = $(this).val();
})

//Event handler for the 'departure_date' change
$('#departure_date').change(function () {
    selectedDate = String($(this).val());
    console.log('Selected Departure Date:', selectedDate);
});

// Datepicker initialization
$('.datepicker').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
});


//search button event listener
searchBtn.on('click', function () {
    gridContainer.empty();

    const discoverCity = $('<h1>')
        .addClass('destination-header fw-semibold pb-3')
        .text(`Discover ${locationInput.val()}`);
    console.log(interest);
    gridContainer.append(discoverCity);
    showWeather();
    displayFlightData(selectedDate);
    searchArea(locationInput.val(), interest);

})

//function to save to local storage

$('body').on('click', '.saveBtn', function () {
    var thisBtn = $(this);
    const fav = JSON.parse(localStorage.getItem('id')) || [];
    const save = {
        id: thisBtn.data('id')
    }
    fav.push(save);
    localStorage.setItem('id', JSON.stringify(fav));
});

function addFavBtnData() {
    const favdata = JSON.parse(localStorage.getItem('id'));
    for (data in favdata) {
        getAPI('xid/' + favdata[data].id)
            .then(data => {
                const favBtn = $('<button>')
                    .addClass('dropdown-item favorite')
                    .text(data.name)
                    .attr('data-id', data.xid)
                    .attr('data-toggle', 'modal')
                    .attr('data-target', 'favorite-button');
                $('#favBtn').append(favBtn);
            })
    }
}
addFavBtnData();

$('#favBtn').on('click', '.favorite', function () {
    const thisBtn = $(this);
    getAPI('xid/' + thisBtn.data('id'))
        .then(data => {
        //     const modal = `
        // <div class="modal fade" id="favorite-button" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        // <div class="modal-dialog modal-dialog-centered" role="document">
        // <div class="modal-content">
        // <div class="modal-header">
        // <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        // </div>
        // <div class="modal-body">
        // ${data.wikipedia_extracts.text}
        // </div>
        // <div class="modal-footer">
        // </div>
        // </div>
        // </div>
        // </div>
        // </div>
        // `;
        // $('body').append(modal);
        gridContainer.empty();
        const prwImg = $('<img>')
        .addClass('rounded float-start rowImg');
        prwImg.attr('src', data.preview.source);
        const name = $('<p>')
        .text(data.name)
        .addClass('fs-4 text-start ps-4 poiName fw-bold');
         const description = $('<p>')
        .text(data.wikipedia_extracts.text)
        .addClass('text-break lh-md text-start ps-4 mt-3');
        colweather.append(prwImg);
        colflight.append(name, description);
        $('.main-container').append(colweather,colflight);
        })
})