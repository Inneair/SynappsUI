$('#propertiesButton').on('click', function(){
    console.log(this)
    $(this).toggleClass('active');
    $('main .dimmer').dimmer('toggle');
});
