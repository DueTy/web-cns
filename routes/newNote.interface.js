
var search_bar_item_temp = require("../views/searchItemTemp.ejs");

router.post("/newNote", function(req, res, next){
	var client = dbCon.connect();
	var req_body = req.body;
	
	var user_msg = req.session.islogin;

	var created_at = getDateTime(),
		modify_date = getDate(created_at);
	var note_msg = {
		note_id: uuidV4(),
		note_name: "新建笔记",
		note_type: req_body.type,
		owner_id: user_msg.user_id,
		belong_folder_id: req_body.belong_folder_id,
		created_at: created_at,
		modify_date: modify_date,
		note_content: "",
		note_size: "0B"
	};

	var sql_param = [
		note_msg.note_id,
		note_msg.note_name,
		note_msg.note_type,
		note_msg.owner_id,
		note_msg.belong_folder_id,
		note_msg.created_at,
		note_msg.modify_date,
		note_msg.note_content,
		note_msg.note_size
	];

	dbCon.noteInsert(client, sql_param, function(err,result){
		if (err) throw err;
		if(!err){
			var item_data = {
				note_name: note_msg.note_name,
				note_type: note_msg.note_type,
				note_id: note_msg.note_id,
				modify_date: note_msg.modify_date,
				note_size: note_msg.note_size
			};
			var item_html = search_bar_item_temp({
				item: item_data
			});

			res.send({
				msg: "note inited success",
				dom_data: item_html
			});
		}
	});
});

router.post("/getNoteList",function(req, res, next){
	var client = dbCon.connect();
	var req_folder = req.body.belong_folder_id;

	var list_dom = "",
		list_data = [];

	var user_msg = req.session.islogin,
		sql_param = {
			user_id: user_msg.user_id,
			belong_folder_id: req_folder
		};

	dbCon.noteSelect(client, sql_param, function(err, result){
		if(err) throw err;
		if(!err){
			list_data = result;
			console.log(result);
			for (var i = 0; i < list_data.length; i++) {
				list_dom += search_bar_item_temp({
					item: list_data[i]
				});
			}

			res.send({
				msg: "folder's notes get successfully",
				list_dom: list_dom
			});
		}
	});

	

});