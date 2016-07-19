(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbPeopleImage', ['DB', dbPeopleImage]);

    // language
    function dbPeopleImage(DB) {
        var self = this;
            
        self.insert = function(items) {
            var l = items.length;
            
            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT OR REPLACE INTO people_image (id, people_id, image, lastModified, deleted) VALUES (?, ?, ?, ?, ?)", [e.id, e.people_id, e.image, e.lastModified, e.deleted])                
            }
        };
            
        self.all = function() {
            return DB.query('SELECT * FROM people_image')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };
        
        self.getLastSync = function(){
            return DB.query('SELECT MAX(lastModified) as lastSync FROM people_image')
            .then(function(result){
                return DB.fetch(result, true); // true => width lastSync
            });
        };

        self.getById = function(id) {
            return DB.query('SELECT * FROM people_image WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        self.dropTable = function(){
            return DB.query('DROP TABLE people_image');
        }
        
        return self;
    };

})();    