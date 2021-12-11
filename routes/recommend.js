var express = require('express');
var router = express.Router();

var database = require('./db');
var querys = require('./querys');

router.get('/recommend', function(req, res, next) {

  queryString = querys.selectAllCoordinate();

  var connection = database.connection();  

  connection.connect(function(err) {
    if(err)
    {
      res.render('recommend', { list: [] });      
      return;
    }

    connection.query(queryString,
    function (error, results, fields) {;
  
      connection.end();

      console.log(error);
  
      res.render('recommend', {currentTab:'recommend',
        list: results});
    });
  });
});


module.exports = router;