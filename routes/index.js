var express = require('express');
var router = express.Router();

var database = require('./db');
var querys = require('./querys')


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


// 모든 상품 목록
router.get('/list', function(req, res, next) {

  let page = 1;
  let listType = 'outer';

  let pageStr = req.query.page;
  let typeStr = req.query.type;

  if(pageStr != null)
    page = Number(pageStr);

  if(typeStr != null)
    listType = typeStr;

  let queryFunc = querys.selectProductOuter;

  if(listType == 'outer')
    queryFunc =querys.selectProductOuter;
  else if(listType == 'top')
    queryFunc =querys.selectProductTop;
   else if(listType == 'pants')
    queryFunc =querys.selectProductPants;
  else if(listType == 'shoe')
    queryFunc =querys.selectProductShoe;
  else if(listType == 'hat')
    queryFunc =querys.selectProductHat;



  var connection = database.connection();  

  connection.connect(function(err) {
    if(err)
    {
      res.render('list', {currentTab:'home', list: [],
        type: listType,
        page: page});      
      return;
    }

    connection.query(queryFunc(page),
    function (error, results, fields) {;
  
      connection.end();
  
      res.render('list', {currentTab:'home', list: results,
        type: listType,
        page: page});
    });
  });
  return;

  /*

  var connection = database.connection();

  connection.connect(function(err)
  {
    console.log(err);
    connection.query('SELECT * FROM shop_item LIMIT 20 OFFSET ?',[page],
    function (error, results, fields) {;
  
      connection.end();
  
      res.render('list', {currentTab:'home', list: results});
    });
  });

  return;
  */

  // db 없으면 여기를 대신 사용
  let itemList = ["1", "2", "3"];
  //let itemList = [];
  res.render('list', {currentTab:'home', list: itemTempList});
});

router.get('/mypage', function(req, res, next) {
  // id를 입력 받았을 때만 사용
  var u_id = Number(req.query.user_id);

  // 일단 유저는 하나만 쓰는 거라서 1로 고정
  u_id = 1;


  var connection = database.connection();

  connection.connect(function(err)
  {
    console.log(err);
    connection.query('SELECT * FROM user WHERE uid=?',
    [u_id],
    function (error, results, fields) {
      console.log(error);
      var selectedUser = null;
      console.log(results);
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

  return;
  // db 없으면 여기를 대신 사용

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
  res.render('recommend', {currentTab:'recommend'});
});

router.get('/mark', function(req, res, next) {
  res.render('mark', {currentTab:'mark'});
});

module.exports = router;
