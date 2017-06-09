router.post("/delNote",function(req, res, next){
	
	var req_body = req.body;

	var condition = "note_id='"+req_body.note_id+"'";

	dbCon.noteDel(client, condition, function(err, result){
		if(err) throw err;
		if (!err) {
			var is_delete = result.affectedRows>0;
			res.send({
				msg: "删除成功",
				is_delete: is_delete
			});
		}
	})

});