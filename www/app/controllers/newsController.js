(function () {
    'use strict';

    angular.module('igospa.controllers').controller('newsController', newsController);

    function newsController($scope, $http, $stateParams, $location, newsServices, dbNew,
        dbNewSync,
        dbNewTranslationSync
        ){
        var main = $('#main'),
        loading = $('.loading-js');
        var items = $('.news-js');


        

        /* ------------------------------------------ */    
        // show language
        /* ------------------------------------------ */            
        $scope.language = localStorage.getItem('lang');






        /* ------------------------------------------ */    
        // populate
        /* ------------------------------------------ */    
        dbNewSync.getAllData();    
        dbNewTranslationSync.getAllData(); 



        /* ------------------------------------------ */    
        // isOffline
        /* ------------------------------------------ */  
        var result = [];

        dbNew.getByLanguage(localStorage.getItem('lang')).then(function(response){
        
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


    angular.module('igospa.services').service("newsServices", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function () {
            var defer = $q.defer();
            $http.get(API_URL.url + "news/" + localStorage.getItem('lang'))
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

