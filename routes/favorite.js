var express = require('express');
var router = express.Router();

var database = require('./db');
var querys = require('./querys');

var util = require('util');


// 즐겨찾기 목록
router.get('/favorite', function(req, res, next) {

  let uid = 1;
  let page = 1;
  let listType = 'outer';
  let orderby = 'price';

  let pageStr = req.query.page;
  let typeStr = req.query.type;
  let orderbyStr = req.query.orderby;

  if(pageStr != null)
    page = Number(pageStr);

  if(typeStr != null)
    listType = typeStr;

  if(orderbyStr != null)
    orderby = orderbyStr;

  let queryFunc = querys.selectFavoriteWithProductOuter;

  if(listType == 'outer') {
    queryFunc =querys.selectFavoriteWithProductOuter;
  } else if(listType == 'top') {
    queryFunc =querys.selectFavoriteWithProductTop;
  } else if(listType == 'pants') {
    queryFunc =querys.selectFavoriteWithProductPants;
  } else if(listType == 'shoes') {
    queryFunc =querys.selectFavoriteWithProductShoes;
  } else if(listType == 'hat') {
    queryFunc =querys.selectFavoriteWithProductHat;
  }

  queryString = queryFunc(uid, page);

  var connection = database.connection();  

  connection.connect(function(err) {
    if(err)
    {
      res.render('favorite', { list: [] });      
      return;
    }

    connection.query(queryString,
    function (error, results, fields) {;
  
      connection.end();

      console.log(error);
  
      res.render('favorite', {currentTab:'favorite',
        list: results,
        type: listType,
        page: page});
    });
  });
});

// 즐겨찾기 추가
router.post('/add_favorite', function(req, res, next) {

  var uid = 1;
  var iid = req.body.iid;
  var size_id = req.body.size_id;

  //console.log(req.query);

  // 커넥션 만들기
  var connection = database.connection();

  // 연결하기
  connection.connect(function(err)
    {
      // query 문자열 보내기
      queryString = querys.insertFavorite(uid, iid, size_id);

      // query 보내기
      connection.query(queryString,
        function (error, results, fields) {

          console.log(error);
          console.log(results);

          var text = '해당 사이즈의 상품이 없습니다.';

          //if(results.affectedRows > 0)
          {
            //text = '추가됨';
          }
      
          connection.end();
      
          //res.render('mypage', {currentTab:'mypage', userInfo: selectedUser});
          //res.redirect('/mypage');
          res.render('complete', {text: text, url:'/mypage'});
        });
  });
});

module.exports = router;
