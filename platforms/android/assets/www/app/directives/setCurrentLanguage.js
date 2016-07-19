/************************************
*****    CURRENT LANGUAGE   *********
************************************/
(function () {
    'use strict';

    angular.module('igospa.directives').directive('setCurrentLanguage', setCurrentLanguage);

    function setCurrentLanguage(){
        return {
            restrict: 'A',
            scope: {
                language: '&'
            },
            link: function ($scope, element, attrs) {
                
                var currentLanguage = '';
			    var btn = $('.btn-language-js');

			    btn.on('click', function(){
			        var self = $(this);
			        currentLanguage = self.data('lang');
			        localStorage.setItem('lang', currentLanguage);

                    
			    });
            
             }
        }
    }
})();