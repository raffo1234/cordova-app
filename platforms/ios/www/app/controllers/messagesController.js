(function () {
    'use strict';

    angular.module('igospa.controllers').controller('messagesController', messagesController);

    function messagesController($scope, $http, $stateParams, $location, messagesServices, dbMessage 
        
        ){
        
        // MESSAGES        
        var main = $('#main'),
        loading = $('.loading-js'),
        year = $stateParams.year || '';

        TweenLite.set(loading, {opacity: 1});
        TweenLite.set(main, {opacity: 0});  

        // MESSAGES YEARS
        var loading = $('.loading-js'),
        items = $('.messages-years-js');
        

        


        /* ------------------------------------------ */    
        // isOffline
        /* ------------------------------------------ */    
        dbMessage.getByLanguage(localStorage.getItem('lang')).then(function(result){
            var uniqueYears = [];
            $.map(result, function(n, i){
                var date = n['date_created'];
                    var date_year_1 = date.split(' ');
                    var date_year_2 = date_year_1[0].split('-');
                    var date_year_3 = date_year_2[0];
                    
                    if($.inArray(date_year_3, uniqueYears) === -1) uniqueYears.push({year:date_year_3});
            });
            
            $scope.years = uniqueYears;

            TweenLite.to(loading, .45, {delay: 0, autoAlpha: 0});
            TweenLite.to(items, 1, {delay: 0, autoAlpha: 1});
        });




        /* ------------------------------------------ */    
        // isOnline
        /* ------------------------------------------ */    
        return false;
        $http.get("http://rafaelmeza.com/projects/igospa/api/v1/messages/" + localStorage.getItem('lang') + '?fields=date_created&sort=-date_created')
            .success(function(response){
                var uniqueYears = [];
                $.map(response, function(n, i){
                    var date = n['date_created'];
                        var date_year_1 = date.split(' ');
                        var date_year_2 = date_year_1[0].split('-');
                        var date_year_3 = date_year_2[0];
                        
                        if($.inArray(date_year_3, uniqueYears) === -1) uniqueYears.push({year:date_year_3});
                });
                
                $scope.years = uniqueYears;

                TweenLite.to(loading, .45, {delay: 0, autoAlpha: 0});
                TweenLite.to(items, 1, {delay: 0, autoAlpha: 1});
            })
            .error(function(){

            })
    }


    // MESSAGES SERVICES
    angular.module('igospa.services').service("messagesServices", ["$http", "$q", function ($http, $q) {
        this.getData = function (year) {
            var defer = $q.defer();
            $http.get("http://rafaelmeza.com/projects/igospa/api/v1/messages/" + localStorage.getItem('lang') + "?sort=-date_created&year=" + year)
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

