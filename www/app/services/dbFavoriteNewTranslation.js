(function () {
    'use strict';

    angular.module('igospa.services').factory('dbFavoriteNewTranslation', ['DB', dbFavoriteNewTranslation]);

    // language
    function dbFavoriteNewTranslation(DB) {
        var self = this;

        self.insert = function(items) {
            var l = items.length;

            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT INTO favorite_new_translation (id, new_id, language_code, title, excerpt, content, urlweb) VALUES (?, ?, ?, ?, ?, ?, ?)", [e.id, e.new_id, e.language_code, e.title, e.excerpt, e.content, e.urlweb])
            }
        };

        self.all = function() {
            return DB.query('SELECT * FROM favorite_new_translation')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.getById = function(id) {
            return DB.query('SELECT * FROM favorite_new_translation WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        self.deleteById = function(new_id) {
            return DB.query('DELETE FROM favorite_new_translation WHERE new_id = ?', [new_id])
        };

        self.dropTable = function(){
            return DB.query('DROP TABLE favorite_new_translation');
        }

        return self;
    };

})();
