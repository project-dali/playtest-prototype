let mysql = require('mysql2');
let credentials = require('./db-secret');

let con = mysql.createConnection({
    host: credentials.dbCredentials.host,
    user: credentials.dbCredentials.user,
    password: credentials.dbCredentials.password,
    database: credentials.dbCredentials.database
});

con.query(
    'SELECT * FROM prompt WHERE id = 5',
    function (err, results, fields) {
        if (err) throw err;
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available

        module.exports.sqlData = results;
    }
);