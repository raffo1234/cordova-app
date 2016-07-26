
(function () {
    'use strict';

    angular.module('igospa.directives').directive('carousel', carousel);

    function carousel($timeout){
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {

                var item = element.find('.carousel-item');
                element.owlCarousel({
                    items: 1,
                    autoplay: false,
                    autoplayHoverPause: true,
                    autoplayTimeout: 5000,
                    dots: true,
                    nav: false,
                    lazyLoad:true,
                    autoWidth: false,
                    slideBy: 1,
                    callbacks: true,
                    smartSpeed: 550,
                    touchDrag: true,
                    mouseDrag: true,
                    pullDrag: true,
                    lazyLoad: false,
                    loop: false
                });
             }
        }
    }
})();
