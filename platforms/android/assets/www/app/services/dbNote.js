(function () {
    'use strict';

    angular.module('igospa.services').factory('dbNote', ['DB', dbNote]);

    function dbNote(DB) {
        var self = this;

        self.insert = function(id_message, notes) {
            var l = notes.length;

            var e;
            for (var i = 0; i < l; i++) {
                e = notes[i];
                DB.query("INSERT INTO note (id_message, content) VALUES (?, ?)", [id_message, e.content])                
            }
        };

        self.all = function() {
            return DB.query('SELECT * FROM note')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.getById = function(id) {
            return DB.query('SELECT * FROM note WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        self.getByIdMessage = function(id_message) {
            return DB.query('SELECT * FROM note WHERE id_message = ?', [id_message])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.deleteById = function(id) {
            return DB.query('DELETE FROM note WHERE id = ?', [id])
        };

        self.dropTable = function() {
            return DB.query('DROP TABLE note');
        };

        return self;
    };

})();