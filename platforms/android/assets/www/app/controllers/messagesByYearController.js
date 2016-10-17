(function () {
    'use strict';

    angular.module('igospa.controllers').controller('messagesByYearController', messagesByYearController);

    function messagesByYearController($scope, LIMIT, $state, $http, $stateParams, $location, messagesServices, dbMessage,
        dbMessageSync,
        dbMessageTranslationSync
        ){

        var self = this;

        // MESSAGES
        var result = [];
        var main = $('#main'),
        loading = $('.loading-js'),
        year = $stateParams.year || '',
        offset = 0,
        limit = LIMIT;
        $scope.$parent.year = year;

        TweenLite.set(loading, {autoAlpha: 1});
        TweenLite.set(main, {autoAlpha: 0});


        /* ------------------------------------------ */
        // show language
        /* ------------------------------------------ */
        $scope.language = $stateParams.lang || 'es';


        /* ------------------------------------------ */
        // populate
        /* ------------------------------------------ */
        // dbMessageSync.getAllData();
        // dbMessageTranslationSync.getAllData();



        /* ------------------------------------------ */
        // isOnline
        /* ------------------------------------------ */

        var promesa = messagesServices.getData(year, offset, limit);

        promesa.then(function (response) {
            // console.log("Mensajes", response);
            $scope.result = response;
            $scope.$parent.result = response;
            $scope.$parent.offset = 0;

            TweenLite.to(loading, .45, {autoAlpha: 0});
            TweenLite.to(main, 1, {autoAlpha: 1});

        }, function (error) {
            // alert("Error: " + error);
        });




        return;
        /* ------------------------------------------ */
        // isOffline
        /* ------------------------------------------ */
        var result = [];
        dbMessage.getByYearLanguage(year, $scope.language).then(function(response){
            $scope.result = response;

            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, .45, {opacity: 1});
        });


    }


})();
