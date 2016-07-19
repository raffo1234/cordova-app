(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbMessageTranslationSync', ['dbMessageTranslation', 'messagesTranslationServicesGetAll', dbMessageTranslationSync]);

    // language
    function dbMessageTranslationSync(dbMessageTranslation, messagesTranslationServicesGetAll) {
        var self = this;
        
        self.getAllData = function () {

            dbMessageTranslation.getLastSync().then(function(lastSync){
                
                var promesa = messagesTranslationServicesGetAll.getData(lastSync);
                promesa.then(function (response) {

                    dbMessageTranslation.insert(response);

                }, function (error) {
                    // alert("Error: " + error);

                });    
            });    
        }
        
        return self;
    };


    // MESSAGES SERVICES
    angular.module('igospa.services').service("messagesTranslationServicesGetAll", ["$http", "$q", function ($http, $q) {
        this.getData = function (modifiedSince) {
            var defer = $q.defer();
            $http({
                url: "http://rafaelmeza.com/projects/igospa/api/v1/messages-translation-all/",
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