(function () {
    'use strict';

    angular.module('igospa.services').factory('db_favorite_message', ['DB', db_favorite_message]);

    // language
    function db_favorite_message(DB) {
        var self = this;

        self.all = function() {
            return DB.query('SELECT * FROM favorite_message')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.getById = function(id) {
            return DB.query('SELECT * FROM favorite_message WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        return self;
    };

})();
