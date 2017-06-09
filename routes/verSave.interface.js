router.post("/verSave",function(req, res, next){
	var req_body = req.body;

	var ver_note_msg = {
		note_content: req_body.note_content,
		note_abstract: req_body.note_abstract,
		belong_note_id: req_body.belong_note_id,
		note_id: uuidV4(),
		note_type: req_body.note_type,
		created_user_id: req.session.islogin.user_id,
		created_at: getDateTime()
	};

	var insert_val = [
		ver_note_msg.note_id,
		ver_note_msg.belong_note_id,
		ver_note_msg.note_type,
		ver_note_msg.created_at,
		ver_note_msg.created_user_id,
		ver_note_msg.note_content,
		ver_note_msg.note_abstract
	];

	dbCon.verSave(client, insert_val, function(err,result){
		if(err) throw err;
		if(!err){
			var is_affected = result.affectedRows>0;
			if (is_affected) {
				res.send({
					is_saved: is_affected
				});
			}
		}
	});

	

});