(function () {
    'use strict';

    angular.module('igospa.services').factory('dbFavoriteMessageTranslation', ['DB', dbFavoriteMessageTranslation]);


    function dbFavoriteMessageTranslation(DB) {
        var self = this;

        self.insert = function(items) {
            var l = items.length;

            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT INTO favorite_message_translation (id, message_id, language_code, title, excerpt, content, urlweb) VALUES (?, ?, ?, ?, ?, ?, ?)", [e.id, e.message_id, e.language_code, e.title, e.excerpt, e.content, e.urlweb]);
                console.log(e.id + ' inserted!')
            }
        };

        self.all = function() {
            return DB.query('SELECT * FROM favorite_message_translation')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.getById = function(id) {
            return DB.query('SELECT * FROM favorite_message_translation WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        self.deleteById = function(message_id) {
            return DB.query('DELETE FROM favorite_message_translation WHERE message_id = ?', [message_id])
        };

        self.dropTable = function(){
            return DB.query('DROP TABLE favorite_message_translation');
        }

        return self;
    };

})();
