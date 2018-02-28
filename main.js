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



