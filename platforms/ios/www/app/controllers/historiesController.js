(function () {
    'use strict';

    angular.module('igospa.controllers').controller('historiesController', historiesController);

    function historiesController($scope, $http, $stateParams, $location, historiesServices, dbHistory){
        var main = $('#main'),
        loading = $('.loading-js');
        

        /* ------------------------------------------ */    
        // isOffline
        /* ------------------------------------------ */
        var result = [];
        dbHistory.getByLanguage(localStorage.getItem('lang')).then(function(response){
            $scope.result = response;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1}); 
        });


        /* ------------------------------------------ */    
        // isOnline
        /* ------------------------------------------ */
        return;
        var promesa = historiesServices.getData($location);
        var result = [];
        promesa.then(function (response) {
            
            $scope.result = response;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});                

        }, function (error) {
            // alert("Error: " + error);
        });
    }


    // MESSAGES SERVICES
    angular.module('igospa.services').service("historiesServices", ["$http", "$q", function ($http, $q) {
        this.getData = function ($location) {
            var defer = $q.defer();
            $http.get("http://rafaelmeza.com/projects/igospa/api/v1/histories/" + localStorage.getItem('lang'))
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

