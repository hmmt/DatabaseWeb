const { query } = require('express');
var express = require('express');
var router = express.Router();

var database = require('./db');
var querys = require('./querys');

router.post('/recommend_favorite', function(req, res, next) {
  //updateCoordiCount
  var uid = 1;
  var coordinate_id = req.body.coordinate_id;

  // 커넥션 만들기
  var connection = database.connection();

  // 연결하기
  connection.connect(function(err)
    {
      // query 문자열 보내기
      queryString = querys.updateCoordiCount(coordinate_id);
      // query 보내기
      connection.query(queryString,
        function (error, results, fields) {

          console.log(error);
          console.log(results);

          var text = '못 찾음';

          if(!error && results.affectedRows > 0)
          {
            text = '완료';
          }
      
          connection.end();
      
          //res.render('mypage', {currentTab:'mypage', userInfo: selectedUser});
          //res.redirect('/mypage');
          res.render('complete', {text: text, url:'/recommend'});
        });
  });
});

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