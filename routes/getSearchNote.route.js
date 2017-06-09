router.post("/getSearchNote", function(req, res, next){
	var req_body = req.body;
	var keyword = req_body.keyword,
		user_id = req.session.islogin.user_id;

	var get_sql = "select note_id,note_name,note_type,note_abstract,show_modify,note_size "+
    "from note where note_name LIKE '%"+keyword+"%' order by modify_time DESC";
    
	dbCon.newestAndSearch(client, get_sql, function(err, result){
		if(err) throw err;
		if(!err){
			var list_data = result,
				list_dom = "";
			for (var i = 0; i < list_data.length; i++) {
				list_dom += search_bar_item_temp({
					item: list_data[i]
				});
			}
			res.send({
				msg: "notes get successfully",
				list_dom: list_dom,
				is_get: true
			});
		}
	});


});