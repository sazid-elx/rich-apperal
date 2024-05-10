$('span#close-drawer').on('click', function () {
    $('.cart-drawer').removeClass('opened'); 
});

$('#open-cart').on('click', function () {
    $('.cart-drawer').addClass('opened'); 
});
