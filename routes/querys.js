const { URITooLong } = require('http-errors');
var database = require('./db');
var util = require('util')

let itemPerPage = 10

var querys = {

  queryStr: '',

  addQueryLog: function(str) {
    querys.queryStr += str;
  },

  clearQueryLog: function() {
    querys.queryStr = '';
  },


  
  // 의류 목록 select들
  selectProductTop: function (page, orderBy) {
    page -= 1
    var orderByString = ''
    if(orderBy == 'price')
      orderByString = ' ORDER BY price ASC'
    else if(orderBy == 'sales')
      orderByString = ' ORDER BY sales_count DESC'
    else if(orderBy == 'release')
      orderByString = ' ORDER BY release_year DESC, season'

    return util.format('SELECT *, top_name as name FROM product_top%s LIMIT %d OFFSET %d', orderByString, itemPerPage, page*itemPerPage);
  },
  // 지금 안 씀
  selectProductTopWithSize : function(page, orderBy) {
    page -= 1;
    var orderByString = ''
    if(orderBy == 'price')
      orderByString = ' ORDER BY price ASC'
    else if(orderBy == 'sales')
      orderByString = ' ORDER BY sales_count DESC'
      else if(orderBy == 'release')
      orderByString = ' ORDER BY release_year DESC, season'

    return util.format(`SELECT pd.iid, pd.top_name AS \`name\`, pd.brand, pd.gender, pd.release_year, pd.season, pd.sales_count, pd.price, pd.img, goods.goods_id
FROM (SELECT * FROM product_top%s LIMIT %d OFFSET %d) pd LEFT JOIN goods ON goods.iid=pd.iid`, orderByString, itemPerPage, page*itemPerPage);
  },

  selectProductOuter : function (page, orderBy) {
    page -= 1;
    var orderByString = ''
    if(orderBy == 'price')
      orderByString = ' ORDER BY price ASC'
    else if(orderBy == 'sales')
      orderByString = ' ORDER BY sales_count DESC'
      else if(orderBy == 'release')
      orderByString = ' ORDER BY release_year DESC, season'

    return util.format('SELECT *, outer_name as name FROM product_outer%s LIMIT %d OFFSET %d', orderByString, itemPerPage, page*itemPerPage);
  },

  // 지금 안 씀
  selectProductOuterWithSize : function (page, orderBy) {
    page -= 1;
    var orderByString = ''
    if(orderBy == 'price')
      orderByString = ' ORDER BY price ASC'
    else if(orderBy == 'sales')
      orderByString = ' ORDER BY sales_count DESC'
    else if(orderBy == 'release')
      orderByString = ' ORDER BY release_year DESC, season'

    return util.format(`SELECT pd.iid, pd.outer_name AS \`name\`, pd.brand, pd.gender, pd.release_year, pd.season, pd.sales_count, pd.price, pd.img, goods.goods_id
FROM (SELECT * FROM product_outer%s LIMIT %d OFFSET %d) pd LEFT JOIN goods ON goods.iid=pd.iid`, orderByString, itemPerPage, page*itemPerPage);
  },

  selectProductPants : function(page, orderBy) {
    page -= 1;
    var orderByString = ''
    if(orderBy == 'price')
      orderByString = ' ORDER BY price ASC'
    else if(orderBy == 'sales')
      orderByString = ' ORDER BY sales_count DESC'
    else if(orderBy == 'release')
      orderByString = ' ORDER BY release_year DESC, season'

    return util.format('SELECT *, pants_name as name FROM product_pants%s LIMIT %d OFFSET %d', orderByString, itemPerPage, page*itemPerPage);
  },

  // 지금 안 씀
  selectProductPantsWithSize : function(page, orderBy) {
    page -= 1;
    var orderByString = ''
    if(orderBy == 'price')
      orderByString = ' ORDER BY price ASC'
    else if(orderBy == 'sales')
      orderByString = ' ORDER BY sales_count DESC'
    else if(orderBy == 'release')
      orderByString = ' ORDER BY release_year DESC, season'

    return util.format(`SELECT pd.iid, pd.pants_name AS \`name\`, pd.brand, pd.gender, pd.release_year, pd.season, pd.sales_count, pd.price, pd.img, goods.goods_id
FROM (SELECT * FROM product_pants%s LIMIT %d OFFSET %d) pd LEFT JOIN goods ON goods.iid=pd.iid`, orderByString, itemPerPage, page*itemPerPage);
  },
  selectProductShoes : function(page, orderBy) {
    page -= 1;
    var orderByString = ''
    if(orderBy == 'price')
      orderByString = ' ORDER BY price ASC'
    else if(orderBy == 'sales')
      orderByString = ' ORDER BY sales_count DESC'
    else if(orderBy == 'release')
      orderByString = ' ORDER BY release_year DESC, season'

    return util.format('SELECT *, shoe_name as name FROM product_shoes%s LIMIT %d OFFSET %d', orderByString, itemPerPage, page*itemPerPage);
  },

  // 지금 안 씀
  selectProductShoesWithSize : function(page, orderBy) {
    page -= 1;
    var orderByString = ''
    if(orderBy == 'price')
      orderByString = ' ORDER BY price ASC'
    else if(orderBy == 'sales')
      orderByString = ' ORDER BY sales_count DESC'
    else if(orderBy == 'release')
      orderByString = ' ORDER BY release_year DESC, season'

    return util.format(`SELECT pd.iid, pd.shoe_name AS \`name\`, pd.brand, pd.gender, pd.release_year, pd.season, pd.sales_count, pd.price, pd.img, goods.goods_id
FROM (SELECT * FROM product_shoes%s LIMIT %d OFFSET %d) pd LEFT JOIN goods ON goods.iid=pd.iid`, orderByString, itemPerPage, page*itemPerPage);
  },
  selectProductHat : function(page, orderBy) {
    page -= 1;
    var orderByString = ''
    if(orderBy == 'price')
      orderByString = ' ORDER BY price ASC'
    else if(orderBy == 'sales')
      orderByString = ' ORDER BY sales_count DESC'
    else if(orderBy == 'release')
      orderByString = ' ORDER BY release_year DESC, season'

    return util.format('SELECT *, hat_name as name FROM product_hat%s LIMIT %d OFFSET %d', orderByString, itemPerPage, page*itemPerPage);
  },

  // 지금 안 씀
  selectProductHatWithSize : function(page, orderBy) {
    page -= 1;
    var orderByString = ''
    if(orderBy == 'price')
      orderByString = ' ORDER BY price ASC'
    else if(orderBy == 'sales')
      orderByString = ' ORDER BY sales_count DESC'
    else if(orderBy == 'release')
      orderByString = ' ORDER BY release_year DESC, season'

    return util.format(`SELECT pd.iid, pd.hat_name AS \`name\`, pd.brand, pd.gender, pd.release_year, pd.season, pd.sales_count, pd.price, pd.img, goods.goods_id
FROM (SELECT * FROM product_hat%s LIMIT %d OFFSET %d) pd LEFT JOIN goods ON goods.iid=pd.iid`, orderByString, itemPerPage, page*itemPerPage);
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

  updateUserInfo : function(uid, size_top, size_bottoms, size_shoes, size_outer) {
    return util.format(`UPDATE user SET
size_top=%d, size_bottoms=%d, size_shoes=%d, size_outer=%d WHERE uid=%d`,
size_top, size_bottoms, size_shoes, size_outer, uid);
  }
};

module.exports = querys;