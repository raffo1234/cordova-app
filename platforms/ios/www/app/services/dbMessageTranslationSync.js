(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbMessageTranslationSync', ['dbMessageTranslation', 'messagesTranslationServicesGetAll', dbMessageTranslationSync]);

    // language
    function dbMessageTranslationSync(dbMessageTranslation, messagesTranslationServicesGetAll) {
        var self = this;
        
        self.getAllData = function (callback) {

            dbMessageTranslation.getLastSync().then(function(lastSync){
                
                var promesa = messagesTranslationServicesGetAll.getData(lastSync);
                promesa.then(function (response) {

                    dbMessageTranslation.insert(response, callback);

                }, function (error) {
                    // alert("Error: " + error);

                });    
            });    
        }
        
        return self;
    };


    // MESSAGES SERVICES
    angular.module('igospa.services').service("messagesTranslationServicesGetAll", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function (modifiedSince) {
            var defer = $q.defer();
            $http({
                url: API_URL.url + "messages-translation-all/",
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