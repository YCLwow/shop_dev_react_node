
var db = require("./mysql");
//查
router.get('/query', function(req, res, next) {
	db.querySql("select * from user",[],function(results,fields){
		res.json({code: 200,data:results,message: '成功'});
	});
});
//增 增字段一般会用上post或get
router.get('/add', function(req, res, next) {
//注：req.query是get所请求到的参数集 req.body是post所请求到的参数集
	let sql =`INSERT INTO user( name, password ) VALUES ( ${req.query.account}, ${req.query.password})`
    db.querySql(sql,[],function(error,results){
		console.log(error); // 可打印可不打印
		console.log(results); // 可打印可不打印
		//没加判断条件，专业应该是要添加判断条件，线下补上
		res.json({code: 200,data:results,message: '成功'});
	});
})