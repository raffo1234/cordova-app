(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbPlaceSync', ['dbPlace', 'placeServicesGetAll', dbPlaceSync]);

    // language
    function dbPlaceSync(dbPlace, placeServicesGetAll) {
        var self = this;
        
        self.getAllData = function () {

            dbPlace.getLastSync().then(function(lastSync){     

                var promesa = placeServicesGetAll.getData(lastSync);
                promesa.then(function (response) {
               
                    dbPlace.insert(response);
                    
                }, function (error) {
                    // alert("Error: " + error);
                });  
            });  
        }
        
        return self;
    };  

    angular.module('igospa.services').service("placeServicesGetAll", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function (modifiedSince) {
            var defer = $q.defer();
            $http({
                url: API_URL.url + "places-all/",
                method: 'GET',
                params: {modifiedSince: modifiedSince}
            })
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