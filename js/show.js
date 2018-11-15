$(document).ready(function() {
    $('.h1').css('cursor', 'grab');
    var swap = true;
    $("h1").click(function() {
        if (swap) $(".lead").slideDown(1000);
        else $(".lead").slideUp(1000);
        swap = !swap;
    });
});