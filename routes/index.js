/*
 * @Author: liuyichen
 * @Date: 2022-07-27 16:28:21
 * @LastEditors: liuyichen
 * @LastEditTime: 2022-09-19 10:26:27
 * @FilePath: \代码仓库\shop_dev_react_node\routes\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by liuyichen, All Rights Reserved. 
 */

var express = require('express');
//创建web服务器
const app=express()
//生成token
const jwt =require('jsonwebtoken')
// 自定义秘钥 
const secretkey='secret12345'

var router = express.Router();
// sql对象
var db = require("../db/mysql");


/**
 * @description: 登录接口 C+W+t
 * @param {*} login
 * @param {*} function
 * @param {*} res
 * @param {*} next
 * @return {*}
 */

router.get('/login', function(req, res, next) {
  let sql = `select * from userinfo where username = ? and password = ?`
  let sqlValue = [req.query.userName,req.query.passWord]
  // 生成token 
  db.querySql(sql,sqlValue,function(results,fields){
    if( JSON.parse(JSON.stringify(results)).length){
      const token = jwt.sign({
        username: sqlValue[0],
        passWord:sqlValue[1],
    },secretkey,{
      expiresIn: 3600 * 24 * 3
    })
      res.json({code: 200,data:token,message: '成功',sucess:true});
    }else{
      res.json({code: 200,data:null,message: '错误的账号或密码',sucess:false});
    }
	});
});

/**
 * @description: 商品查询 C+W+t
 * @param {*} getProductList
 * @param {*} function
 * @param {*} res
 * @param {*} next
 * @param {*} productType  产品类型
 * @return {*}
 */
router.post('/productList',function(req,res,next){
  let sql =`select * from product_lists where productType in ( ?,?,? )`
  let sqlValue  =req.body.productType
  console.log(sqlValue)
  db.querySql(sql,sqlValue,function(results,fields){
    res.json({code: 200,data:results,message: '成功',sucess:true});
  })
})





module.exports = router;
