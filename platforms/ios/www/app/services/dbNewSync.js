(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbNewSync', ['dbNew', 'newServicesGetAll', dbNewSync]);

    // language
    function dbNewSync(dbNew, newServicesGetAll) {
        var self = this;
        
        self.getAllData = function () {
            
            var promesa = newServicesGetAll.getData();
            promesa.then(function (response) {
           
                dbNew.insert(response);
                
            }, function (error) {
                // alert("Error: " + error);
            });  
        }
        
        return self;
    };  

    angular.module('igospa.services').service("newServicesGetAll", ["$http", "$q", function ($http, $q) {
        this.getData = function () {
            var defer = $q.defer();
            $http.get("http://rafaelmeza.com/projects/igospa/api/v1/news-all/")
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