(function () {
    'use strict';

    angular.module('igospa.directives').directive('dropdownLanguages', dropdownLanguages);

    function dropdownLanguages($state){
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {

                var ele = $('.wrapper-languages-js');

                ele.on('click', function(){
                    var self = $(this);

                    if(!self.hasClass('active')){
                        self.addClass('active');
                        TweenLite.to($('.languages li').eq(2), 0.4, {delay: 0,
                            autoAlpha: 1, left: 0
                        });
                        TweenLite.to($('.languages li').eq(1), 0.4, {delay: 0.3,
                            autoAlpha: 1, left: 0
                        });
                        TweenLite.to($('.languages li').eq(0), 0.4, {delay: 0.5,
                            autoAlpha: 1, left: 0
                        });
                    }else{
                        self.removeClass('active');
                        TweenLite.to($('.languages li').eq(0), 0.4, {delay: 0,
                            autoAlpha: 0, left: 8
                        });   
                        TweenLite.to($('.languages li').eq(1), 0.4, {delay: 0.3,
                            autoAlpha: 0, left: 8
                        });   
                        TweenLite.to($('.languages li').eq(2), 0.4, {delay: 0.5,
                            autoAlpha: 0, left: 8
                        });   
                    }

                    
                });

                $(window).on('click', function(){
                    if(ele.hasClass('active')){
                        ele.removeClass('active');   
                        TweenLite.to($('.languages li').eq(0), 0.4, {delay: 0,
                            autoAlpha: 0, left: 8
                        });   
                        TweenLite.to($('.languages li').eq(1), 0.4, {delay: 0.3,
                            autoAlpha: 0, left: 8
                        });   
                        TweenLite.to($('.languages li').eq(2), 0.4, {delay: 0.5,
                            autoAlpha: 0, left: 8
                        });   
                    }
                });
                
                ele.on('click', function(e){
                    e.stopPropagation();
                });
        
            }
        }
    }
})();

