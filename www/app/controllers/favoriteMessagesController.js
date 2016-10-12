(function () {
    'use strict';

    angular.module('igospa.controllers').controller('favoriteMessagesController', favoriteMessagesController);

    function favoriteMessagesController($scope, $http, API_URL, $stateParams, $location, messagesServices, dbMessage, dbFavoriteMessage){

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
        $scope.language = $stateParams.lang || 'es';



        /* ------------------------------------------ */
        // isOffline
        /* ------------------------------------------ */
        dbFavoriteMessage.getByLanguage($scope.language).then(function(response){
            var uniqueYearsArr = [];
            var uniqueYears = [];
            // console.log(uniqueYears);
            $.map(response, function(n, i){
                var year = n['year'];
                if($.inArray(year, uniqueYearsArr) === -1){

                    uniqueYearsArr.push(year);
                    uniqueYears.push({year:year});
                }
            });

            $scope.years = uniqueYears;
            // console.log($scope.years);

            TweenLite.to(loading, .45, {delay: 0, autoAlpha: 0});
            TweenLite.to(items, 1, {delay: 0, autoAlpha: 1});
        });




        /* ------------------------------------------ */
        // isOnline
        /* ------------------------------------------ */
        return false;
        $http.get(API_URL.url + "messages/" + $scope.language + '?fields=date_created&sort=-date_created')
            .success(function(response){
                var uniqueYearsArr = [];
                var uniqueYears = [];
                $.map(response, function(n, i){
                    var date = n['date_created'];
                        var date_year_1 = date.split(' ');
                        var date_year_2 = date_year_1[0].split('-');
                        var date_year_3 = date_year_2[0];

                        if($.inArray(date_year_3, uniqueYears) === -1) {
                            uniqueYearsArr.push(date_year_3);
                            uniqueYears.push({year:date_year_3})
                        };
                });

                $scope.years = uniqueYears;

                TweenLite.to(loading, .45, {delay: 0, autoAlpha: 0});
                TweenLite.to(items, 1, {delay: 0, autoAlpha: 1});
            })
            .error(function(){

            })
    }



})();
