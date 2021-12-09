var express = require('express');
var router = express.Router();

var database = require('./db');
var querys = require('./querys');

router.get('/recommend', function(req, res, next) {
  res.render('recommend', {currentTab:'recommend', list: []});
});


module.exports = router;