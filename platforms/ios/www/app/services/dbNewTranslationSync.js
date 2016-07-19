(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbNewTranslationSync', ['dbNewTranslation', 'newsTranslationServicesGetAll', dbNewTranslationSync]);

    // language
    function dbNewTranslationSync(dbNewTranslation, newsTranslationServicesGetAll) {
        var self = this;
        
        self.getAllData = function ($location) {
            var promesa = newsTranslationServicesGetAll.getData();
            promesa.then(function (response) {

                dbNewTranslation.insert(response);
                
            }, function (error) {
                // alert("Error: " + error);
            });    
        }
        
        return self;
    };


    // news SERVICES
    angular.module('igospa.services').service("newsTranslationServicesGetAll", ["$http", "$q", function ($http, $q) {
        this.getData = function ($location) {
            var defer = $q.defer();
            $http.get("http://rafaelmeza.com/projects/igospa/api/v1/news-translation-all/")
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