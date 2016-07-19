(function () {
    'use strict';

    angular.module('igospa.controllers').controller('messagesController', messagesController);

    function messagesController($scope, $http, API_URL, $stateParams, $location, messagesServices, dbMessage,
        dbMessageSync,
        dbMessageTranslationSync

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
        // show language
        /* ------------------------------------------ */
        $scope.language = localStorage.getItem('lang');




        /* ------------------------------------------ */
        // Pagging
        /* ------------------------------------------ */

        var itemByPage = 10;
        var limit = 10;
        var limit = parseInt(limit || itemByPage);

        $scope.getMoreItems = function(page){
            $scope.offset = $scope.offset + itemByPage;
            $scope.isLoading = 'true';
            var promesa = messagesServices.getData($scope.year, $scope.offset, limit);
            promesa.then(function (response) {
                $.map(response, function(n, i){
                    $scope.result.push(n);
                });
                $scope.isLoading = 'false';
                TweenLite.to(loading, .45, {opacity: 0});
                TweenLite.to(main, 1, {opacity: 1});

            }, function (error) {
                // alert("Error: " + error);
            });
        };



        /* ------------------------------------------ */
        // isOnline
        /* ------------------------------------------ */

        $http.get(API_URL.url + "messages/" + localStorage.getItem('lang') + '?fields=year&sort=+year')
            .success(function(response){
                var uniqueYears = [];
                var uniqueYearsJson = [];

                $scope.years = response;

                TweenLite.to(loading, .45, {delay: 0, autoAlpha: 0});
                TweenLite.to(items, 1, {delay: 0, autoAlpha: 1});
            })
            .error(function(){

            })



        return false;
        /* ------------------------------------------ */
        // populate
        /* ------------------------------------------ */
        dbMessageSync.getAllData(function(){

            dbMessageTranslationSync.getAllData();

            /* ------------------------------------------ */
            // isOffline
            /* ------------------------------------------ */
            dbMessage.getByLanguage(localStorage.getItem('lang')).then(function(result){
                var uniqueYears = [];
                var uniqueYearsJson = [];
                console.log(result);
                $.map(result, function(n, i){

                    var year = n['year'];

                    if($.inArray(year, uniqueYears) === -1){
                        uniqueYears.push(year);
                    }

                });
                $.map(uniqueYears, function(n, i){
                    uniqueYearsJson.push({year: n})
                });

                $scope.years = uniqueYearsJson;


                TweenLite.to(loading, .45, {delay: 0, autoAlpha: 0});
                TweenLite.to(items, 1, {delay: 0, autoAlpha: 1});
            });


        });

    }



    // MESSAGES SERVICES
    angular.module('igospa.services').service("messagesServices", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function (year, offset, limit) {
            var defer = $q.defer();
            $http.get(API_URL.url + "messages/" + localStorage.getItem('lang') + "?sort=-date_created&year=" + year + "&offset=" + offset + "&limit=" + limit)
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

