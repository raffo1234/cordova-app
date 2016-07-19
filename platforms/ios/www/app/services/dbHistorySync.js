(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbHistorySync', ['dbHistory', 'historyServicesGetAll', dbHistorySync]);

    // language
    function dbHistorySync(dbHistory, historyServicesGetAll) {
        var self = this;
        
        self.getAllData = function () {
            
            var promesa = historyServicesGetAll.getData();
            promesa.then(function (response) {
           
                dbHistory.insert(response);
                
            }, function (error) {
                // alert("Error: " + error);
            });  
        }
        
        return self;
    };  

    angular.module('igospa.services').service("historyServicesGetAll", ["$http", "$q", function ($http, $q) {
        this.getData = function () {
            var defer = $q.defer();
            $http.get("http://rafaelmeza.com/projects/igospa/api/v1/histories-all/")
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