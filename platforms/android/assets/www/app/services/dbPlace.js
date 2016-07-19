(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbPlace', ['DB', dbPlace]);

    // language
    function dbPlace(DB) {
        var self = this;
            
        self.insert = function(items) {
            var l = items.length;
            
            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT OR REPLACE INTO place (id, date_created, image, lastModified, deleted) VALUES (?, ?, ?, ?, ?)", [e.id, e.date_created, e.image, e.lastModified, e.deleted]);
                console.log(e.id + ' inserted!')
            }
        };
        
        self.all = function() {
            return DB.query('SELECT * FROM place')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };
        
         self.getLastSync = function(){
            return DB.query('SELECT MAX(lastModified) as lastSync FROM place')
            .then(function(result){
                return DB.fetch(result, true); // true => width lastSync
            });
        };

        self.getById = function(id) {
            return DB.query('SELECT * FROM place WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        self.getByLanguage = function(lang) {
            var query = 'SELECT p.*, p.deleted, pt.title, pt.content' +
                ' FROM place p' +
                ' INNER JOIN place_translation pt ON p.id = pt.place_id' + 
                ' WHERE pt.language_code = ? AND p.deleted=0 ORDER BY p.id ASC';
            return DB.query(query, [lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.getByIdLanguage = function(id, lang) {
            var query = 'SELECT p.*, p.deleted, pt.title, pt.content' +
                ' FROM place p' +
                ' INNER JOIN place_translation pt ON p.id = pt.place_id' + 
                ' WHERE pt.place_id = ? AND pt.language_code = ? AND p.deleted=0 ORDER BY id ASC';
            return DB.query(query, [id, lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.dropTable = function() {
            return DB.query('DROP TABLE place');
        };

        return self;
    };

})();    