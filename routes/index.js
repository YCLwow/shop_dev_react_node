/*
 * @Author: liuyichen
 * @Date: 2022-07-27 16:28:21
 * @LastEditors: liuyichen
 * @LastEditTime: 2022-08-01 17:26:49
 * @FilePath: \代码仓库\shop_dev_react_node\routes\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by liuyichen, All Rights Reserved. 
 */

var express = require('express');
//创建web服务器
// const app=express()
//生成token
const jwt =require('jsonwebtoken')
// 自定义秘钥 
const secretkey='ananan'
// 引入解码工具
const { expressjwt } = require("express-jwt");

//只要配置express-jwt这个中间件，就可以把解析出来的信息挂载在req.auth
//除了api开头的请求地址其他地址都需要验证
// app.use(expressjwt({secret:secretkey,algorithms:['HS256']}).unless({path:[/^\/api\//] }))


var router = express.Router();
var db = require("../db/mysql");
/* GET home page. */
router.get('/login', function(req, res, next) {
  console.log(req.query,req.query.userName,req.query.passWord)
  // 生成token 用户名 
  // const tokentstr=jwt.sign({username:userinfo.username},secretkey,{expiresIn:'60s'})
  db.querySql(`select * from userinfo where username = '${req.query.userName}' and password = '${req.query.passWord}'`,function(results,fields){
  // db.querySql(`select * from userinfo where username = "lyc" and password = "123456"`,[],function(results,fields){
    // res.send(JSON.stringify({code: 200,data:results,message: '成功'}))
    console.log(JSON.stringify(results).length,JSON.stringify(results))
    // if(JSON.stringify(results)){
      res.json({code: 200,data:results,message: '成功',sucess:true});
    // }else{
    //   res.json({code: 200,data:[],message: '失败',sucess:false});
    // }
	
	});
  // res.render('index', { title: 'Express' });
});

module.exports = router;
