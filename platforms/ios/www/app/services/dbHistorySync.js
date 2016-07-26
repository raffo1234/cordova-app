(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbHistorySync', ['dbHistory', 'historyServicesGetAll', dbHistorySync]);

    // language
    function dbHistorySync(dbHistory, historyServicesGetAll) {
        var self = this;
        
        self.getAllData = function () {
            
            dbHistory.getLastSync().then(function(lastSync){

                var promesa = historyServicesGetAll.getData(lastSync);
                promesa.then(function (response) {
               
                    dbHistory.insert(response);
                    
                }, function (error) {
                    // alert("Error: " + error);
                });  
            });  
        }
        
        return self;
    };  

    angular.module('igospa.services').service("historyServicesGetAll", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function (modifiedSince) {
            var defer = $q.defer();
            $http({
                url: API_URL.url + "histories-all/",
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