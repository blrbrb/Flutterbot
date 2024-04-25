
var mysql = require('mysql');
// Create a MySQL connection pool

 
class SimpleDatabase {

    constructor() {
      this.pool = mysql.createPool({
        connectionLimit: 10, // Adjust according to your database needs
        host: 'localhost',
        user: 'Flutterbot',
        password: process.env.SQL,
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