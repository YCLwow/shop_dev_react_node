
/*
 * @Author: liuyichen
 * @Date: 2022-07-28 08:58:56
 * @LastEditors: 周铁柔 aa3441759088@163.com
 * @LastEditTime: 2023-03-21 09:26:07
 * @FilePath: \代码仓库\shop_dev_react_node\db\mysql.js
 * @Description: 
 * 
 * Copyright (c) 2022 by liuyichen, All Rights Reserved. 
 */
var mysql = require("mysql")
var db_config = {
    host: "42.193.43.37",
    user: "root",
    password: "lanjingyin",
    port: "3306",
    database: "lunwen"
}

//查询成功后关闭mysql
function closeMysql (connect) {
    connect.end((err) => {
        if (err) {
            console.log(`mysql关闭失败:${err}!`)
        } else {
            console.log('mysql关闭成功!')
        }
    })
}
module.exports = {
    querySql (sqlQuery, params, callback) {
        let connect = mysql.createConnection(db_config)
        //开始链接数据库
        connect.connect(function (err) {
            if (err) {
                console.log(err, '连接失败')
                callback(err, '连接失败', null)
            } else {
                connect.query(sqlQuery, params, function (err, result, fields) {
                    if (err) {
                        callback(err, `SQL error: ${err}!`, null)
                    } else {
                        // console.log(result);
                        callback(JSON.parse(JSON.stringify(result)))

                        closeMysql(connect)
                    }
                })
            }
        })
    }
}
