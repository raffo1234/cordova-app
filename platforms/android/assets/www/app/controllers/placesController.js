(function () {
    'use strict';

    angular.module('igospa.controllers').controller('placesController', placesController);

    function placesController($scope, $state, $http, $rootScope, $location, placesServices, dbPlace, 
        dbPlaceSync, 
        dbPlaceImageSync, 
        dbPlaceTranslationSync){

        var main = $('.header-carousel-inner-js'),
        loading = $('.loading-js');


        /* ------------------------------------------ */
        // populate
        /* ------------------------------------------ */
        // dbPlaceSync.getAllData();
        // dbPlaceImageSync.getAllData();
        // dbPlaceTranslationSync.getAllData();



        /* ------------------------------------------ */
        // show language
        /* ------------------------------------------ */
        $scope.language = localStorage.getItem('lang');







        /* ------------------------------------------ */
        // isOnline
        /* ------------------------------------------ */

        var promesa = placesServices.getData($location);
        promesa.then(function (response) {
            // console.log(response);
            $scope.result = response;
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
        dbPlace.getByLanguage(localStorage.getItem('lang')).then(function(response){
            $scope.result = response;
            console.log($scope.result);
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});
        });
    }

    // SERVICES PLACES
    angular.module('igospa.services').service("placesServices", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function ($location) {
            var defer = $q.defer();
            $http.get(API_URL.url + "places/" + localStorage.getItem('lang'))
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

