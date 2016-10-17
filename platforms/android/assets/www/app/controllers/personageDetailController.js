(function () {
    'use strict';

    angular.module('igospa.controllers').controller('personageDetailController', personageDetailController);

    function personageDetailController($scope, $http, $stateParams, $location, personageDetailServices, dbPeople){
        var main = $('#main'),
        loading = $('.loading-js');
        var id = $stateParams.id;





        /* ------------------------------------------ */
        // show language
        /* ------------------------------------------ */
        $scope.language = $stateParams.lang || 'es';




        /* ------------------------------------------ */
        // isOnline
        /* ------------------------------------------ */

        var promesa = personageDetailServices.getData(id, $location);
        promesa.then(function (response) {
            // console.log(response);
            $scope.result = response;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});

        }, function (error) {
            // alert("Error: " + error);
        });




        return;
        /* ------------------------------------------ */
        // isOffline
        /* ------------------------------------------ */
        var result = [];
        dbPeople.getByIdLanguage(id, $scope.language).then(function(response){
            $scope.result = response;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});
        });

    }

    angular.module('igospa.services').service("personageDetailServices", ["$http", "$stateParams", "$q", "API_URL", function ($http, $stateParams, $q, API_URL) {
        this.getData = function (id, $location) {
            var defer = $q.defer();
            var lang = $stateParams.lang || 'es';
            $http.get(API_URL.url + "people/" + lang + '/' + id)
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
