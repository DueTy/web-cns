
router.post("/rename",function(req, res, next){
	var client = dbCon.connect();
	var req_body = req.body;

	dbCon.renameFun(client,req_body,function(){
		if (err) throw err;
		if(!err){
			res.send({
				msg: req_body.entity_type+" rename success"
			});
		}
	});
});