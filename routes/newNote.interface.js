
var search_bar_item_temp = require("../views/searchItemTemp.ejs");

router.post("/newNote", function(req, res, next){
	

	var item_data = {
		note_type: req.body.type
	};
	var item_html = search_bar_item_temp({
		item: item_data
	});
	
	res.send({
		msg: "note inited success",
		dom_data: item_html
	});

});

router.post("/getNoteList",function(req, res, next){
	var req_folder = req.body.folder_id;

	var list_dom = "",
		list_data = [
			{
				note_type:"note"
			},{
				note_type:"mk"
			},{
				note_type:"note"
			},{
				note_type:"mk"
			}
		]

	for (var i = 0; i < list_data.length; i++) {
		list_dom += search_bar_item_temp({
			item: list_data[i]
		});
	}

	res.send({
		msg: "folder's notes get successfully",
		list_dom: list_dom
	})

});