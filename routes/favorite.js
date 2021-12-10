var express = require('express');
var router = express.Router();

var database = require('./db');
var querys = require('./querys');


// 즐겨찾기 추가
router.get('/add_favorite', function(req, res, next) {
});

router.get('/favorite', function(req, res, next) {
  res.render('favorite', {currentTab:'favorite', list: []});
});

module.exports = router;
