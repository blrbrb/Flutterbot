
var mysql = require('mysql');

class SimpleDatabase {

    constructor() {
        this.connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'Flutterbot',
            password : process.env.SQL,
            database : 'Flutterbot'
          });

        this.connection.connect();
    }
    query(query)
    {
        this.connection.query(query, function (error, results, fields) {
            if (error) throw error;
                return results; 
          });
    } 
}


module.exports = {
    SimpleDatabase
};