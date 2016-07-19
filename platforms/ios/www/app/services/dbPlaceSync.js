(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbPlaceSync', ['dbPlace', 'placeServicesGetAll', dbPlaceSync]);

    // language
    function dbPlaceSync(dbPlace, placeServicesGetAll) {
        var self = this;
        
        self.getAllData = function () {
            
            var promesa = placeServicesGetAll.getData();
            promesa.then(function (response) {
           
                dbPlace.insert(response);
                
            }, function (error) {
                // alert("Error: " + error);
            });  
        }
        
        return self;
    };  

    angular.module('igospa.services').service("placeServicesGetAll", ["$http", "$q", function ($http, $q) {
        this.getData = function () {
            var defer = $q.defer();
            $http.get("http://rafaelmeza.com/projects/igospa/api/v1/places-all/")
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