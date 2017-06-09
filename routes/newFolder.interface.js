var side_bar_item_temp = require("../views/sideItemTemp.ejs");

router.post("/newFolder",function(req, res, next){
	

	var folder_id = uuidV4();
	var req_body = req.body;

	var user_msg = {};
	if(req.session.islogin){
		user_msg = req.session.islogin;
	}
	var created_at = getDateTime(),
		modify_time = created_at;
	var new_folder_msg = {
		folder_id: uuidV4(),
		folder_name: "新建文件夹",
		folder_level: parseInt(req_body.par_folder_level)+1,
		belong_id: user_msg.user_id,
		par_folder_id: req_body.par_folder_id,
		created_at: getDateTime(),
		modify_time: modify_time
	};
	var sql_param = [
		new_folder_msg.folder_id,
		new_folder_msg.folder_name,
		new_folder_msg.folder_level,
		new_folder_msg.belong_id,
		new_folder_msg.par_folder_id,
		new_folder_msg.created_at,
		new_folder_msg.modify_time
	];

	dbCon.folderInsert(client, sql_param, function(err){
		if (err) throw err;
		if(!err){
			var item_data = {
				folder_name: new_folder_msg.folder_name,
				folder_level: new_folder_msg.folder_level,
				folder_id: new_folder_msg.folder_id
			};
			var item_html = side_bar_item_temp({
				item: item_data
			});
			res.send({
				msg:"folder inited success",
				dom_data: item_html,
				folder_id: new_folder_msg.folder_id
			});
		}
	});
});