/************************************
*****    CURRENT LANGUAGE   *********
************************************/
(function () {
    'use strict';

    angular.module('igospa.directives').directive('setCurrentLanguageReload', setCurrentLanguageReload);

    function setCurrentLanguageReload($state){
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {

               var currentLanguage = '';
			      var btn = $('.btn-language-js');

      		    btn.on('click', function(){

      		        var self = $(this);
      		        currentLanguage = self.data('lang');
      		      //   localStorage.setItem('lang', currentLanguage);
                    $state.go($state.current, {lang: currentLanguage}, {reload: true});
      		    });

             }
        }
    }
})();
