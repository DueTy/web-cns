router.post("/rename",function(req, res, next){
	var client = dbCon.connect();
	var req_body = req.body;

	var modify_time = getDateTime();
	if(req_body.entity_type==="note"){
		req_body.show_modify = getDate(modify_time);
	}
	req_body.modify_time = modify_time;

	if (req_body.val.length>20) {
		res.send({
			msg: "名字太长了，要不短点？",
			is_tooLong: true
		});
	}else{
		dbCon.renameFun(client,req_body,function(err,result){
			if (err) throw err;
			if(!err){
				var is_affected = result.affectedRows>0?true:false;
				res.send({
					msg: req_body.entity_type+" rename success",
					is_tooLong: false,
					new_name: req_body.val,
					is_affected: is_affected
				});
			}
		});
	}

	
});