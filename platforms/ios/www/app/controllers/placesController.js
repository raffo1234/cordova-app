(function () {
    'use strict';

    angular.module('igospa.controllers').controller('placesController', placesController);

    function placesController($scope, $state, $http, $rootScope, $location, placesServices, dbPlace, 
        dbPlaceSync, 
        dbPlaceTranslationSync){

        var main = $('.header-carousel-inner-js'),
        loading = $('.loading-js');
        

        /* ------------------------------------------ */    
        // populate
        /* ------------------------------------------ */    
        dbPlaceSync.getAllData();    
        dbPlaceTranslationSync.getAllData();    



        /* ------------------------------------------ */    
        // isOffline
        /* ------------------------------------------ */

        var result = [];
        dbPlace.getByLanguage(localStorage.getItem('lang')).then(function(response){
            $scope.result = response;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});  
        });




        /* ------------------------------------------ */    
        // isOnline
        /* ------------------------------------------ */
        return;
        var promesa = placesServices.getData($location);
        promesa.then(function (response) {
            
            $scope.result = response;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});                

        }, function (error) {
            // alert("Error: " + error);
        });
    }    

    // SERVICES PLACES
    angular.module('igospa.services').service("placesServices", ["$http", "$q", function ($http, $q) {
        this.getData = function ($location) {
            var defer = $q.defer();
            $http.get("http://rafaelmeza.com/projects/igospa/api/v1/places/" + localStorage.getItem('lang'))
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

