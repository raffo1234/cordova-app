(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbPeopleTranslation', ['DB', dbPeopleTranslation]);

    // language
    function dbPeopleTranslation(DB) {
        var self = this;
            
        self.insert = function(items) {
            var l = items.length;
            
            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT INTO people_translation (id, people_id, language_code, firstname, lastname, excerpt, content) VALUES (?, ?, ?, ?, ?, ?, ?)", [e.id, e.people_id, e.language_code, e.firstname, e.lastname, e.excerpt, e.content])                
            }
        };
            
        self.all = function() {
            return DB.query('SELECT * FROM people_translation')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };
        
        self.getById = function(id) {
            return DB.query('SELECT * FROM people_translation WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        

        self.dropTable = function(){
            return DB.query('DROP TABLE people_translation');
        }
        
        return self;
    };

})();    