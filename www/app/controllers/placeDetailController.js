(function () {
    'use strict';

    angular.module('igospa.controllers').controller('placeDetailController', placeDetailController);

    function placeDetailController($scope, $http, $stateParams, $location, placesServices, placeDetailServices, dbPlace){
        var main = $('#main'),
        loading = $('.loading-detail-js'),
        id = $stateParams.id;

        TweenLite.set(loading, {opacity: 1});
        TweenLite.set(main, {opacity: 0});



        /* ------------------------------------------ */
        // show language
        /* ------------------------------------------ */
        $scope.language = $stateParams.lang || 'es';



        /* ------------------------------------------ */
        // isOnline
        /* ------------------------------------------ */

        if(id === null){
            var promesa = placesServices.getData($location);
            promesa.then(function (response) {
                $scope.ready = function(){
                    console.log("ready!");
                };
                // console.log("Detalle", response);
                $scope.detail = [];
                $scope.detail.push(response[0]);

                TweenLite.to(loading, .45, {opacity: 0});
                TweenLite.to(main, 1, {opacity: 1});
            }, function (error) {
                // alert("Error: " + error);
            });
        }else{
            var promesa = placeDetailServices.getData(id, $location);
            promesa.then(function (response) {
                $scope.ready = function(){
                    console.log("ready!");
                };
                // console.log("detalle id", response);
                $scope.detail = response;

                TweenLite.to(loading, .45, {opacity: 0});
                TweenLite.to(main, .45, {opacity: 1});
            }, function (error) {
                // alert("Error: " + error);
            });
        }




        return;
        /* ------------------------------------------ */
        // isOffline
        /* ------------------------------------------ */
        if(id === null){
            dbPlace.getByLanguage($scope.language).then(function(response){
                $scope.detail = [];

                $scope.detail.push(response[0]);


                TweenLite.to(loading, .45, {opacity: 0});
                TweenLite.to(main, 1, {opacity: 1});
            });
        }else{
            dbPlace.getByIdLanguage(id, $scope.language).then(function(response){

                $scope.detail = [];
                $scope.detail.push(response[0]);

                TweenLite.to(loading, .45, {opacity: 0});
                TweenLite.to(main, 1, {opacity: 1});
            });
        }




    }



    angular.module('igospa.services').service("placeDetailServices", ["$http", "$stateParams", "$q", "API_URL", function ($http, $stateParams, $q, API_URL) {
        this.getData = function (id, $location) {
            var defer = $q.defer();
            var lang = $stateParams.lang;
            $http.get(API_URL.url + "place/" + lang + '/' + id)
                    .success(function (data) {
                        defer.resolve(data);
                    })
                    .error(function (data) {
                        defer.reject(data);
                    });

            return defer.promise;
        };
    }
    ]);

})();
