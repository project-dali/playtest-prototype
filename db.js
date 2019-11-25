let mysql = require('mysql2');
let secret = require('./db-secret');

function createCon(credentials) {
    let connection = mysql.createConnection({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password,
        database: credentials.database
    });
    return connection;
}

function sendQuery(query, connection, callback) {
    connection.query(query, function (err, results, fields) {
        if (err) throw err;
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available    
        callback(results);
    });
}

module.exports.createCon = createCon;
module.exports.sendQuery = sendQuery;