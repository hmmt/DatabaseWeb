var express = require('express');
var router = express.Router();

var database = require('./db');
var querys = require('./querys');

/*
유저 정보 관련 api 기능 코드
*/
router.get('/mypage', function(req, res, next) {
  // id를 입력 받았을 때만 사용
  var u_id = Number(req.query.user_id);

  // 일단 유저는 하나만 쓰는 거라서 1로 고정
  u_id = 1;

  // 커넥션 만들기
  var connection = database.connection();

  // 연결하기
  connection.connect(function(err)
    {
      // query 문자열 보내기
      queryString = querys.selectUserInfo(u_id);

      // query 보내기
      connection.query(queryString,
        function (error, results, fields) {
        
          var selectedUser = null;

          // 받은 데이터 중에서 uid 같
          for (var user of results) {
            selectedUser = user;
            break;
          }
      
          connection.end();
      
          res.render('mypage', {currentTab:'mypage', userInfo: selectedUser});
        });
    });
});


// 유저 정보 수정
router.post('/modify_user', function(req, res, next) {

  //var uid = req.query.uid;

  // post 는 req.body가 아니라 req.body인듯?
  var uid = req.body.uid;
  var size_top = req.body.size_top;
  var size_bottoms = req.body.size_bottoms;
  var size_shoes = req.body.size_shoes;
  var size_outer = req.body.size_outer;

  //console.log(req.query);

  // 커넥션 만들기
  var connection = database.connection();

  // 연결하기
  connection.connect(function(err)
    {
      // query 문자열 보내기
      queryString = querys.updateUserInfo(uid,
        size_top, size_bottoms, size_shoes, size_outer);

      // query 보내기
      connection.query(queryString,
        function (error, results, fields) {

          console.log(error);
      
          connection.end();
      
          //res.render('mypage', {currentTab:'mypage', userInfo: selectedUser});
          //res.redirect('/mypage');
          res.render('complete', {url:'/mypage'});
        });
  });

  

  //res.send('respond with a resource');
  //res.redirect('/mypage');
});

module.exports = router;
