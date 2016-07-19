var dao =  {

    initialize: function(callback) {
        var self = this;
        this.db = window.openDatabase("igospa", "1.0", "Igospa", 50*1024*1024);

        this.db.transaction(
            function(tx) {
                tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='language'", this.txErrorHandler,
                    function(tx, results) {
                        if (results.rows.length == 1) {
                            log('Using existing Employee table in local SQLite database');
                        }
                        else
                        {
                            log('Employee table does not exist in local SQLite database');

                            //self.createTableMessage(callback);
                             self.createTableLanguage(callback);
                            // self.synLanguage(languages, callback);
                        }
                    });
            }
        )

    },
    
    createTableLanguage: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql =
                    "CREATE TABLE IF NOT EXISTS language ( " +
                    "code CHAR(2) PRIMARY KEY, " +
                    "name VARCHAR(20)" +
                    ")";
                tx.executeSql(sql);
            },
            this.txErrorHandler,
            function() {
                log('Table message successfully CREATED in local SQLite database');
                callback();
            }
        );
    },
    getAllLanguage: function(callback){
        var API_URL = 'http://rafaelmeza.com/projects/igospa/api/v1/',
            language_url = 'languages/';

        $.ajax({
            url: API_URL + language_url,
            data: {},
            dataType:"json",
            success:function (data) {
                log("The server returned " + data.length + ")";
                callback(data);
            },
            error: function(model, response) {
                alert(response.responseText);
            }
        });
    },
    insertTableLanguage: function(languages, callback){
        this.db.transaction(
            function(tx){
                var l = languages.length;
                var sql = 
                    "INSERT INTO language (code, name) " +;
                    "VALUES (?, ?)";
                    log('Inserting or Updating in local database:');
                var e;
                for (var i = 0; i < l; i++) {
                    e = languages[i];
                    log(e.code + ' ' + e.name);
                    var params = [e.code, e.name];
                    tx.executeSql(sql, params);
                }
                log('Inserting complete (' + l + ' items inserted)');
            },
            this.txErrorHandler,
            function(tx) {
                callback();
            }       
        );
    },
    synLanguage: function(callback){
        var self = this;

        log('Starting insertion languages...');
        this.getAllLanguage(function(languages){
            if(languages.length > 0){
                self.insertTableLanguage(languages, callback);
            }else{
                log('Nothing to insert');
                callback();
            }
        });
    },
    createTableMessage: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql =
                    "CREATE TABLE IF NOT EXISTS message ( " +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "date_created datetime" +
                    ")";
                tx.executeSql(sql);
            },
            this.txErrorHandler,
            function() {
                log('Table message successfully CREATED in local SQLite database');
                callback();
            }
        );
    },
    createTableMessageTraslation: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql =
                    "CREATE TABLE IF NOT EXISTS message_translation ( " +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "message_id INTEGER" +
                    "language_code CHAR(2)" +
                    "title TEXT" +
                    "excerpt TEXT" +
                    "content TEXT" +
                    ")";
                tx.executeSql(sql);
            },
            this.txErrorHandler,
            function() {
                log('Table message traslation successfully CREATED in local SQLite database');
                callback();
            }
        );
    },
    txErrorHandler: function(tx) {
        alert(tx.message);
    }

}