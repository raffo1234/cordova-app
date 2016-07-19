(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbHistoryTranslationSync', ['dbHistoryTranslation', 'historiesTranslationServicesGetAll', dbHistoryTranslationSync]);

    // language
    function dbHistoryTranslationSync(dbHistoryTranslation, historiesTranslationServicesGetAll) {
        var self = this;
        
        self.getAllData = function () {

            dbHistoryTranslation.getLastSync().then(function(lastSync){

                var promesa = historiesTranslationServicesGetAll.getData(lastSync);
                promesa.then(function (response) {
                    
                    dbHistoryTranslation.insert(response);
                    
                }, function (error) {
                    // alert("Error: " + error);
                });
            })        
        }
        
        return self;
    };



    // histories SERVICES
    angular.module('igospa.services').service("historiesTranslationServicesGetAll", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function (modifiedSince) {
            var defer = $q.defer(); 
            $http({
                url: API_URL.url + "histories-translation-all/",
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