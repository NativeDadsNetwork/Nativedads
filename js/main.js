/*-----------------------------------------------------------------------------------

    Theme Name: Charity - Nonprofit and Donation Template
    Description: Nonprofit and Donation Template
    Author: Chitrakoot Web
    Version: 1.0

    /* ----------------------------------

    JS Active Code Index
            
        01. Preloader
        02. Scroll To Top
        03. Wow animation - on scroll
        04. Parallax
        05. Video
        06. Tab Effect
        07. Resize function
        08. Progress bar
        09. FullScreenHeight function
        10. ScreenFixedHeight function
        11. FullScreenHeight and screenHeight with resize function
        12. Sliders
        13. Tabs
        14. CountUp
        15. Countdown
        16. Isotop
        
    ---------------------------------- */    

(function($) {

    "use strict";

    var $window = $(window);

        /*------------------------------------
            01. Preloader
        --------------------------------------*/

        $('#preloader').fadeOut('normall', function() {
            $(this).remove();
        });


        /*------------------------------------
            02. Scroll To Top
        --------------------------------------*/

        $window.on('scroll', function() {
            if ($(this).scrollTop() > 500) {
                $(".scroll-to-top").fadeIn(400);

            } else {
                $(".scroll-to-top").fadeOut(400);
            }
        });

        $(".scroll-to-top").on('click', function(event) {
            event.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, 600);
        });

        /*------------------------------------
            03. Wow animation - on scroll
        --------------------------------------*/
        
        var wow = new WOW({
            boxClass: 'wow', // default
            animateClass: 'animated', // default
            offset: 0, // default
            mobile: false, // default
            live: true // default
        })
        wow.init();

        $(".text-animation").waypoint(function() {
            $('.text-animation.animated').textillate();
        }, { offset: '100%'});

        $('.page-title-section .text-animation').textillate();

        if ($(".tilt").length !== 0) {
            $('.tilt').tilt({
                maxTilt:        9,
                perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
                scale:          1,      // 2 = 200%, 1.5 = 150%, etc..
                speed:          300,    // Speed of the enter/exit transition.
                reset:          true   // If the tilt effect has to be reset on exit.
            });
        }

        /*------------------------------------
            04. Parallax
        --------------------------------------*/

        // sections background image from data background
        var pageSection = $(".parallax,.bg-img");
        pageSection.each(function(indx) {

            if ($(this).attr("data-background")) {
                $(this).css("background-image", "url(" + $(this).data("background") + ")");
            }
        });

        /*------------------------------------
            05. Video
        --------------------------------------*/

        $('.popup-social-video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
        
        /*------------------------------------
            06. Tab Effect
        --------------------------------------*/

        //Click on first li element
        $( ".tab1" ).click(function() {
        $( ".second, .third, .four" ).fadeOut();
        $( ".first" ).fadeIn(1000);
        });

        //Click on second li element
        $( ".tab2" ).click(function() {
        $( ".first, .third, .four" ).fadeOut();
        $( ".second" ).fadeIn(1000);
        });

        //Click on third li element
        $( ".tab3" ).click(function() {
        $( ".second, .first, .four" ).fadeOut();
        $( ".third" ).fadeIn(1000);
        });

        /*------------------------------------
            07. Resize function
        --------------------------------------*/

        $window.resize(function(event) {
            setTimeout(function() {
                SetResizeContent();
            }, 500);
            event.preventDefault();
        });

        /*------------------------------------
            08. Progress bar
        --------------------------------------*/

        $window.on('scroll', function () {
            $(".skills-progress span").each(function () {
                var bottom_of_object = 
                $(this).offset().top + $(this).outerHeight();
                var bottom_of_window = 
                $(window).scrollTop() + $(window).height();
                var myVal = $(this).attr('data-value');
                if(bottom_of_window > bottom_of_object) {
                    $(this).css({
                      width : myVal
                    });
                }
            });
        });

        /*------------------------------------
            09. FullScreenHeight function
        --------------------------------------*/

        function fullScreenHeight() {
            var element = $(".full-screen");
            var $minheight = $window.height();
            element.css('min-height', $minheight);
        }

        /*------------------------------------
            10. ScreenFixedHeight function
        --------------------------------------*/

        function ScreenFixedHeight() {
            var $headerHeight = $("header").height();
            var element = $(".screen-height");
            var $screenheight = $window.height() - $headerHeight;
            element.css('height', $screenheight);
        }

        /*------------------------------------
            11. FullScreenHeight and screenHeight with resize function
        --------------------------------------*/        

        function SetResizeContent() {
            fullScreenHeight();
            ScreenFixedHeight();
        }

        SetResizeContent();

    // === when document ready === //
    $(document).ready(function(){


        /*------------------------------------
            12. Sliders
        --------------------------------------*/

        // Clients carousel
        $('.client-style1').owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            autoplay: true,
            smartSpeed:800,
            autoplayTimeout: 3000,
            responsiveClass: true,
            autoplayHoverPause: false,
            responsive: {
                0: {
                    items: 1,
                    margin: 30
                },
                481: {
                    items: 2,
                    margin: 15
                },
                576: {
                    items: 3,
                    margin: 30
                },
                992: {
                    items: 4,
                    margin: 40
                },
                1200: {
                    items: 5,
                    margin: 60
                },
                1600: {
                    items: 7,
                    margin: 80
                }
            }
        });

        // testmonial-carousel
        $('.testimonial-carousel').owlCarousel({
            loop: true,
            responsiveClass: true,
            autoplay: false,
            smartSpeed: 1500,
            nav: false,
            dots: true,
            center:false,
            margin: 30,
            items: 1
        });

        // Sliderfade
        $('.slider-fade').owlCarousel({
            items: 1,
            loop:true,
            dots: true,
            margin: 0,
            nav: false,
            autoplay: true,
            smartSpeed:900,
            mouseDrag:false,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            dotsEach: true         
        }); 
        
        // Default owlCarousel
        $('.owl-carousel').owlCarousel({
            items: 1,
            loop:true,
            dots: false,
            margin: 0,
            autoplay:true,
            smartSpeed:500
        });   

        // Slider text animation
        var owl = $('.slider-fade');
        owl.on('changed.owl.carousel', function(event) {
            var item = event.item.index - 2;     // Position of the current item
            $('.text-animations').removeClass('animated');
            $('h1').removeClass('animated fadeInRight');
            $('.butn').removeClass('animated fadeInRight');
            $('.owl-item').not('.cloned').eq(item).find('.text-animations').addClass('animated');
            $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated fadeInRight');
            $('.text-animations').textillate('in');
            $('.owl-item').not('.cloned').eq(item).find('.butn').addClass('animated fadeInRight');
        });

        /*------------------------------------
            13. Tabs
        --------------------------------------*/

        //Horizontal Tab
        if ($(".horizontaltab").length !== 0) {
            $('.horizontaltab').easyResponsiveTabs({
                type: 'default', //Types: default, vertical, accordion
                width: 'auto', //auto or any width like 600px
                fit: true, // 100% fit in a container
                tabidentify: 'hor_1', // The tab groups identifier
                activate: function(event) { // Callback function if tab is switched
                    var $tab = $(this);
                    var $info = $('#nested-tabInfo');
                    var $name = $('span', $info);
                    $name.text($tab.text());
                    $info.show();
                }
            });
        }

        /*------------------------------------
            14. CountUp
        --------------------------------------*/

        $('.countup').counterUp({
            delay: 25,
            time: 2000
        });

        /*------------------------------------
            15. Countdown
        --------------------------------------*/

        // CountDown for coming soon page
        $(".countdown").countdown({
            date: "01 Jan 2024 00:01:00", //set your date and time. EX: 15 May 2014 12:00:00
            format: "on"
        });
      
    });

    // === when window loading === //
    $window.on("load", function() {

        /*------------------------------------
            16. Isotop
        --------------------------------------*/

        var $PortfolioGallery = $('.portfolio-gallery-isotope').isotope({
            // options
        });

        // filter items on button click
        $('.filtering').on('click', 'span', function() {
            var filterValue = $(this).attr('data-filter');
            $PortfolioGallery.isotope({
                filter: filterValue
            });
        });

        $('.filtering').on('click', 'span', function() {
            $(this).addClass('active').siblings().removeClass('active');
        });

        $('.portfolio-gallery').lightGallery();
        $('.portfolio-gallery-isotope').lightGallery();

        // stellar
        $window.stellar();

    });

})(jQuery);