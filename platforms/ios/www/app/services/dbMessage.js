(function () {
    'use strict';
    
    angular.module('igospa.services').factory('dbMessage', ['DB', dbMessage]);

    // language
    function dbMessage(DB) {
        var self = this;
            
        self.insert = function(items) {
            var l = items.length;
            
            var e;
            for (var i = 0; i < l; i++) {
                e = items[i];
                DB.query("INSERT INTO message (id, date_created, date_updated) VALUES (?, ?, ?)", [e.id, e.date_created, e.date_updated]);
                console.log(e.id + ' inserted!')
            }
        };
        
        self.all = function() {
            return DB.query('SELECT * FROM message')
            .then(function(result){
                return DB.fetchAll(result);
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
                ' WHERE mt.language_code = ? ORDER BY date_created DESC';
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
                " WHERE date_created LIKE ? AND mt.language_code = ?";
            return DB.query(query, ["%" + year + "%", lang])
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