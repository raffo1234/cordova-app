(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbPeopleSync', ['dbPeople', 'peopleServicesGetAll', dbPeopleSync]);

    // language
    function dbPeopleSync(dbPeople, peopleServicesGetAll) {
        var self = this;
        
        self.getAllData = function () {
            
            var promesa = peopleServicesGetAll.getData();
            promesa.then(function (response) {
           
                dbPeople.insert(response);
                
            }, function (error) {
                // alert("Error: " + error);
            });  
        }
        
        return self;
    };  

    angular.module('igospa.services').service("peopleServicesGetAll", ["$http", "$q", function ($http, $q) {
        this.getData = function () {
            var defer = $q.defer();
            $http.get("http://rafaelmeza.com/projects/igospa/api/v1/people-all/")
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