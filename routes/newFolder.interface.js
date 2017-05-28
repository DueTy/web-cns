var side_bar_item_temp = require("../views/sideItemTemp.ejs");

router.post("/newFolder",function(req, res, next){
	var item_data = {
		folder_name: "新建文件夹",
		level: 1,
		folder_id: "newfolderno1"
	};

	var item_html = side_bar_item_temp({
		item: item_data
	});
	res.send({
		msg:"folder inited success",
		dom_data: item_html
	});


});