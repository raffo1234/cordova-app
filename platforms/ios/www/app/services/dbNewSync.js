(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbNewSync', ['dbNew', 'newServicesGetAll', dbNewSync]);

    // language
    function dbNewSync(dbNew, newServicesGetAll) {
        var self = this;
        
        self.getAllData = function () {
            
            dbNew.getLastSync().then(function(lastSync){

                var promesa = newServicesGetAll.getData(lastSync);
                promesa.then(function (response) {
               
                    dbNew.insert(response);
                    
                }, function (error) {
                    // alert("Error: " + error);
                });  
            });  
        }
        
        return self;
    };  

    angular.module('igospa.services').service("newServicesGetAll", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function (modifiedSince) {
            var defer = $q.defer();
            $http({
                url: API_URL.url + "news-all/",
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