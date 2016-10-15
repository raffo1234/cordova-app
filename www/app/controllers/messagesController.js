(function() {
  'use strict';

  angular.module('igospa.controllers').controller('messagesController', messagesController);

  function messagesController($scope, $http, LIMIT, ITEMS_BY_PAGE, API_URL, $stateParams, $location, messagesServices, dbMessage,
    dbMessageSync,
    dbMessageTranslationSync

  ) {

    // MESSAGES
    var main = $('#main'),
      loading = $('.loading-js'),
      year = $stateParams.year || '';

    TweenLite.set(loading, { autoAlpha: 1 });
    TweenLite.set(main, { autoAlpha: 0 });

    // MESSAGES YEARS
    var loading = $('.loading-js'),
      items = $('.messages-years-js');


    /* ------------------------------------------ */
    // show language
    /* ------------------------------------------ */
    $scope.language = $stateParams.lang || 'es';
    


    /* ------------------------------------------ */
    // Pagging
    /* ------------------------------------------ */

    $scope.getMoreItems = function(page) {
      $scope.offset = $scope.offset * 1 + ITEMS_BY_PAGE * 1;
      $scope.isLoading = 'true';
      var promesa = messagesServices.getData($scope.year, $scope.offset, LIMIT);
      promesa.then(function(response) {
        $.map(response, function(n, i) {
          $scope.result.push(n);
        });
        $scope.isLoading = 'false';
        TweenLite.to(loading, .45, { opacity: 0 });
        TweenLite.to(main, 1, { opacity: 1 });

      }, function(error) {
        // alert("Error: " + error);
      });
    };



    /* ------------------------------------------ */
    // isOnline
    /* ------------------------------------------ */

    $http.get(API_URL.url + "messages/" + $scope.language + '?fields=year&sort=-date')
      .success(function(response) {

        // console.log("Mensajes", response);
        $scope.years = response;

        TweenLite.to(loading, .45, { delay: 0, autoAlpha: 0 });
        TweenLite.to(items, 1, { delay: 0, autoAlpha: 1 });
      })
      .error(function() {

      })



    return false;
    /* ------------------------------------------ */
    // populate
    /* ------------------------------------------ */
    dbMessageSync.getAllData(function() {

      dbMessageTranslationSync.getAllData();

      /* ------------------------------------------ */
      // isOffline
      /* ------------------------------------------ */
      dbMessage.getByLanguage(localStorage.getItem('lang')).then(function(result) {
        var uniqueYears = [];
        var uniqueYearsJson = [];
        console.log(result);
        $.map(result, function(n, i) {

          var year = n['year'];

          if ($.inArray(year, uniqueYears) === -1) {
            uniqueYears.push(year);
          }

        });
        $.map(uniqueYears, function(n, i) {
          uniqueYearsJson.push({ year: n })
        });

        $scope.years = uniqueYearsJson;


        TweenLite.to(loading, .45, { delay: 0, autoAlpha: 0 });
        TweenLite.to(items, 1, { delay: 0, autoAlpha: 1 });
      });

    });

  }



  // MESSAGES SERVICES
  angular.module('igospa.services').service("messagesServices", ["$http", "$stateParams", "$q", "API_URL", function($http, $stateParams, $q, API_URL) {
    this.getData = function(year, offset, limit) {
      var defer = $q.defer();
      var lang = $stateParams.lang || 'es';
      $http.get(API_URL.url + "messages/" + lang + "?sort=-date_original&year=" + year + "&offset=" + offset + "&limit=" + limit)
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
