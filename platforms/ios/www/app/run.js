(function () {
    'use strict';

    angular.module('igospa')
    .run(['$rootScope', '$state', '$stateParams', 'DB', 'dbLanguage', 
        'dbMessage', 
        'dbMessageSync', 
        'dbMessageTranslation', 
        'dbMessageTranslationSync', 
        'dbNew', 
        'dbNewSync', 
        'dbNewTranslation', 
        'dbNewTranslationSync', 
        'dbHistory', 
        'dbHistorySync', 
        'dbHistoryTranslation', 
        'dbHistoryTranslationSync', 
        'dbPeople', 
        'dbPeopleSync', 
        'dbPeopleTranslation', 
        'dbPeopleTranslationSync', 
        'dbPlace', 
        'dbPlaceSync', 
        'dbPlaceTranslation', 
        'dbPlaceTranslationSync', 
        function ($rootScope, $state, $stateParams, DB, dbLanguage, 
            dbMessage, 
            dbMessageSync, 
            dbMessageTranslation, 
            dbMessageTranslationSync,
            dbNew, 
            dbNewSync, 
            dbNewTranslation, 
            dbNewTranslationSync, 
            dbHistory, 
            dbHistorySync, 
            dbHistoryTranslation, 
            dbHistoryTranslationSync, 
            dbPeople, 
            dbPeopleSync, 
            dbPeopleTranslation, 
            dbPeopleTranslationSync, 
            dbPlace, 
            dbPlaceSync, 
            dbPlaceTranslation, 
            dbPlaceTranslationSync ) {
        	
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            // Web sql
            DB.init();


            // set default language
            localStorage.setItem('lang', 'es');


            // Populate table language
            var languages = [
                    {code: 'es', name: 'Español'},
                    {code: 'en', name: 'Inglés'},                
                    {code: 'it', name: 'Italiano'}                
                ];            
            dbLanguage.insert(languages);


            // if !isOnline return false;
            // ...

            

            // Populate websql - local database

            // Mensajes
            dbMessageSync.getAllData();    
            dbMessageTranslationSync.getAllData();    

            // News
            dbNewSync.getAllData();    
            dbNewTranslationSync.getAllData();    

            // History
            dbHistorySync.getAllData();    
            dbHistoryTranslationSync.getAllData();    

            // People
            dbPeopleSync.getAllData();    
            dbPeopleTranslationSync.getAllData();    

            // Place
            dbPlaceSync.getAllData();    
            dbPlaceTranslationSync.getAllData();    





            // dbMessage.dropTable();
            // dbMessageTranslation.dropTable();
        }
      ]
    );

    

})();
