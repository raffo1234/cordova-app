(function () {
    'use strict';

    angular.module('igospa')
    .run(['$rootScope', '$location', '$state', '$stateParams', 'DB', 'dbLanguage',
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
        'dbPlaceImage',
        'dbPlaceImageSync',
        'dbPlaceTranslation',
        'dbPlaceTranslationSync',
        function ($rootScope, $location, $state, $stateParams, DB, dbLanguage,
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
            dbPlaceImage,
            dbPlaceImageSync,
            dbPlaceTranslation,
            dbPlaceTranslationSync ) {

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            // Web sql
            DB.init();




            // Populate table language
            var languages = [
                    {code: 'es', name: 'Español'},
                    {code: 'en', name: 'Inglés'},
                    {code: 'it', name: 'Italiano'}
                ];
            dbLanguage.insert(languages);


            //

            // if(){
            //   $state.go('');
            // }

            // Populate websql - local database

            // Mensajes
            // dbMessageSync.getAllData();
            // dbMessageTranslationSync.getAllData();

            // News
            // dbNewSync.getAllData();
            // dbNewTranslationSync.getAllData();

            // History
            // dbHistorySync.getAllData();
            // dbHistoryTranslationSync.getAllData();

            // People
            // dbPeopleSync.getAllData();
            // dbPeopleTranslationSync.getAllData();

            // Place
            // dbPlaceSync.getAllData();
            // dbPlaceImageSync.getAllData();
            // dbPlaceTranslationSync.getAllData();


            // dbHistory.dropTable();
            // dbHistoryTranslation.dropTable();


            
            // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            //   console.log('erer222')
            // });
        }
      ]
    );



})();
