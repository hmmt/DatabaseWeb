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

  if(listType == 'outer') {
    queryFunc =querys.selectProductOuter;
  } else if(listType == 'top') {
    queryFunc =querys.selectProductTop;
  } else if(listType == 'pants') {
    queryFunc =querys.selectProductPants;
  } else if(listType == 'shoes') {
    queryFunc =querys.selectProductShoes;
  } else if(listType == 'hat') {
    queryFunc =querys.selectProductHat;
  }

  queryString = queryFunc(page, orderby);



  var connection = database.connection();  

  connection.connect(function(err) {
    if(err)
    {
      res.render('list', {currentTab:'home', list: [],
        type: listType,
        page: page,
        orderby: orderby});      
      return;
    }

    connection.query(queryString,
    function (error, results, fields) {;
  
      connection.end();

      console.log(error)

      

  
      res.render('list', {currentTab:'home', list: results,
        type: listType,
        page: page,
        orderby: orderby});
    });
  });
  return;
});

module.exports = router;
