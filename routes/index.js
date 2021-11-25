var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/list', function(req, res, next) {

  let itemList = ["1", "2", "3"];
  res.render('list', {currentTab:'home', list: itemList});
});
router.get('/mypage', function(req, res, next) {
  res.render('mypage', {currentTab:'mypage'});
});
router.get('/recommend', function(req, res, next) {
  res.render('recommend');
});

module.exports = router;
