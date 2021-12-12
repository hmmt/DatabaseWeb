const { URITooLong } = require('http-errors');
var database = require('./db');
var util = require('util');

let itemPerPage = 10

var querys = {

  queryStr: '',

  addQueryLog: function(str) {
    querys.queryStr += str;
  },

  clearQueryLog: function() {
    querys.queryStr = '';
  },


  selectSizeHat: function() {
    return 'SELECT *, size_hat_id as size_id FROM size_hat';
  },
  selectSizeOuter: function() {
    return 'SELECT *, size_outer_id as size_id FROM size_outer';
  },
  selectSizePants: function() {
    return 'SELECT *, size_pants_id as size_id FROM size_pants';
  },
  selectSizeShoes: function() {
    return 'SELECT *, size_shoes_id as size_id FROM size_shoes';
  },
  selectSizeTop: function() {
    return 'SELECT *, size_top_id as size_id FROM size_top';
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

    return util.format('SELECT *, shoes_name as name FROM product_shoes%s LIMIT %d OFFSET %d', orderByString, itemPerPage, page*itemPerPage);
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

    return util.format(`SELECT pd.iid, pd.shoes_name AS \`name\`, pd.brand, pd.gender, pd.release_year, pd.season, pd.sales_count, pd.price, pd.img, goods.goods_id
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

  insertFavorite : function(uid, iid, size_id) {
    //return String.format('insert into favorite (uid,goods_id) VALUE(\'%s\', \'goods_id\')', markid, uid, id);
    return util.format(`INSERT INTO favorite(uid, goods_id)
 SELECT %d, goods_id
 FROM goods
 WHERE iid = '%s' AND size_id = %d`, uid, iid, size_id);
  },

  // 즐겨찾기 목록
  selectFavoriteWithProductOuter : function(uid, page) {
    page -= 1;
    //SELECT
    return util.format(`SELECT * FROM product_outer
 WHERE product_outer.iid IN (SELECT goods.iid
  FROM webdb.favorite
  INNER JOIN webdb.goods
  ON favorite.uid=%d AND favorite.goods_id = goods.goods_id)
 LIMIT %d OFFSET %d`, uid, itemPerPage, page*itemPerPage);
  },
  selectFavoriteWithProductTop : function(uid, page) {
    page -= 1;
    //SELECT
    return util.format(`SELECT * FROM product_top
 WHERE product_top.iid IN (SELECT goods.iid
  FROM webdb.favorite
  INNER JOIN webdb.goods
  ON favorite.uid=%d AND favorite.goods_id = goods.goods_id)
 LIMIT %d OFFSET %d`, uid, itemPerPage, page*itemPerPage);
  },
  selectFavoriteWithProductPants : function(uid, page) {
    page -= 1;
    //SELECT
    return util.format(`SELECT * FROM product_pants
 WHERE product_pants.iid IN (SELECT goods.iid
  FROM webdb.favorite
  INNER JOIN webdb.goods
  ON favorite.uid=%d AND favorite.goods_id = goods.goods_id)
 LIMIT %d OFFSET %d`, uid, itemPerPage, page*itemPerPage);
  },
  selectFavoriteWithProductShoes : function(uid, page) {
    page -= 1;
    //SELECT
    return util.format(`SELECT * FROM product_shoes
 WHERE product_shoes.iid IN (SELECT goods.iid
  FROM webdb.favorite
  INNER JOIN webdb.goods
  ON favorite.uid=%d AND favorite.goods_id = goods.goods_id)
 LIMIT %d OFFSET %d`, uid, itemPerPage, page*itemPerPage);
  },
  selectFavoriteWithProductHat : function(uid, page) {
    page -= 1;
    //SELECT
    return util.format(`SELECT * FROM product_hat
 WHERE product_outer.iid IN (SELECT goods.iid
  FROM webdb.favorite
  INNER JOIN webdb.goods
  ON favorite.uid=%d AND favorite.goods_id = goods.goods_id)
 LIMIT %d OFFSET %d`, uid, itemPerPage, page*itemPerPage);
  },

  // 코디 추천?
  selectReccommend : function(uid) {
    return util.format(`SELECT coordinate_id, uid, coordinate.hat_id, coordinate.outer_id, coordinate.top_id, coordinate.pants_id, coordinate.shoes_id,
product_hat.hat_name, product_outer.outer_name, product_top.top_name,
product_pants.pants_name, product_shoes.shoes_name,
product_hat.img AS hat_img, product_outer.img AS outer_img, product_top.img AS top_img,
product_pants.img AS pants_img, product_shoes.img AS shoes_img
FROM coordinate
LEFT JOIN product_outer ON product_outer.iid = coordinate.outer_id
LEFT JOIN product_top ON product_top.iid = coordinate.top_id
LEFT JOIN product_hat ON product_hat.iid = coordinate.hat_id
LEFT JOIN product_pants ON product_pants.iid = coordinate.pants_id
LEFT JOIN product_shoes ON product_shoes.iid = coordinate.shoes_id

WHERE (hat_id in (select iid from goods WHERE goods_id in (SELECT goods_id FROM favorite WHERE uid = %d)) OR 
outer_id in (select iid from goods WHERE goods_id in (SELECT goods_id FROM favorite WHERE uid = %d)) OR
pants_id in (select iid from goods WHERE goods_id in (SELECT goods_id FROM favorite WHERE uid = %d)) OR
shoes_id in (select iid from goods WHERE goods_id in (SELECT goods_id FROM favorite WHERE uid = %d)) OR
top_id in (select iid from goods WHERE goods_id in (SELECT goods_id FROM favorite WHERE uid = %d)))`, uid);
  },

  selectAllCoordinate : function() {
    return util.format(`SELECT coordinate_id, uid, coordinate.hat_id, coordinate.outer_id, coordinate.top_id, coordinate.pants_id, coordinate.shoes_id,
product_hat.hat_name, product_outer.outer_name, product_top.top_name,
product_pants.pants_name, product_shoes.shoes_name,
product_hat.img AS hat_img, product_outer.img AS outer_img, product_top.img AS top_img,
product_pants.img AS pants_img, product_shoes.img AS shoes_img
FROM coordinate
LEFT JOIN product_outer ON product_outer.iid = coordinate.outer_id
LEFT JOIN product_top ON product_top.iid = coordinate.top_id
LEFT JOIN product_hat ON product_hat.iid = coordinate.hat_id
LEFT JOIN product_pants ON product_pants.iid = coordinate.pants_id
LEFT JOIN product_shoes ON product_shoes.iid = coordinate.shoes_id
    `);
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