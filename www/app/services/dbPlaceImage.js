(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbPlaceImage', ['DB', dbPlaceImage]);

    // language
    function dbPlaceImage(DB) {
        var self = this;
            
        self.insert = function(items) {
            var l = items.length;
            
            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT OR REPLACE INTO place_image (id, place_id, image, lastModified, deleted) VALUES (?, ?, ?, ?, ?)", [e.id, e.place_id, e.image, e.lastModified, e.deleted])                
            }
        };
            
        self.all = function() {
            return DB.query('SELECT * FROM place_image')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };
        
        self.getLastSync = function(){
            return DB.query('SELECT MAX(lastModified) as lastSync FROM place_image')
            .then(function(result){
                return DB.fetch(result, true); // true => width lastSync
            });
        };

        self.getById = function(id) {
            return DB.query('SELECT * FROM place_image WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        self.dropTable = function(){
            return DB.query('DROP TABLE place_image');
        }
        
        return self;
    };

})();    