(function() {
    'use strict';

    angular.module('igospa.controllers').controller('favoriteMessagesByYearController', favoriteMessagesByYearController);

    function favoriteMessagesByYearController($scope, $http, $stateParams, $location, messagesServices, dbMessage, dbFavoriteMessage) {

        // MESSAGES
        var main = $('#main'),
            loading = $('.loading-js'),
            year = $stateParams.year || '';

        TweenLite.set(loading, { opacity: 1 });
        TweenLite.set(main, { opacity: 0 });


        /* ------------------------------------------ */
        // show language
        /* ------------------------------------------ */
        $scope.language = $stateParams.lang || 'es';


        /* ------------------------------------------ */
        // isOffline
        /* ------------------------------------------ */
        var result = [];
        dbFavoriteMessage.getByYearLanguage(year, $scope.language).then(function(response) {
            $scope.result = response;
            TweenLite.to(loading, .45, { opacity: 0 });
            TweenLite.to(main, 1, { opacity: 1 });
        });


        /* ------------------------------------------ */
        // isOnline
        /* ------------------------------------------ */
        return false;
        var promesa = messagesServices.getData(year);
        var result = [];
        promesa.then(function(response) {

            $scope.result = response;
            TweenLite.to(loading, .45, { opacity: 0 });
            TweenLite.to(main, 1, { opacity: 1 });

        }, function(error) {
            // alert("Error: " + error);
        });

    }

})();
