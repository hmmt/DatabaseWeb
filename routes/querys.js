var database = require('./db');


var que = {

  execute: function (query, parms, callback) {
  },
  select: function (query, parms, callback) {
  },
};

let itemPerPage = 10

var querys = {
  
  selectProductTop: function (page) {
    page -= 1;
    return 'SELECT * FROM product_top LIMIT '+itemPerPage+' OFFSET '+(page*itemPerPage);
  },
  selectProductOuter : function (page) {
    page -= 1;
    return 'SELECT * FROM product_outer LIMIT '+itemPerPage+' OFFSET '+(page*itemPerPage);
  },
  selectProductPants : function(page) {
    page -= 1;
    return 'SELECT * FROM product_pants LIMIT '+itemPerPage+' OFFSET '+(page*itemPerPage);
  },
  selectProductShoe : function(page) {
    page -= 1;
    return 'SELECT * FROM product_shoe LIMIT '+itemPerPage+' OFFSET '+(page*itemPerPage);
  },
  selectProductHat : function(page) {
    page -= 1;
    return 'SELECT * FROM product_hat LIMIT '+itemPerPage+' OFFSET '+(page*itemPerPage);
  },
};

module.exports = querys;