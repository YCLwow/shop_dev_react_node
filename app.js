/*
 * @Author: liuyichen
 * @Date: 2022-07-28 14:36:10
 * @LastEditors: liuyichen
 * @LastEditTime: 2022-08-08 09:40:48
 * @FilePath: \代码仓库\shop_dev_react_node\app.js
 * @Description: 
 * 
 * Copyright (c) 2022 by liuyichen, All Rights Reserved. 
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// 引入跨域插件
const cors = require('cors'); 
// 解决跨域
app.use(cors());

// 引入解码工具
const { expressjwt } = require("express-jwt");

//只要配置express-jwt这个中间件，就可以把解析出来的信息挂载在req.auth
//除了api开头的请求地址其他地址都需要验证
app.use(expressjwt({
  secret: 'secret12345',  // 签名的密钥 或 PublicKey
  algorithms:['HS256']
}).unless({
  path: [ '/signup']  // 指定路径不经过 Token 解析
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
