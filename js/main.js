/******Document Ready */
$(document).ready(function(){
    // Build initial d3 chart
    $("#allAges").trigger("click");
    
    //set nav position:
    var width=$(window).width();
    var x_offset=(width-1020)/2;
    console.log(width);
    console.log(x_offset);

    if(width>1020){
        $(".fixed").css({left:x_offset})
        console.log('wide');
        }else{
        $(".fixed").css({left:0})
        };
    

    //call fadeIn function
    scrollFadeIn();
    stickNav();

    //navigation button
    $('.navButton').on('click', function() {
        console.log("I'm alive");
        $('.content').toggleClass('isOpen');
      });
});    

var app={};

function Utils() {

}

Utils.prototype = {
    constructor: Utils,
    isElementInView: function (element, fullyInView) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
};

var Utils = new Utils();

var isElementInView = Utils.isElementInView($('#diagnosis'));

if (isElementInView) {
    console.log('in view');
} else {
    console.log('out of view');
}



