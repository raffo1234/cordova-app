(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbPeople', ['DB', dbPeople]);

    // language
    function dbPeople(DB) {
        var self = this;
            
        self.insert = function(items) {
            var l = items.length;
            
            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT INTO people (id, date_created, images) VALUES (?, ?, ?)", [e.id, e.date_created, e.images]);
                console.log(e.id + ' inserted!')
            }
        };
        
        self.all = function() {
            return DB.query('SELECT * FROM people')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };
        
        self.getById = function(id) {
            return DB.query('SELECT * FROM people WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        self.getByLanguage = function(lang) {
            var query = 'SELECT p.*, pt.firstname, pt.lastname, pt.excerpt' +
                ' FROM people p' +
                ' INNER JOIN people_translation pt ON p.id = pt.people_id' + 
                ' WHERE pt.language_code = ? ORDER BY date_created DESC';
            return DB.query(query, [lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.getByIdLanguage = function(id, lang) {
            var query = 'SELECT firstname, lastname, content ' +
                ' FROM people_translation' +
                ' WHERE people_id = ? AND language_code = ?';
            return DB.query(query, [id, lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.dropTable = function() {
            return DB.query('DROP TABLE people');
        };

        return self;
    };

})();    