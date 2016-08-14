(function () {
    'use strict';

    angular.module('igospa.services').factory('dbFavoriteMessage', ['DB', dbFavoriteMessage]);


    function dbFavoriteMessage(DB) {
        var self = this;

        self.insert = function(items) {
            var l = items.length;
            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT INTO favorite_message (id, date_created, year, date_original, date, date_day, date_mon, date_yea) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [e.id, e.date_created, e.year, e.date_original, e.date, e.date_day, e.date_mon, e.date_yea]);
                console.log(e.id + ' inserted!')
            }
        };

        self.all = function() {
            return DB.query('SELECT * FROM favorite_message')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.getById = function(id) {
            return DB.query('SELECT * FROM favorite_message WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        self.getByLanguage = function(lang) {
            var query = 'SELECT m.*, mt.title, mt.excerpt' +
                ' FROM favorite_message m' +
                ' INNER JOIN favorite_message_translation mt ON m.id = mt.message_id' +
                ' WHERE mt.language_code = ? ORDER BY m.date_original DESC ';
            return DB.query(query, [lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.getByIdLanguage = function(id, lang) {
            var query = 'SELECT m.*, mt.* ' +
                ' FROM favorite_message m' +
                ' INNER JOIN favorite_message_translation mt ON m.id = mt.message_id' +
                ' WHERE message_id = ? AND language_code = ?';
            return DB.query(query, [id, lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.getByYearLanguage = function(year, lang) {
            var query = "SELECT m.*, mt.title, mt.excerpt" +
                " FROM favorite_message m" +
                " INNER JOIN favorite_message_translation mt ON m.id = mt.message_id" +
                " WHERE year LIKE ? AND mt.language_code = ? ORDER BY m.date_original DESC ";
            return DB.query(query, ["%" + year + "%", lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.deleteById = function(id) {
            return DB.query('DELETE FROM favorite_message WHERE id = ?', [id])
        };

        self.isFavorite = function(id){
            var query = 'SELECT count(*) as count FROM favorite_message WHERE id = ? LIMIT 1';
            return DB.query(query, [id])
            .then(function(result){
                return DB.fetchAll(result);
            });
        }


        self.dropTable = function() {
            return DB.query('DROP TABLE favorite_message');
        };

        return self;
    };

})();
