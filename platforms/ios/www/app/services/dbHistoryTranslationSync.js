(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbHistoryTranslationSync', ['dbHistoryTranslation', 'historiesTranslationServicesGetAll', dbHistoryTranslationSync]);

    // language
    function dbHistoryTranslationSync(dbHistoryTranslation, historiesTranslationServicesGetAll) {
        var self = this;
        
        self.getAllData = function ($location) {
            var promesa = historiesTranslationServicesGetAll.getData();
            promesa.then(function (response) {

                dbHistoryTranslation.insert(response);
                
            }, function (error) {
                // alert("Error: " + error);
            });    
        }
        
        return self;
    };


    // histories SERVICES
    angular.module('igospa.services').service("historiesTranslationServicesGetAll", ["$http", "$q", function ($http, $q) {
        this.getData = function ($location) {
            var defer = $q.defer();
            $http.get("http://rafaelmeza.com/projects/igospa/api/v1/histories-translation-all/")
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