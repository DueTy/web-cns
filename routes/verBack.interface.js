router.post("/verBack",function(req, res, next){
	var req_body = req.body;

	var back_opt = {
		note_id: req_body.belong_note_id,
		ver_id: req_body.ver_id
	};
	dbCon.verBack(client, back_opt, function(err,result){
		if(err) throw err;
		if(!err){
			var is_affected = result.affectedRows>0;
			res.send({
				is_back:is_affected
			});
		}
	});
});