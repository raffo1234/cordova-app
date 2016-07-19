
(function () {
    'use strict';

    angular.module('igospa.directives').directive('footerHide', footerHide);

    function footerHide(){
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                
                var ele = $('input, textarea'),
                    footer = $('#footer');

                ele.focus(function(){
                    TweenLite.set(footer, {
                        autoAlpha: 0
                    }); 
                    $('html, body').animate({scrollTop: ele.offset().top}, 'fast');
                });
                ele.blur(function(){
                    TweenLite.to(footer, 1, {delay: 0.2,
                        autoAlpha: 1
                    }); 
                });
            
             }
        }
    }
})();
