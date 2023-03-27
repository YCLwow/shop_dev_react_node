/*
 * @Author: liuyichen
 * @Date: 2022-07-27 16:28:21
 * @LastEditors: 周铁柔 aa3441759088@163.com
 * @LastEditTime: 2023-03-27 12:08:36
 * @FilePath: \代码仓库\shop_dev_react_node\routes\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by liuyichen, All Rights Reserved. 
 */

var express = require('express')
//创建web服务器
const app = express()
//生成token
const jwt = require('jsonwebtoken')
// 自定义秘钥 
const secretkey = 'secret12345'

var router = express.Router()
// sql对象
var db = require("../db/mysql")


/**
 * @description: 登录接口 C+W+t
 * @param {*} login
 * @param {*} function
 * @param {*} res
 * @param {*} next
 * @return {*}
 */

router.get('/login', function (req, res, next) {
  let sql = `select * from userinfo where username = ? and password = ?`
  let sqlValue = [req.query.userName, req.query.passWord]
  console.log(req, 'req', sql)
  // 生成token 
  db.querySql(sql, sqlValue, function (results, fields) {
    if (JSON.parse(JSON.stringify(results)).length) {
      const token = jwt.sign({
        username: sqlValue[0],
        passWord: sqlValue[1],
      }, secretkey, {
        expiresIn: 3600 * 24 * 3
      })
      res.json({ code: 200, data: token, message: '成功', sucess: true })
    } else {
      res.json({ code: 200, data: null, message: '错误的账号或密码', sucess: false })
    }
  })
})

/**
 * @description: 商品查询 C+W+t
 * @param {*} getProductList
 * @param {*} function
 * @param {*} res
 * @param {*} next
 * @param {*} productType  产品类型
 * @return {*}
 */
router.post('/productList', function (req, res, next) {
  let sql = `select * from product_lists where productType in ( ?,?,? )`
  let sqlValue = req.body.productType
  console.log(sqlValue)
  db.querySql(sql, sqlValue, function (results, fields) {
    res.json({ code: 200, data: results, message: '成功', sucess: true })
  })
})
/**
 * @description: 商品查询ID C+W+t
 * @param {*} getProductList
 * @param {*} function
 * @param {*} res
 * @param {*} next
 * @param {*} productType  产品类型
 * @return {*}
 */
router.get('/getProduct', function (req, res, next) {
  let sql = `select * from product_lists where id = ?`
  let sqlValue = req.query.id
  console.log(sqlValue)
  db.querySql(sql, sqlValue, function (results, fields) {
    res.json({ code: 200, data: results, message: '成功', sucess: true })
  })
})
/**
 * @description: 增加购物车id 
 * @param {*} getProductList
 * @param {*} function
 * @param {*} res
 * @param {*} next
 * @param {*} shopping  购物车
 * @return {*}
 */
router.post('/addShopping', function (req, res, next) {
  let sql = `INSERT INTO shoppingCar(quantity,pathurl,proId,proName,proDesc) VALUES ( ${req.body.quantity},${req.body.pathurl},${req.body.proId},${req.body.proName},${req.body.proDesc})`
  // let sql = "INSERT INTO userinfo(username,password) VALUES ('aaaaa',1213412)"
  // let sql = `INSERT INTO shoppingCar(quantity,pathurl,proId,proName,proDesc) VALUES (2,2,2,2,2,)`
  // let sqlValue = req.query.id
  console.log(req.body)
  db.querySql(sql, '', function (results, fields) {
    console.log(fields, 'fields')
    res.json({ code: 200, data: results, message: '成功', sucess: true })
  })
})






module.exports = router
