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
                DB.query("INSERT OR REPLACE INTO new (id, date_created, date, date_day, date_mon, date_yea, image, lastModified, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [e.id, e.date_created, e.date, e.date_day, e.date_mon, e.date_yea, e.image, e.lastModified, e.deleted]);
                console.log(e.id + ' inserted!')
            }
        };

        self.all = function() {
            return DB.query('SELECT * FROM new')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        self.getLastSync = function(){
            return DB.query('SELECT MAX(lastModified) as lastSync FROM new')
            .then(function(result){
                return DB.fetch(result, true); // true => width lastSync
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
                ' WHERE n.id = ? AND nt.language_code = ? AND n.deleted=0 ORDER BY id DESC';
            return DB.query(query, [id, lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };


        self.getByLanguage = function(lang) {
            var query = 'SELECT n.*, nt.title, nt.excerpt' +
                ' FROM new n' +
                ' INNER JOIN new_translation nt ON n.id = nt.new_id' +
                ' WHERE nt.language_code = ? AND n.deleted=0 ORDER BY id DESC';
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
