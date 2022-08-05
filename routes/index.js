/*
 * @Author: liuyichen
 * @Date: 2022-07-27 16:28:21
 * @LastEditors: liuyichen
 * @LastEditTime: 2022-08-05 10:52:47
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
// 引入解码工具
const { expressjwt } = require("express-jwt");

//只要配置express-jwt这个中间件，就可以把解析出来的信息挂载在req.auth
//除了api开头的请求地址其他地址都需要验证
app.use(expressjwt({
  secret: 'secret12345',  // 签名的密钥 或 PublicKey
  algorithms:['HS256']
}).unless({
  path: ['/login', '/signup']  // 指定路径不经过 Token 解析
}))


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

module.exports = router;
