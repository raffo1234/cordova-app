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
        $scope.language = localStorage.getItem('lang');

        

        
        /* ------------------------------------------ */    
        // isOffline
        /* ------------------------------------------ */
        if(id === null){
            dbPlace.getByLanguage(localStorage.getItem('lang')).then(function(response){
                $scope.detail = [];

                $scope.detail.push(response[0]);


                TweenLite.to(loading, .45, {opacity: 0});
                TweenLite.to(main, 1, {opacity: 1});   
            });
        }else{
            dbPlace.getByIdLanguage(id, localStorage.getItem('lang')).then(function(response){

                $scope.detail = [];
                $scope.detail.push(response[0]);
                
                
                TweenLite.to(loading, .45, {opacity: 0});
                TweenLite.to(main, 1, {opacity: 1});   
            });
        }



        /* ------------------------------------------ */    
        // isOnline
        /* ------------------------------------------ */
        return;

        // La primera vez que carga no tiene parametro
        if(id === null){
            var promesa = placesServices.getData($location);
            promesa.then(function (response) {
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
                $scope.detail = response;
                TweenLite.to(loading, .45, {opacity: 0});
                TweenLite.to(main, .45, {opacity: 1});                
            }, function (error) {
                // alert("Error: " + error);
            });
        }
    }

    angular.module('igospa.services').service("placeDetailServices", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function (id, $location) {
            var defer = $q.defer();
            $http.get(API_URL.url + "place/" + localStorage.getItem('lang') + '/' + id)
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