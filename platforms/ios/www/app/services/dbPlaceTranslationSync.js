(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbPlaceTranslationSync', ['dbPlaceTranslation', 'placesTranslationServicesGetAll', dbPlaceTranslationSync]);

    // language
    function dbPlaceTranslationSync(dbPlaceTranslation, placesTranslationServicesGetAll) {
        var self = this;
        
        self.getAllData = function () {
            
            dbPlaceTranslation.getLastSync().then(function(lastSync){
                
                var promesa = placesTranslationServicesGetAll.getData(lastSync);
                promesa.then(function (response) {
                    // alert(lastSync);
                    // alert(response);
                    dbPlaceTranslation.insert(response);
                    
                }, function (error) {
                    // alert("Error: " + error);
                });
            })
        }
        
        return self;
    };


    // places SERVICES
    angular.module('igospa.services').service("placesTranslationServicesGetAll", ["$http", "$q", function ($http, $q) {
        this.getData = function (modifiedSince) {
            var defer = $q.defer();
            $http({
                url: "http://rafaelmeza.com/projects/igospa/api/v1/places-translation-all/",
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