
(function () {
    'use strict';

    angular.module('igospa.directives').directive('carousel', carousel);

    function carousel(){
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                
                var item = element.find('.carousel-item');    
                
                element.owlCarousel({
                    items: 1,
                    autoplay: false,
                    autoplayHoverPause: true,
                    autoplayTimeout: 5000,
                    dots: true,
                    nav: false,
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
