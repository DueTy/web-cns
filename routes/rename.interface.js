
router.post("/rename",function(req, res, next){
	var client = dbCon.connect();
	var req_body = req.body;

	dbCon.renameFun(client,req_body,function(err,result){
		if (err) throw err;
		if(!err){
			res.send({
				msg: req_body.entity_type+" rename success",
				new_name: req_body.val,
				is_affected: result.affctedRows>0?true:false
			});
		}
	});
});