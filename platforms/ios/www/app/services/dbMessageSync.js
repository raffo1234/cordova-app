(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbMessageSync', ['dbMessage', 'messagesServicesGetAll', dbMessageSync]);

    // language
    function dbMessageSync(dbMessage, messagesServicesGetAll) {
        var self = this;
        
        self.getAllData = function () {
            
            var promesa = messagesServicesGetAll.getData();
            promesa.then(function (response) {
           
                dbMessage.insert(response);
                
            }, function (error) {
                // alert("Error: " + error);
            });  
        }
        
        return self;
    };  


    // MESSAGES SERVICES
    angular.module('igospa.services').service("messagesServicesGetAll", ["$http", "$q", function ($http, $q) {
        this.getData = function () {
            var defer = $q.defer();
            $http.get("http://rafaelmeza.com/projects/igospa/api/v1/messages-all/")
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