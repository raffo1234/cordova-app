(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbPlaceTranslation', ['DB', dbPlaceTranslation]);

    // language
    function dbPlaceTranslation(DB) {
        var self = this;
            
        self.insert = function(items) {
            var l = items.length;
            
            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT OR REPLACE INTO place_translation (id, place_id, language_code, title, content, lastModified, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)", [e.id, e.place_id, e.language_code, e.title, e.content, e.lastModified, e.deleted])                
            }
        };
            
        self.all = function() {
            return DB.query('SELECT * FROM place_translation')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };
        
        self.getLastSync = function(){
            return DB.query('SELECT MAX(lastModified) as lastSync FROM place_translation')
            .then(function(result){
                return DB.fetch(result, true); // true => width lastSync
            });
        };

        self.getById = function(id) {
            return DB.query('SELECT * FROM place_translation WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        self.dropTable = function(){
            return DB.query('DROP TABLE place_translation');
        }
        
        return self;
    };

})();    