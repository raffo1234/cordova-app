(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbNew', ['DB', dbNew]);

    // language
    function dbNew(DB) {
        var self = this;
            
        self.insert = function(items) {
            var l = items.length;
            
            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT INTO new (id, date_created, image) VALUES (?, ?, ?)", [e.id, e.date_created, e.image]);
                console.log(e.id + ' inserted!')
            }
        };
        
        self.all = function() {
            return DB.query('SELECT * FROM new')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };
        
        self.getById = function(id) {
            return DB.query('SELECT * FROM new WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        self.getByIdLanguage = function(id, lang) {
            var query = 'SELECT n.*, nt.title, nt.content, n.image' +
                ' FROM new n' +
                ' INNER JOIN new_translation nt ON n.id = nt.new_id' + 
                ' WHERE n.id = ? AND nt.language_code = ?';
            return DB.query(query, [id, lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };


        self.getByLanguage = function(lang) {
            var query = 'SELECT n.*, nt.title, nt.excerpt' +
                ' FROM new n' +
                ' INNER JOIN new_translation nt ON n.id = nt.new_id' + 
                ' WHERE nt.language_code = ?';
            return DB.query(query, [lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.dropTable = function() {
            return DB.query('DROP TABLE new');
        };

        return self;
    };

})();    