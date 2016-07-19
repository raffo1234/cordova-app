(function () {
    'use strict';

    angular.module('igospa.controllers').controller('messagesByYearController', messagesByYearController);

    function messagesByYearController($scope, $state, $http, $stateParams, $location, messagesServices, dbMessage, 
        dbMessageSync,
        dbMessageTranslationSync
        ){

        var self = this;
        var itemByPage = 10;

        // MESSAGES
        var result = [];
        var main = $('#main'),
        loading = $('.loading-js'),
        year = $stateParams.year || '',
        offset = parseInt($stateParams.offset || 0),
        limit = parseInt($stateParams.limit || itemByPage);
        $scope.$parent.year = year;

        // TweenLite.set(loading, {opacity: 1});
        // TweenLite.set(main, {opacity: 0});



        /* ------------------------------------------ */
        // populate
        /* ------------------------------------------ */
        // dbMessageSync.getAllData();
        // dbMessageTranslationSync.getAllData();




        /* ------------------------------------------ */
        // Pagging
        /* ------------------------------------------ */






        /* ------------------------------------------ */
        // isOnline
        /* ------------------------------------------ */

        var promesa = messagesServices.getData(year, offset, limit);

        promesa.then(function (response) {
            $scope.result = response;
            $scope.$parent.result = response;
            $scope.$parent.offset = 0;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});

        }, function (error) {
            // alert("Error: " + error);
        });




        return;
        /* ------------------------------------------ */
        // isOffline
        /* ------------------------------------------ */
        var result = [];
        dbMessage.getByYearLanguage(year, localStorage.getItem('lang')).then(function(response){
            $scope.result = response;

            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, .45, {opacity: 1});
        });


    }


})();

