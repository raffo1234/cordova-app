(function () {
    'use strict';

    angular.module('igospa.controllers').controller('favoriteNewsController', favoriteNewsController);

    function favoriteNewsController($scope, API_URL, $http, $stateParams, $location, newsServices, dbNew, dbFavoriteNew){
        var main = $('#main'),
        loading = $('.loading-js');
        var items = $('.news-js');


        /* ------------------------------------------ */
        // show language
        /* ------------------------------------------ */
        $scope.language = $stateParams.lang || 'es';



        /* ------------------------------------------ */
        // isOffline
        /* ------------------------------------------ */
        var result = [];

        dbFavoriteNew.getByLanguage($scope.language).then(function(response){
          $.map(response, function(n, i) {
              return n['image_fullpath'] = API_URL.url + 'uploads/news/' + n['image'];
          });
         //  console.log("object", response);
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
            // console.log(response);
            $scope.result = response;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});

        }, function (error) {
            // alert("Error: " + error);
        });
    }

})();
