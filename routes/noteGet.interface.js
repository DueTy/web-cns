router.post("/getNote", function(req, res, next){
	
	var req_body = req.body;

	var note_id = req_body.note_id;

	var get_opt = {
		note_id: note_id
	};

	dbCon.noteGet(client, get_opt, function(err, result){
		if(err) throw err;
		if(!err){
			var content = result[0].note_content;
			res.send({
				is_get: true,
				note_content: content
			})
		}
	});


});