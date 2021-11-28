var express = require('express');
var router = express.Router();

/*
유저 정보 관련 api 기능 코드
*/

/* GET users listing. */
router.get('/modify_user', function(req, res, next) {
  var u_id = req.query.user_id;
  var u_name = req.query.user_name;

  //res.send('respond with a resource');
  res.redirect('/mypage');
});

module.exports = router;
