(function () {
    'use strict';

    angular.module('igospa.services').factory('dbMessage', ['DB', dbMessage]);

    // language
    function dbMessage(DB) {
        var self = this;

        self.insert = function(items, callback) {
            var l = items.length;

            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT OR REPLACE INTO message (id, date_created, year, date, date_day, date_mon, date_yea, lastModified, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [e.id, e.date_created, e.year, e.date, e.date_day, e.date_mon, e.date_yea, e.lastModified, e.deleted]);

            }
            if (typeof callback === "function") {
                callback();
            }
        };

        self.all = function() {
            return DB.query('SELECT * FROM message')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };


        self.getLastSync = function(){
            return DB.query('SELECT MAX(lastModified) as lastSync FROM message')
            .then(function(result){
                return DB.fetch(result, true); // true => width lastSync
            });
        };

        self.getById = function(id) {
            return DB.query('SELECT * FROM message WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };
        self.getByLanguage = function(lang) {
            var query = 'SELECT m.*, mt.title, mt.excerpt' +
                ' FROM message m' +
                ' INNER JOIN message_translation mt ON m.id = mt.message_id' +
                ' WHERE mt.language_code = ? AND m.deleted=0 ORDER BY m.id ASC';
            return DB.query(query, [lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.getByIdLanguage = function(id, lang) {
            var query = 'SELECT title, content ' +
                ' FROM message_translation' +
                ' WHERE message_id = ? AND language_code = ?';
            return DB.query(query, [id, lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.getByYearLanguage = function(year, lang) {
            var query = "SELECT m.*, mt.title, mt.excerpt" +
                " FROM message m" +
                " INNER JOIN message_translation mt ON m.id = mt.message_id" +
                " WHERE year LIKE ? AND mt.language_code = ? AND m.deleted=0";
            return DB.query(query, ["%" + year + "%", lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.getByYearLanguagePagging = function(year, lang, limit, offset) {
            var query = "SELECT m.*, mt.title, mt.excerpt" +
                " FROM message m" +
                " INNER JOIN message_translation mt ON m.id = mt.message_id" +
                " WHERE year LIKE ? AND mt.language_code = ? AND m.deleted=0 " +
                " LIMIT ? OFFSET ? ";
            return DB.query(query, ["%" + year + "%", lang, limit, offset])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.dropTable = function() {
            return DB.query('DROP TABLE message');
        };

        return self;
    };

})();
