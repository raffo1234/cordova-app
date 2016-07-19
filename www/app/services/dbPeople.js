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
                DB.query("INSERT OR REPLACE INTO people (id, date_created, images, lastModified, deleted) VALUES (?, ?, ?, ?, ?)", [e.id, e.date_created, e.images, e.lastModified, e.deleted]);
                console.log(e.id + ' inserted!')
            }
        };
        
        self.all = function() {
            return DB.query('SELECT * FROM people')
            .then(function(result){
                return DB.fetchAll(result);
            });
        };
        
        self.getLastSync = function(){
            return DB.query('SELECT MAX(lastModified) as lastSync FROM people')
            .then(function(result){
                return DB.fetch(result, true); // true => width lastSync
            });
        };

        self.getById = function(id) {
            return DB.query('SELECT * FROM people WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
        };

        self.getByLanguage = function(lang) {
            var query = 'SELECT p.*, pt.firstname, pt.lastname, pt.excerpt, pi.image' +
                ' FROM people p' +
                ' INNER JOIN people_translation pt ON p.id = pt.people_id' + 
                ' LEFT JOIN people_image pi ON p.id = pi.people_id' + 
                ' WHERE pt.language_code = ? AND p.deleted=0' + 
                ' GROUP BY p.id' +
                ' ORDER BY p.id ASC';
            return DB.query(query, [lang])
            .then(function(result){
                return DB.fetchAll(result);
            });
        };

        // self.getByIdLanguage = function(id, lang) {
        //     var query = 'SELECT people_id, firstname, lastname, content ' +
        //         ' FROM people_translation' +
        //         ' WHERE people_id = ? AND language_code = ?';
        //     return DB.query(query, [id, lang])
        //     .then(function(result){
        //         return DB.fetchAll(result);
        //     });
        // };

        self.getByIdLanguage = function(id, lang) {
            var query = 'SELECT p.* , pt.firstname, pt.lastname, pt.excerpt, GROUP_CONCAT( pi.image, "@@@@") images ' +
                        ' FROM people p ' +
                        ' INNER JOIN people_translation pt ON p.id = pt.people_id ' +
                        ' LEFT JOIN people_image pi ON p.id = pi.people_id ' +
                        ' WHERE pt.language_code = ? ' +
                        ' AND p.deleted =0 ' +
                        ' AND pt.people_id =  ? ' +
                        ' GROUP BY pi.people_id ' +
                        ' ORDER BY p.id ASC ';
            return DB.query(query, [lang, id])
            .then(function(result){
                console.log(result);
                return DB.fetchAll(result);
            }, function(error){
                console.log(error);
            })
            
        };

        self.dropTable = function() {
            return DB.query('DROP TABLE people');
        };

        return self;
    };

})();    