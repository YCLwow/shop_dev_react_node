/*
 * @Author: liuyichen
 * @Date: 2022-08-01 11:27:02
 * @LastEditors: liuyichen
 * @LastEditTime: 2022-08-01 13:04:48
 * @FilePath: \代码仓库\shop_dev_react_node\jwt\jwt.js
 * @Description: 
 * 
 * Copyright (c) 2022 by liuyichen, All Rights Reserved. 
 */
//生成token
const jwt =require('jsonwebtoken')

// 自定义秘钥 
const secretkey='ananan'
// 引入解码工具
const { expressjwt } = require("express-jwt");
//只要配置express-jwt这个中间件，就可以把解析出来的信息挂载在req.auth
//除了api开头的请求地址其他地址都需要验证
app.use(expressjwt({secret:secretkey,algorithms:['HS256']}).unless({path:[/^\/api\//] }))
//配置跨域
const cors=require('cors')
app.use(cors())