/** Scrolling Fanciness **/
// Init ScrollMagic
function scrollFadeIn() {
    var controller = new ScrollMagic.Controller();
    var time = 1000;
    var margin = 100;
    var fadeScene = new ScrollMagic.Scene({
            triggerElement: '#startfade1',
            triggerHook: 0.9,
            reverse: false
        })
        .on('start', function () {
            var windowWidth = $(window).width();
            console.log(windowWidth);
            $(".element").each(function (i) {
                $(this).fadeIn(time).css('margin-left', margin + 'px')
                time += 2500;
                if (windowWidth > 500) {
                    margin = Math.random() * 200;
                } else {
                    margin = 20;
                }
            })
        })
        .addIndicators()
        .addTo(controller);
};



function stickNav() {
    var Navcontroller = new ScrollMagic.Controller();
    var stickyNav = new ScrollMagic.Scene({
            triggerElement: '#introduction',
            triggerHook: 0.3
        })
        .setClassToggle('#sidebar', 'fixed')
        .addIndicators()
        .addTo(Navcontroller);

}