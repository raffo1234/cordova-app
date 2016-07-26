(function () {
    'use strict';

    angular.module('igospa.controllers').controller('historiesController', historiesController);

    function historiesController($scope, $http, $stateParams, $location, historiesServices, dbHistory,
        dbHistorySync, 
        dbHistoryTranslationSync){

        var main = $('#main'),
        loading = $('.loading-js');
        

        /* ------------------------------------------ */    
        // populate
        /* ------------------------------------------ */    
        dbHistorySync.getAllData();    
        dbHistoryTranslationSync.getAllData(); 





        /* ------------------------------------------ */    
        // show language
        /* ------------------------------------------ */            
        $scope.language = localStorage.getItem('lang');





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
    angular.module('igospa.services').service("historiesServices", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function ($location) {
            var defer = $q.defer();
            $http.get(API_URL.url + "histories/" + localStorage.getItem('lang'))
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

