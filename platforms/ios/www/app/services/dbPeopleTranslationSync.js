(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbPeopleTranslationSync', ['dbPeopleTranslation', 'peopleTranslationServicesGetAll', dbPeopleTranslationSync]);

    // language
    function dbPeopleTranslationSync(dbPeopleTranslation, peopleTranslationServicesGetAll) {
        var self = this;
        
        self.getAllData = function () {

            dbPeopleTranslation.getLastSync().then(function(lastSync){

                var promesa = peopleTranslationServicesGetAll.getData(lastSync);
                promesa.then(function (response) {
                    
                    dbPeopleTranslation.insert(response);
                    
                }, function (error) {
                    // alert("Error: " + error);
                });    
            });    
        }
        
        return self;
    };


    // people SERVICES
    angular.module('igospa.services').service("peopleTranslationServicesGetAll", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function (modifiedSince) {
            var defer = $q.defer();
            $http({
                url: API_URL.url + "people-translation-all/",
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