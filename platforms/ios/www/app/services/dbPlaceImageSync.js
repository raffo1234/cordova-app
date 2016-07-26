(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbPlaceImageSync', ['dbPlaceImage', 'placesImageServicesGetAll', dbPlaceImageSync]);

    // language
    function dbPlaceImageSync(dbPlaceImage, placesImageServicesGetAll) {
        var self = this;
        
        self.getAllData = function () {
            
            dbPlaceImage.getLastSync().then(function(lastSync){
                
                var promesa = placesImageServicesGetAll.getData(lastSync);
                promesa.then(function (response) {
                    
                    dbPlaceImage.insert(response);
                    
                }, function (error) {
                    // alert("Error: " + error);
                });
            })
        }
        
        return self;
    };


    // places SERVICES
    angular.module('igospa.services').service("placesImageServicesGetAll", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function (modifiedSince) {
            var defer = $q.defer();
            $http({
                url: API_URL.url + "places-images-all/",
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