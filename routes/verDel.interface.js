router.post("/verDel",function(req, res, next){
	var req_body = req.body;
	var ver_id = req_body.ver_id;

	dbCon.verDel(client, ver_id, function(err,result){
		if(err) throw err;
		if(!err){
			console.log(result);
			var is_affected = result.affectedRows>0;
			res.send({
				is_del:is_affected
			});
		}
	});

});