(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbNewTranslationSync', ['dbNewTranslation', 'newsTranslationServicesGetAll', dbNewTranslationSync]);

    // language
    function dbNewTranslationSync(dbNewTranslation, newsTranslationServicesGetAll) {
        var self = this;
        
        self.getAllData = function () {

            dbNewTranslation.getLastSync().then(function(lastSync){

                var promesa = newsTranslationServicesGetAll.getData(lastSync);
                promesa.then(function (response) {

                    dbNewTranslation.insert(response);
                    
                }, function (error) {
                    // alert("Error: " + error);
                });    
            });    
        }
        
        return self;
    };


    // news SERVICES
    angular.module('igospa.services').service("newsTranslationServicesGetAll", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function (modifiedSince) {
            var defer = $q.defer();
            $http({
                url: API_URL.url + "news-translation-all/",
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