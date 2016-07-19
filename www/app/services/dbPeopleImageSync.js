(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbPeopleImageSync', ['dbPeopleImage', 'peoplesImageServicesGetAll', dbPeopleImageSync]);

    // language
    function dbPeopleImageSync(dbPeopleImage, peoplesImageServicesGetAll) {
        var self = this;
        
        self.getAllData = function () {
            
            dbPeopleImage.getLastSync().then(function(lastSync){
                
                var promesa = peoplesImageServicesGetAll.getData(lastSync);
                promesa.then(function (response) {
                    
                    dbPeopleImage.insert(response);
                    
                }, function (error) {
                    // alert("Error: " + error);
                });
            })
        }
        
        return self;
    };


    // peoples SERVICES
    angular.module('igospa.services').service("peoplesImageServicesGetAll", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function (modifiedSince) {
            var defer = $q.defer();
            $http({
                url: API_URL.url + "people-images-all/",
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