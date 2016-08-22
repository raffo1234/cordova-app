(function () {
    'use strict';

    angular.module('igospa.services').factory('db_message', ['DB', db_message]);

    // language
    function db_message(DB) {
        var self = this;

        self.insert = function(items) {
            var l = items.length;

            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT INTO language (code, name) VALUES (?, ?)", [e.code, e.name])
            }
        };

        self.all = function() {
            return DB.query('SELECT * FROM message')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.getById = function(id) {
            return DB.query('SELECT * FROM language WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        return self;
    };

})();
