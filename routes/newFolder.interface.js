var side_bar_item_temp = require("../views/sideItemTemp.ejs");

router.post("/newFolder",function(req, res, next){
	var item_data = {
		note_name: "新建文件夹"
	};

	var item_html = side_bar_item_temp({
		item: item_data
	});
	res.send({
		msg:"folder inited success",
		dom_data: item_html
	});


});