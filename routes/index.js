/*
 * @Author: liuyichen
 * @Date: 2022-07-27 16:28:21
 * @LastEditors: liuyichen
 * @LastEditTime: 2022-07-28 09:31:40
 * @FilePath: \shop_dev\shop_dev_node\routes\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by liuyichen, All Rights Reserved. 
 */
var express = require('express');
var router = express.Router();
var db = require("../db/mysql");
/* GET home page. */
router.get('/', function(req, res, next) {
  db.querySql("select * from userinfo",[],function(results,fields){
		res.json({code: 200,data:results,message: '成功'});
   
	});
  // res.render('index', { title: 'Express' });
});

module.exports = router;
