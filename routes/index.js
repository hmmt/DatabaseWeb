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

  let page = 1;
  let listType = 'outer';

  let pageStr = req.query.page;
  let typeStr = req.query.type;

  if(pageStr != null)
    page = Number(pageStr);

  if(typeStr != null)
    listType = typeStr;

  let queryFunc = querys.selectProductOuter;

  if(listType == 'outer') {
    queryFunc =querys.selectProductOuter;
  } else if(listType == 'top') {
    queryFunc =querys.selectProductTop;
  } else if(listType == 'pants') {
    queryFunc =querys.selectProductPants;
  } else if(listType == 'shoe') {
    queryFunc =querys.selectProductShoe;
  } else if(listType == 'hat') {
    queryFunc =querys.selectProductHat;
  }

  queryString = queryFunc(page);



  var connection = database.connection();  

  connection.connect(function(err) {
    if(err)
    {
      res.render('list', {currentTab:'home', list: [],
        type: listType,
        page: page});      
      return;
    }

    connection.query(queryString,
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
});

router.get('/recommend', function(req, res, next) {
  res.render('recommend', {currentTab:'recommend', list: []});
});

router.get('/mark', function(req, res, next) {
  res.render('mark', {currentTab:'mark', list: []});
});

module.exports = router;
