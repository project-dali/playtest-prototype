let mysql = require('mysql2');
let secret = require('./db-secret');

let globalResults = [];

// let con = mysql.createConnection({
//     host: credentials.dbCredentials.host,
//     user: credentials.dbCredentials.user,
//     password: credentials.dbCredentials.password,
//     database: credentials.dbCredentials.database
// });

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
        // globalResults = results;
        callback(results);
    });
}

// let con = createCon(secret.dbCredentials);
// console.log(sendQuery('SELECT * FROM prompt WHERE id=3', con))
// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

module.exports.createCon = createCon;
module.exports.sendQuery = sendQuery;
// module.exports.results = globalResults;