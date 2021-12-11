var express = require('express');
var router = express.Router();

var database = require('./db');
var querys = require('./querys');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.redirect('/list');
});


// 모든 상품 목록
router.get('/list', function(req, res, next) {

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

  let queryFunc = querys.selectProductOuter;
  let querySizeFunc = querys.selectSizeOuter;

  if(listType == 'outer') {
    queryFunc =querys.selectProductOuter;
    querySizeFunc = querys.selectSizeOuter;
  } else if(listType == 'top') {
    queryFunc =querys.selectProductTop;
    querySizeFunc = querys.selectSizeTop;
  } else if(listType == 'pants') {
    queryFunc =querys.selectProductPants;
    querySizeFunc = querys.selectSizePants;
  } else if(listType == 'shoes') {
    queryFunc =querys.selectProductShoes;
    querySizeFunc = querys.selectSizeShoes;
  } else if(listType == 'hat') {
    queryFunc =querys.selectProductHat;
    querySizeFunc = querys.selectSizeHat;
  }

  

  var listQueryString = queryFunc(page, orderby);



  var connection = database.connection();  

  connection.connect(function(err) {
    if(err)
    {
      res.render('list', {currentTab:'home',
        uid: uid,
        list: [],
        sizeList: [],
        type: listType,
        page: page,
        orderby: orderby});      
      return;
    }

    //
    connection.query(listQueryString,
    function (error, results, fields) {;

      var addedQueryString = querySizeFunc();
      connection.query(addedQueryString, function(error, resultsSize, fields) {

        connection.end();

        queryString = listQueryString + '\n' + addedQueryString;

        console.log(error);
    
        res.render('list', {currentTab:'home',
          uid: uid,
          list: results,
          sizeList: resultsSize,
          type: listType,
          page: page,
          orderby: orderby});
      });
    });
  });
  return;
});

module.exports = router;
