(function () {
    'use strict';

    angular.module('igospa.services').factory('dbMessageTranslation', ['DB', dbMessageTranslation]);

    // language
    function dbMessageTranslation(DB) {
        var self = this;

        self.insert = function(items, callback) {
            var l = items.length;

            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT OR REPLACE INTO message_translation (id, message_id, language_code, title, excerpt, content, urlweb, lastModified, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [e.id, e.message_id, e.language_code, e.title, e.excerpt, e.content, e.urlweb, e.lastModified, e.deleted])
            }
            if (typeof callback === "function") {
                callback();
            }
        };

        self.all = function() {
            return DB.query('SELECT * FROM message_translation')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.getLastSync = function(){
            return DB.query('SELECT MAX(lastModified) as lastSync FROM message_translation')
            .then(function(result){
                return DB.fetch(result, true); // true => width lastSync
            });
        };

        self.getById = function(id) {
            return DB.query('SELECT * FROM message_translation WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        self.getByIdMessage = function(message_id) {
            return DB.query('SELECT * FROM message_translation WHERE message_id = ?', [message_id])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };


        self.dropTable = function(){
            return DB.query('DROP TABLE message_translation');
        }

        return self;
    };

})();
