(function () {
    'use strict';

    angular.module('igospa')
    .constant('API_URL', {
         // production
        url: 'http://igospa.dhdinc.info/api/v1/'

         // local
        // url: 'http://localhost:888/igospa/api/v1/'
    })
    .constant('ADMIN_URL', {
      // production
      url: 'http://igospa.dhdinc.info/admin/'

      // local
      // url: 'http://localhost:888/igospa/admin/'
    })
    .constant('LIMIT', '10')
    .constant('ITEMS_BY_PAGE', '10')
    .constant('DB_CONFIG', {
        name: 'igospa',
        tables: [
            {
                name: 'language',
                columns: [
                    {name: 'code', type: 'CHAR(2) primary key'},
                    {name: 'name', type: 'VARCHAR(20)'}
                ]
            },
            {
                name: 'note',
                columns: [
                    {name: 'id', type: 'INTEGER primary key AUTOINCREMENT'},
                    {name: 'id_message', type: 'CHAR(5)'},
                    {name: 'content', type: 'VARCHAR(150)'}
                ]
            },
            {
                name: 'message',
                columns: [
                    {name: 'id', type: 'INTEGER primary key'},
                    {name: 'date_created', type: 'DATETIME'},
                    {name: 'year', type: 'CHAR(4)'},
                    {name: 'date', type: 'CHAR(10)'},
                    {name: 'date_day', type: 'CHAR(2)'},
                    {name: 'date_mon', type: 'CHAR(3)'},
                    {name: 'date_yea', type: 'CHAR(4)'},
                    {name: 'lastModified', type: 'VARCHAR(50)'},
                    {name: 'deleted', type: 'VARCHAR(5)'}
                ]
            },
            {
                name: 'message_translation',
                columns: [
                    {name: 'id', type: 'INTEGER primary key'},
                    {name: 'message_id', type: 'INTEGER'},
                    {name: 'language_code', type: 'CHAR(2)'},
                    {name: 'title', type: 'TEXT'},
                    {name: 'excerpt', type: 'TEXT'},
                    {name: 'content', type: 'TEXT'},
                    {name: 'urlweb', type: 'TEXT'},
                    {name: 'lastModified', type: 'VARCHAR(50)'},
                    {name: 'deleted', type: 'VARCHAR(5)'}
                ]
            },

            {
                name: 'new',
                columns: [
                    {name: 'id', type: 'INTEGER primary key'},
                    {name: 'date_created', type: 'DATETIME'},
                    {name: 'date', type: 'CHAR(10)'},
                    {name: 'date_day', type: 'CHAR(2)'},
                    {name: 'date_mon', type: 'CHAR(3)'},
                    {name: 'date_yea', type: 'CHAR(4)'},
                    {name: 'image', type: 'CHAR(200)'},
                    {name: 'lastModified', type: 'VARCHAR(50)'},
                    {name: 'deleted', type: 'VARCHAR(5)'}
                ]
            },
            {
                name: 'new_translation',
                columns: [
                    {name: 'id', type: 'INTEGER primary key'},
                    {name: 'new_id', type: 'INTEGER'},
                    {name: 'language_code', type: 'CHAR(2)'},
                    {name: 'title', type: 'TEXT'},
                    {name: 'excerpt', type: 'TEXT'},
                    {name: 'content', type: 'TEXT'},
                    {name: 'lastModified', type: 'VARCHAR(50)'},
                    {name: 'deleted', type: 'VARCHAR(5)'}
                ]
            },

            {
                name: 'history',
                columns: [
                    {name: 'id', type: 'INTEGER primary key'},
                    {name: 'date_created', type: 'DATETIME'},
                    {name: 'lastModified', type: 'VARCHAR(50)'},
                    {name: 'deleted', type: 'VARCHAR(5)'}
                ]
            },
            {
                name: 'history_translation',
                columns: [
                    {name: 'id', type: 'INTEGER primary key'},
                    {name: 'history_id', type: 'INTEGER'},
                    {name: 'language_code', type: 'CHAR(2)'},
                    {name: 'title', type: 'TEXT'},
                    {name: 'excerpt', type: 'TEXT'},
                    {name: 'content', type: 'TEXT'},
                    {name: 'lastModified', type: 'VARCHAR(50)'},
                    {name: 'deleted', type: 'VARCHAR(5)'}
                ]
            },

            {
                name: 'people',
                columns: [
                    {name: 'id', type: 'INTEGER primary key'},
                    {name: 'date_created', type: 'DATETIME'},
                    {name: 'images', type: 'CHAR(200)'},
                    {name: 'lastModified', type: 'VARCHAR(50)'},
                    {name: 'deleted', type: 'VARCHAR(5)'}
                ]
            },
            {
                name: 'people_image',
                columns: [
                    {name: 'id', type: 'INTEGER primary key'},
                    {name: 'people_id', type: 'INTEGER'},
                    {name: 'image', type: 'CHAR(200)'},
                    {name: 'lastModified', type: 'VARCHAR(50)'},
                    {name: 'deleted', type: 'VARCHAR(5)'}
                ]
            },
            {
                name: 'people_translation',
                columns: [
                    {name: 'id', type: 'INTEGER primary key'},
                    {name: 'people_id', type: 'INTEGER'},
                    {name: 'language_code', type: 'CHAR(2)'},
                    {name: 'firstname', type: 'TEXT'},
                    {name: 'lastname', type: 'TEXT'},
                    {name: 'excerpt', type: 'TEXT'},
                    {name: 'content', type: 'TEXT'},
                    {name: 'lastModified', type: 'VARCHAR(50)'},
                    {name: 'deleted', type: 'VARCHAR(5)'}
                ]
            },

            {
                name: 'place',
                columns: [
                    {name: 'id', type: 'INTEGER primary key'},
                    {name: 'date_created', type: 'DATETIME'},
                    {name: 'image', type: 'CHAR(200)'},
                    {name: 'lastModified', type: 'VARCHAR(50)'},
                    {name: 'deleted', type: 'VARCHAR(5)'}
                ]
            },
            {
                name: 'place_image',
                columns: [
                    {name: 'id', type: 'INTEGER primary key'},
                    {name: 'place_id', type: 'INTEGER'},
                    {name: 'image', type: 'CHAR(200)'},
                    {name: 'lastModified', type: 'VARCHAR(50)'},
                    {name: 'deleted', type: 'VARCHAR(5)'}
                ]
            },
            {
                name: 'place_translation',
                columns: [
                    {name: 'id', type: 'INTEGER primary key'},
                    {name: 'place_id', type: 'INTEGER'},
                    {name: 'language_code', type: 'CHAR(2)'},
                    {name: 'title', type: 'TEXT'},
                    {name: 'content', type: 'TEXT'},
                    {name: 'lastModified', type: 'VARCHAR(50)'},
                    {name: 'deleted', type: 'VARCHAR(5)'}
                ]
            },

            {
                name: 'favorite_message',
                columns: [
                    {name: 'id', type: 'INTEGER primary key'},
                    {name: 'date_created', type: 'datetime'},
                    {name: 'year', type: 'CHAR(4)'},
                    {name: 'date_original', type: 'CHAR(10)'},
                    {name: 'date', type: 'CHAR(10)'},
                    {name: 'date_day', type: 'CHAR(2)'},
                    {name: 'date_mon', type: 'CHAR(3)'},
                    {name: 'date_yea', type: 'CHAR(4)'}
                ]
            },
            {
                name: 'favorite_message_translation',
                columns: [
                    {name: 'id', type: 'INTEGER primary key'},
                    {name: 'message_id', type: 'INTEGER'},
                    {name: 'language_code', type: 'CHAR(2)'},
                    {name: 'title', type: 'TEXT'},
                    {name: 'excerpt', type: 'TEXT'},
                    {name: 'content', type: 'TEXT'},
                    {name: 'urlweb', type: 'TEXT'}
                ]
            },

            {
                name: 'favorite_new',
                columns: [
                    {name: 'id', type: 'INTEGER primary key'},
                    {name: 'date_created', type: 'DATETIME'},
                    {name: 'date_original', type: 'CHAR(10)'},
                    {name: 'date', type: 'CHAR(10)'},
                    {name: 'date_day', type: 'CHAR(2)'},
                    {name: 'date_mon', type: 'CHAR(3)'},
                    {name: 'date_yea', type: 'CHAR(4)'},
                    {name: 'image', type: 'CHAR(200)'},
                    {name: 'lastModified', type: 'VARCHAR(50)'},
                    {name: 'deleted', type: 'VARCHAR(5)'}
                ]
            },
            {
                name: 'favorite_new_translation',
                columns: [
                    {name: 'id', type: 'INTEGER primary key'},
                    {name: 'new_id', type: 'INTEGER'},
                    {name: 'language_code', type: 'CHAR(2)'},
                    {name: 'title', type: 'TEXT'},
                    {name: 'excerpt', type: 'TEXT'},
                    {name: 'content', type: 'TEXT'},
                    {name: 'urlweb', type: 'TEXT'}
                ]
            }

        ]
    });

})();
