router.get('/share/:share_note_id/:note_type', function(req, res, next) {
	// console.log('url参数对象 :',req.params);  
	// console.log('get请求参数对象 :',req.query);  
	// console.log('post请求参数对象 :',req.body);  
	// console.log('q的值为 :',req.params.share_note_id); 

    var	share_note_id = req.params.share_note_id,
		note_type = req.params.note_type;
	var get_opt = {
		note_id: share_note_id,
		share_note_get: true
	};

	dbCon.noteGet(client, get_opt, function(err, result){
		if (err) {
			throw err
		}else{
			var note_content = result[0].note_content,
				note_name = result[0].note_name;
			res.render("noteShare",{
				note_content: note_content,
				note_type: note_type,
				note_name: note_name
			});
		}
	});


    // console.log(req.headers.host);


});