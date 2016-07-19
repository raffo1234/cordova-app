(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbPeopleTranslationSync', ['dbPeopleTranslation', 'peopleTranslationServicesGetAll', dbPeopleTranslationSync]);

    // language
    function dbPeopleTranslationSync(dbPeopleTranslation, peopleTranslationServicesGetAll) {
        var self = this;
        
        self.getAllData = function ($location) {
            var promesa = peopleTranslationServicesGetAll.getData();
            promesa.then(function (response) {

                dbPeopleTranslation.insert(response);
                
            }, function (error) {
                // alert("Error: " + error);
            });    
        }
        
        return self;
    };


    // people SERVICES
    angular.module('igospa.services').service("peopleTranslationServicesGetAll", ["$http", "$q", function ($http, $q) {
        this.getData = function ($location) {
            var defer = $q.defer();
            $http.get("http://rafaelmeza.com/projects/igospa/api/v1/people-translation-all/")
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