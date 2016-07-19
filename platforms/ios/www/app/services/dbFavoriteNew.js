(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbFavoriteNew', ['DB', dbFavoriteNew]);

    // language
    function dbFavoriteNew(DB) {
        var self = this;
            
        self.insert = function(items) {
            var l = items.length;
            
            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT INTO favorite_new (id, date_created, image) VALUES (?, ?, ?)", [e.id, e.date_created, e.image]);
                console.log(e.id + ' inserted!')
            }
        };
        
        self.all = function() {
            return DB.query('SELECT * FROM favorite_new')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };
        
        self.getById = function(id) {
            return DB.query('SELECT * FROM favorite_new WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        self.getByIdLanguage = function(id, lang) {
            var query = 'SELECT n.*, nt.title, nt.content, n.image' +
                ' FROM favorite_new n' +
                ' INNER JOIN favorite_new_translation nt ON n.id = nt.new_id' + 
                ' WHERE n.id = ? AND nt.language_code = ?';
            return DB.query(query, [id, lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };


        self.getByLanguage = function(lang) {
            var query = 'SELECT n.*, nt.title, nt.excerpt' +
                ' FROM favorite_new n' +
                ' INNER JOIN favorite_new_translation nt ON n.id = nt.new_id' + 
                ' WHERE nt.language_code = ?';
            return DB.query(query, [lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.deleteById = function(id) {
            return DB.query('DELETE FROM favorite_new WHERE id = ?', [id])
        };

        self.isFavorite = function(id){
            var query = 'SELECT count(*) as count FROM favorite_new WHERE id = ? LIMIT 1';
            return DB.query(query, [id])
            .then(function(result){
                return DB.fetchAll(result);
            });   
        }

        self.dropTable = function() {
            return DB.query('DROP TABLE new');
        };

        return self;
    };

})();    