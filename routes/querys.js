var database = require('./db');


var que = {

  execute: function (query, parms, callback) {
  },
  select: function (query, parms, callback) {
  },
};

let itemPerPage = 10

var querys = {
  
  // 의류 목록 select들
  selectProductTop: function (page) {
    page -= 1;
    output = 'SELECT *, top_name as name FROM product_top LIMIT '+itemPerPage+' OFFSET '+(page*itemPerPage);
    return output;
  },
  selectProductOuter : function (page) {
    page -= 1;
    return 'SELECT *, outer_name as name FROM product_outer LIMIT '+itemPerPage+' OFFSET '+(page*itemPerPage);
  },
  selectProductPants : function(page) {
    page -= 1;
    return 'SELECT *, pants_name as name FROM product_pants LIMIT '+itemPerPage+' OFFSET '+(page*itemPerPage);
  },
  selectProductShoes : function(page) {
    page -= 1;
    return 'SELECT *, shoe_name as name FROM product_shoes LIMIT '+itemPerPage+' OFFSET '+(page*itemPerPage);
  },
  selectProductHat : function(page) {
    page -= 1;
    return 'SELECT *, hat_name as name FROM product_hat LIMIT '+itemPerPage+' OFFSET '+(page*itemPerPage);
  },

  insertFavorite : function(markid, uid, id) {
    //return String.format('INSERT INTO mark (mark_id, uid, item_id) VALUES (%d, %d, %d)', markid, uid, id);
  },

  // 즐겨찾기 목록
  selectMark : function(page) {
    page -= 1;
  },

  // 유저 정보
  selectUserInfo : function(id) {
    return 'SELECT * FROM user WHERE uid='+id;
  },

  updateUserInfo : function(userInfo) {
    return 'UPDATE user SET'
    + ' size_top='+userInfo.size_top
    + ', size_outer='+userInfo.size_outer
    + ' WHERE uid ='+userInfo.id;
  }
};

module.exports = querys;