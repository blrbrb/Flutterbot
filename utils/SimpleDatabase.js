
var mysql = require('mysql');

 
class SimpleDatabase {

    constructor() {
      this.pool = mysql.createPool({
        connectionLimit: 10, //yeah 
        host: process.env.SQL_HOST, //ur computer's IP
        port:3306,
        user: 'Flutterbot',
        password: process.env.SQL, //ur MySQL User's Password
        database: 'Flutterbot'
      });
    
    }      
    async query(sqlQuery) {
        return new Promise((resolve, reject) => {
          this.pool.getConnection((err, connection) => {
            if (err) {
              console.error('Error connecting to database:', err);
              reject(err);
              return;
            }
    
            connection.query(sqlQuery, (queryErr, results) => {
              connection.release();
    
              if (queryErr) {
                console.error('Error executing query:', queryErr);
                reject(queryErr);
                return;
              }
    
              resolve(results);
            });
          });
        });
      }
  }
  
  module.exports = {SimpleDatabase};
