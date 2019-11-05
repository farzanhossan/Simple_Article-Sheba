var mysql = require('mysql');
var migration = require('mysql-migrations');

var connection = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : 'Admin@123',
  database : 'article_db'
});

migration.init(connection, __dirname + '/migrations');