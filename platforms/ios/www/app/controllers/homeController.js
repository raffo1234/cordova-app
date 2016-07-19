(function () {
    'use strict';

    angular.module('igospa.controllers').controller('homeController', homeController);

    function homeController(dbMessageSync, dbMessageTranslationSync){


        // home animations
        var ele = $(".intro-js"),
        logo = $(".logo-js"),
        main = $('#main'),
        loading = $(".loading-js"),
        flag_1 = ele.find('li').eq(0),
        flag_2 = ele.find('li').eq(1),
        flag_3 = ele.find('li').eq(2);

        if(ele.length == 0) return false;
        
        var eleSrc = ele.css('background-image');
        var src = eleSrc.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        $('<img />').attr('src', src).load(function () {
            
            TweenLite.to(ele, 0.35, {
                opacity: 1, onComplete: function () {

                    TweenLite.to(logo, 1, {delay: 0,
                        opacity: 1, scale: 1, ease: Circ.easeOut, onComplete: function(){

                            
                           
                        }
                    });            
                    TweenLite.to(flag_1, .8, {delay: 0.6,
                        opacity: 1, top: 0, ease: Circ.easeOut
                    });        
                    TweenLite.to(flag_2, .8, {delay: 0.9,
                        opacity: 1, top: 0, ease: Circ.easeOut
                    });        
                    TweenLite.to(flag_3, .8, {delay: 1.2,
                        opacity: 1, top: 0, ease: Circ.easeOut
                    });        
                }
            });
        });
            
    }
})();

