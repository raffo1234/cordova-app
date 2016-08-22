(function () {
    'use strict';

    angular.module('igospa.services').factory('dbNewTranslation', ['DB', dbNewTranslation]);

    // language
    function dbNewTranslation(DB) {
        var self = this;

        self.insert = function(items) {
            var l = items.length;

            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT OR REPLACE INTO new_translation (id, new_id, language_code, title, excerpt, content, lastModified, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [e.id, e.new_id, e.language_code, e.title, e.excerpt, e.content, e.lastModified, e.deleted])
            }
        };

        self.all = function() {
            return DB.query('SELECT * FROM new_translation')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.getLastSync = function(){
            return DB.query('SELECT MAX(lastModified) as lastSync FROM new_translation')
            .then(function(result){
                return DB.fetch(result, true); // true => width lastSync
            });
        };

        self.getById = function(id) {
            return DB.query('SELECT * FROM new_translation WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        self.getByIdNew = function(new_id) {
            return DB.query('SELECT * FROM new_translation WHERE new_id = ?', [new_id])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.dropTable = function(){
            return DB.query('DROP TABLE new_translation');
        }

        return self;
    };

})();
