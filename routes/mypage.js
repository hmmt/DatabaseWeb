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


  var connection = database.connection();

  connection.connect(function(err)
  {
    //console.log(err);

    queryString = querys.selectUserInfo(u_id);


    connection.query(queryString,
    function (error, results, fields) {
      
      var selectedUser = null;

      for (var user of results) {
        if(u_id == user.uid)
        {
          selectedUser = user;
          break;
        }
      }
  
      connection.end();
  
      res.render('mypage', {currentTab:'mypage', userInfo: selectedUser});
    });
  });
});


/* GET users listing. */
router.get('/modify_user', function(req, res, next) {
  var u_id = req.query.user_id;
  var u_name = req.query.user_name;

  //res.send('respond with a resource');
  res.redirect('/mypage');
});

module.exports = router;
