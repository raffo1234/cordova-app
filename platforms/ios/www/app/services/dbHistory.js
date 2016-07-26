(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbHistory', ['DB', dbHistory]);

    // language
    function dbHistory(DB) {
        var self = this;
            
        self.insert = function(items) {
            var l = items.length;
            
            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT OR REPLACE INTO history (id, date_created, lastModified, deleted) VALUES (?, ?, ?, ?)", [e.id, e.date_created, e.lastModified, e.deleted]);
                console.log(e.id + ' inserted!')
            }
        };
        
        self.all = function() {
            return DB.query('SELECT * FROM history')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };
            
        self.getLastSync = function(){
            return DB.query('SELECT MAX(lastModified) as lastSync FROM history')
            .then(function(result){
                return DB.fetch(result, true); // true => width lastSync
            });
        };

        self.getById = function(id) {
            return DB.query('SELECT * FROM history WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };



        self.getByLanguage = function(lang) {
            var query = 'SELECT h.*, ht.title, ht.excerpt' +
                ' FROM history h' +
                ' INNER JOIN history_translation ht ON h.id = ht.history_id' + 
                ' WHERE ht.language_code = ? AND h.deleted=0 ORDER BY id ASC';
            return DB.query(query, [lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.getByIdLanguage = function(id, lang) {
            var query = 'SELECT title, content ' +
                ' FROM history_translation' +
                ' WHERE history_id = ? AND language_code = ?';
            return DB.query(query, [id, lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.dropTable = function() {
            return DB.query('DROP TABLE history');
        };

        return self;
    };

})();    