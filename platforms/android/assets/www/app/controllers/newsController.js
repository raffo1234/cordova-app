(function() {
  'use strict';

  angular.module('igospa.controllers').controller('newsController', newsController);

  function newsController($scope, $http, LIMIT, ITEMS_BY_PAGE, API_URL, $stateParams, $location, newsServices, dbNew,
    dbNewSync,
    dbNewTranslationSync
  ) {
    var main = $('#main'),
      loading = $('.loading-js');
    var items = $('.news-js');



    /* ------------------------------------------ */
    // show language
    /* ------------------------------------------ */
    $scope.language = $stateParams.lang || 'es';



    /* ------------------------------------------ */
    // isOnline
    /* ------------------------------------------ */

    // var promesa = newsServices.getData();
    // var result = [];
    // promesa.then(function(response) {

    //   $scope.result = response;
    //   TweenLite.to(loading, .45, { opacity: 0 });
    //   TweenLite.to(main, 1, { opacity: 1 });

    // }, function(error) {
    //   // alert("Error: " + error);
    // });


    /* ------------------------------------------ */
    // Pagging
    /* ------------------------------------------ */

    $scope.result = [];
    $scope.offset = 0;
    var count = 0;
    $scope.getMoreItems = function() {
      count++;
      $scope.offset = ITEMS_BY_PAGE * (count - 1);

      $scope.isLoading = 'true';
      var promesa = newsServices.getData($scope.offset, LIMIT);

      promesa.then(function(response) {
        $.map(response, function(n, i) {
            $scope.result.push(n);
            return n['image_fullpath'] = API_URL.url + 'uploads/news/' + n['image'];
        });
        $scope.isLoading = 'false';
        TweenLite.to(loading, .45, { opacity: 0 });
        TweenLite.to(main, 1, { opacity: 1 });

      }, function(error) {
        // alert("Error: " + error);
      });
    };

    $scope.getMoreItems();



    /* ------------------------------------------ */
    // populate
    /* ------------------------------------------ */
    // dbNewSync.getAllData();
    // dbNewTranslationSync.getAllData();



    /* ------------------------------------------ */
    // isOffline
    /* ------------------------------------------ */
    // var result = [];

    // dbNew.getByLanguage(localStorage.getItem('lang')).then(function(response){

    //     $scope.result = response;
    //     TweenLite.to(loading, .45, {opacity: 0});
    //     TweenLite.to(main, 1, {opacity: 1});
    // });


  }


  angular.module('igospa.services').service("newsServices", ["$http", "$stateParams", "$q", "API_URL", function($http, $stateParams, $q, API_URL) {
    this.getData = function(offset, limit) {
      var defer = $q.defer();
      var lang = $stateParams.lang || 'es';

      $http.get(API_URL.url + "news/" + lang + "?sort=-date_original&offset=" + offset + "&limit=" + limit)
        .success(function(data) {
          defer.resolve(data);
        })
        .error(function(data) {
          defer.reject(data);
        });

      return defer.promise;
    };
  }]);
})();
