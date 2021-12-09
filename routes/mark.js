var express = require('express');
var router = express.Router();

var database = require('./db');
var querys = require('./querys');


router.get('/mark', function(req, res, next) {
  res.render('mark', {currentTab:'mark', list: []});
});

module.exports = router;
