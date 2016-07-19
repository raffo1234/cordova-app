(function () {
    'use strict';

    angular.module('igospa.controllers').controller('messagesByYearController', messagesByYearController);

    function messagesByYearController($scope, $http, $stateParams, $location, messagesServices, dbMessage, 
        dbMessageSync,
        dbMessageTranslationSync
        ){
        
        // MESSAGES       
        var main = $('#main'),
        loading = $('.loading-js'),
        year = $stateParams.year || '';

        TweenLite.set(loading, {opacity: 1});
        TweenLite.set(main, {opacity: 0});



        /* ------------------------------------------ */    
        // populate
        /* ------------------------------------------ */    
        dbMessageSync.getAllData();   
        dbMessageTranslationSync.getAllData();    



        /* ------------------------------------------ */    
        // isOffline
        /* ------------------------------------------ */ 
        var result = [];
        dbMessage.getByYearLanguage(year, localStorage.getItem('lang')).then(function(response){
            $scope.result = response;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, .45, {opacity: 1});                    
        });    
           
        



        /* ------------------------------------------ */    
        // isOnline
        /* ------------------------------------------ */    
        return;
        var promesa = messagesServices.getData(year);
        var result = [];
        promesa.then(function (response) {
            
            $scope.result = response;
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});                

        }, function (error) {
            // alert("Error: " + error);
        });

    }

    
})();

