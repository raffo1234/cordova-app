(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbPeopleSync', ['dbPeople', 'peopleServicesGetAll', dbPeopleSync]);

    // language
    function dbPeopleSync(dbPeople, peopleServicesGetAll) {
        var self = this;
        
        self.getAllData = function () {
            
            dbPeople.getLastSync().then(function(lastSync){

                var promesa = peopleServicesGetAll.getData(lastSync);
                promesa.then(function (response) {
                    
                    dbPeople.insert(response);
                    
                }, function (error) {
                    // alert("Error: " + error);
                });  
            });  
        }
        
        return self;
    };  

    angular.module('igospa.services').service("peopleServicesGetAll", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function (modifiedSince) {
            var defer = $q.defer();
            $http({
                url: API_URL.url + "people-all/",
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