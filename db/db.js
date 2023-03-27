/*
 * @Author: 周铁柔 aa3441759088@163.com
 * @Date: 2023-03-21 08:58:33
 * @LastEditors: 周铁柔 aa3441759088@163.com
 * @LastEditTime: 2023-03-27 11:42:31
 * @FilePath: \lunwend:\03第三分册安防系统\shop_dev_react_node\db\db.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

var db = require("./mysql")
//查
router.get('/query', function (req, res, next) {
	db.querySql("select * from user", [], function (results, fields) {
		res.json({ code: 200, data: results, message: '成功' })
	})
})
//增 增字段一般会用上post或get
router.get('/add', function (req, res, next) {
	//注：req.query是get所请求到的参数集 req.body是post所请求到的参数集
	let sql = `INSERT INTO shoppingCar( name, password ) VALUES ( ${req.query.account}, ${req.query.password})`
	db.querySql(sql, [], function (error, results) {
		console.log(error) // 可打印可不打印
		console.log(results) // 可打印可不打印
		//没加判断条件，专业应该是要添加判断条件，线下补上
		res.json({ code: 200, data: results, message: '成功' })
	})
})