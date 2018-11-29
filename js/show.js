$(document).ready(function() {
    $('h1').css('cursor', 'grab');
    var swap = false;
    
    $("#description").click(function() {
        if (swap) {
            
            $(".lead").slideDown(1000);
        }
        else {
            $(".lead").slideUp(1000);
        }
        $("h1").text(function(i, oldText) {
            return oldText.indexOf("⌄") >= 0 ? '>' + oldText.slice(1) : "⌄" + oldText.slice(1);
        });
        swap = !swap;
    });
});

