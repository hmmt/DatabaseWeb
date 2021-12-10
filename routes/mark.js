var express = require('express');
var router = express.Router();

var database = require('./db');
var querys = require('./querys');


// 즐겨찾기 추가
router.get('/add_mark', function(req, res, next) {
});

router.get('/mark', function(req, res, next) {
  res.render('mark', {currentTab:'mark', list: []});
});

module.exports = router;
