(function () {
    'use strict';

    angular.module('igospa.controllers').controller('favoriteNewsController', favoriteNewsController);

    function favoriteNewsController($scope, $http, $stateParams, $location, newsServices, dbNew, dbFavoriteNew){
        var main = $('#main'),
        loading = $('.loading-js');
        var items = $('.news-js');


        /* ------------------------------------------ */    
        // isOffline
        /* ------------------------------------------ */  
        var result = [];

        dbFavoriteNew.getByLanguage(localStorage.getItem('lang')).then(function(response){
        
            $scope.result = response;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1}); 
        });



        /* ------------------------------------------ */    
        // isOnline
        /* ------------------------------------------ */  
        return;
        var promesa = newsServices.getData();
        var result = [];
        promesa.then(function (response) {
            
            $scope.result = response;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});                

        }, function (error) {
            // alert("Error: " + error);
        });
    }


    angular.module('igospa.services').service("newsServices", ["$http", "$q", function ($http, $q) {
        this.getData = function () {
            var defer = $q.defer();
            $http.get("http://rafaelmeza.com/projects/igospa/api/v1/news/" + localStorage.getItem('lang'))
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

