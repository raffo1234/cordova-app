(function () {
    'use strict';

    angular.module('igospa.controllers').controller('personagesController', personagesController);

    function personagesController($scope, $http, ADMIN_URL, $stateParams, $location, personagesServices,
        dbPeople,
        dbPeopleSync,
        dbPeopleImageSync,
        dbPeopleTranslationSync){

        var main = $('#main'),
        loading = $('.loading-js');


        /* ------------------------------------------ */
        // populate
        /* ------------------------------------------ */
        // dbPeopleSync.getAllData();
        // dbPeopleImageSync.getAllData();
        // dbPeopleTranslationSync.getAllData();




        /* ------------------------------------------ */
        // show language
        /* ------------------------------------------ */
        $scope.language = localStorage.getItem('lang');



        /* ------------------------------------------ */
        // isOnline
        /* ------------------------------------------ */

        var promesa = personagesServices.getData($location);
        var result = [];
        promesa.then(function (response) {

            $scope.result = response;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});
        }, function (error) {
            // alert("Error: " + error);
        });




        return false;
        /* ------------------------------------------ */
        // isOffline
        /* ------------------------------------------ */
        var result = [];
        dbPeople.getByLanguage(localStorage.getItem('lang')).then(function(response){
            $scope.result = response;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});
        });

    }


    // MESSAGES SERVICES
    angular.module('igospa.services').service("personagesServices", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function ($location) {
            var defer = $q.defer();
            $http.get(API_URL.url + "people/" + localStorage.getItem('lang'))
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

