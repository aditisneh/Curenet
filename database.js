var mysql = require("mysql");

var connection = mysql.createConnection({
    host:'localhost',
    database:'student_database',
    user:'root',
    password:'aditi@27'
});

module.exports = connection;