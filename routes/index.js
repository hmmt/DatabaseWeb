var express = require('express');
var router = express.Router();


// 임시 유저 정보
let userTempList = [
  {
    id: 1,
    name: 'AAA',
    size_top: 100,
    size_bottom: 105
  },
  {
    id: 2,
    name: 'BBB',
    size_top: 110,
    size_bottom: 120
  }
];

// 임시 상점목록 리스트
let itemTempList = [
  {
    id:1,
    name:'testname1',
    desc:'testdesc1',
    img:'img1'
  },
  {
    id:2,
    name:'testname2',
    desc:'testdesc2',
    img:'img2'
  },
  {
    id:3,
    name:'testname2',
    desc:'testdesc2',
    img:'img3'
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/list', function(req, res, next) {

  let itemList = ["1", "2", "3"];
  //let itemList = [];
  res.render('list', {currentTab:'home', list: itemTempList});
});

router.get('/mypage', function(req, res, next) {
  // id를 입력 받았을 때만 사용
  var u_id = Number(req.query.user_id);

  // 일단 유저는 하나만 쓰는 거라서 1로 고정
  u_id = 1;

  var selectedUser = null;
  for (var user of userTempList) {
    if(u_id == user.id)
    {
      selectedUser = user;
      break;
    }
  }

  res.render('mypage', {currentTab:'mypage', userInfo: selectedUser});
});
router.get('/recommend', function(req, res, next) {
  res.render('recommend');
});

module.exports = router;
