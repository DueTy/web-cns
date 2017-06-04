router.post("/saveNote",function(req, res, next){
	var client = dbCon.connect(),
		req_body = req.body;

	var save_opt = {
		user_id: req.session.islogin.user_id,
		note_content: req_body.note_content,
		note_id: req_body.note_id,
		note_abstract: req_body.note_abstract,
		note_size: calcuByteLength(req_body.note_content),
		show_modify: getDate(getDateTime())
	};

	dbCon.noteSave(client, save_opt, function(err, result){
		if(err) throw err;
		if(!err){
			var affected_row = result.affectedRows;
			if(affected_row>0){				
				res.send({
					is_saved: true,
					msg: "内容修改成功",
				});
			}
		}
	});


});