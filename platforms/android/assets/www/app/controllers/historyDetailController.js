(function () {
    'use strict';

    angular.module('igospa.controllers').controller('historyDetailController', historyDetailController);

    function historyDetailController($scope, $http, $stateParams, historyDetailServices, dbHistory){
        var main = $('#main'),
        loading = $('.loading-js');     
        var container = $('.history-detail-js');
        var id = $stateParams.id;
        
        



        /* ------------------------------------------ */    
        // show language
        /* ------------------------------------------ */            
        $scope.language = localStorage.getItem('lang');






        /* ------------------------------------------ */    
        // isOffline
        /* ------------------------------------------ */
        var result = [];
        dbHistory.getByIdLanguage(id, localStorage.getItem('lang')).then(function(response){
            $scope.result = response;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});   
        });



        /* ------------------------------------------ */    
        // isOnline
        /* ------------------------------------------ */
        return;
        var result = [];
        dbHistory.getByLanguage(localStorage.getItem('lang')).then(function(response){
            $scope.result = response;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1}); 
        });

        var promesa = historyDetailServices.getData(id);
        promesa.then(function (response) {

            $scope.result = response;
            
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});                

        }, function (error) {
            // alert("Error: " + error);
        });
    }

    angular.module('igospa.services').service("historyDetailServices", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function (id) {
            var defer = $q.defer();
            $http.get(API_URL.url + "history/" + localStorage.getItem('lang') + '/' + id)
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

