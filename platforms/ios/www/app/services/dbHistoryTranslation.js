(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbHistoryTranslation', ['DB', dbHistoryTranslation]);

    // language
    function dbHistoryTranslation(DB) {
        var self = this;
            
        self.insert = function(items) {
            var l = items.length;
            
            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT OR REPLACE INTO history_translation (id, history_id, language_code, title, excerpt, content, lastModified, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [e.id, e.history_id, e.language_code, e.title, e.excerpt, e.content, e.lastModified, e.deleted])                
            }
        };
            
        self.all = function() {
            return DB.query('SELECT * FROM history_translation')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };
        
        self.getLastSync = function(){
            return DB.query('SELECT MAX(lastModified) as lastSync FROM history_translation')
            .then(function(result){
                return DB.fetch(result, true); // true => width lastSync
            });
        };

        self.getById = function(id) {
            return DB.query('SELECT * FROM history_translation WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        self.dropTable = function(){
            return DB.query('DROP TABLE history_translation');
        }
        
        return self;
    };

})();    