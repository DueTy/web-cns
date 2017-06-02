var side_bar_item_temp = require("../views/sideItemTemp.ejs");

router.post("/newFolder",function(req, res, next){
	var folder_id = uuidV4();
	var req_data = req.body;
	var item_data = {
		folder_name: "新建文件夹",
		level: parseInt(req_data.par_folder_level)+1,
		folder_id: folder_id
	};
	console.log(item_data);

	var item_html = side_bar_item_temp({
		item: item_data
	});
	res.send({
		msg:"folder inited success",
		dom_data: item_html,
		folder_id: folder_id
	});


});