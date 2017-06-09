var ver_item_temp = require("../views/verItemTemp.ejs");
router.post("/verGet",function(req, res, next){
	var req_body = req.body,
		get_opt = {};
	if(req_body.is_belong_id==="true"){
		
		get_opt = {
			select_opt: "note_id,created_at",
			where_opt: "belong_note_id='"+req_body.belong_note_id+"'"
		};

		dbCon.verGet(client, get_opt, function(err,result){
			if(err) throw err;
			if(!err){
				var is_get = result.length>0;
				if (is_get) {
					var list_dom = "";
					for (var i = 0; i < result.length; i++) {
						result[i].created_at = sd_time
						.format(result[i].created_at, 
							"YYYY-MM-DD hh:mm");
						list_dom+= ver_item_temp({
							item: result[i]
						});
					}
					res.send({
						is_get: is_get,
						list_dom: list_dom
					});
				}else{
					res.send({
						is_get: is_get
					});
				}
			}
		});
	}else{
		get_opt = {
			select_opt: "note_content",
			where_opt: "note_id='"+req_body.ver_id+"'"
		};
		dbCon.verGet(client, get_opt, function(err,result){
			if(err) throw err;
			if(!err){
				console.log(result);
				var is_get = result.length>0;
				var note_content = result[0].note_content;
				res.send({
					is_get: is_get,
					note_content: note_content
				});
			}
		});
	}

	

	
});