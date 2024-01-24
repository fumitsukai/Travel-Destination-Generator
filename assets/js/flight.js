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

});

