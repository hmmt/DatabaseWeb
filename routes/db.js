var mysql      = require('mysql2');

var db = {};
db.connection = function()
{
  var output = mysql.createConnection({
    host     : 'localhost',
    user     : 'dbuser',
    password : 'database',
    
    //database : 'testdb' // 임시
    database : 'webdb' // 임시
  });
  return output;
}

module.exports = db;