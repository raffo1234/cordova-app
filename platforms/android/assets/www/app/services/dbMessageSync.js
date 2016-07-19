(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbMessageSync', ['dbMessage', 'messagesServicesGetAll', dbMessageSync]);

    // language
    function dbMessageSync(dbMessage, messagesServicesGetAll) {
        var self = this;
        
        self.getAllData = function (callback) {
            
            dbMessage.getLastSync().then(function(lastSync){

                var promesa = messagesServicesGetAll.getData(lastSync);
                promesa.then(function (response) {
               
                    dbMessage.insert(response, callback);
                    
                }, function (error) {
                    // alert("Error: " + error);
                });
            });  
        }
        
        return self;
    };  


    // MESSAGES SERVICES
    angular.module('igospa.services').service("messagesServicesGetAll", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function (modifiedSince) {
            var defer = $q.defer();
            $http({
                url: API_URL.url + "messages-all/",
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