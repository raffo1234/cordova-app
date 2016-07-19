(function () {
    'use strict';

    angular.module('igospa.controllers').controller('personageDetailController', personageDetailController);

    function personageDetailController($scope, $http, $stateParams, $location, personageDetailServices, dbPeople){
        var main = $('#main'),
        loading = $('.loading-js');     
        var id = $stateParams.id;


        /* ------------------------------------------ */    
        // isOffline
        /* ------------------------------------------ */
        var result = [];
        dbPeople.getByIdLanguage(id, localStorage.getItem('lang')).then(function(response){
            $scope.result = response;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});  
        });


        /* ------------------------------------------ */    
        // isOnline
        /* ------------------------------------------ */
        return;
        var promesa = personageDetailServices.getData(id, $location);
        promesa.then(function (response) {

            $scope.result = response;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});                

        }, function (error) {
            // alert("Error: " + error);
        });
    }

    angular.module('igospa.services').service("personageDetailServices", ["$http", "$q", function ($http, $q) {
        this.getData = function (id, $location) {
            var defer = $q.defer();
            $http.get("http://rafaelmeza.com/projects/igospa/api/v1/personage/" + localStorage.getItem('lang') + '/' + id)
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

