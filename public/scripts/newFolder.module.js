define("newFolder",function(require,exports,module){
	"use strict";
	var new_folder_btn = $(".side-bar .new-folder"),
		folder_item_list = $(".side-bar .folder-item-list");
	var list_container = folder_item_list
	.is(".mCustomScrollbar")?folder_item_list
	.find(".mCSB_container"):folder_item_list;
	
	new_folder_btn.on("click", function() {
		var post_data = {
			is_new: true
		};
		$.ajax({
			url: "/newFolder",
			type: "POST",
			dataType: "JSON",
			data: post_data,
			success:function(data){
				var dom_data = "";
				if(data){
					dom_data = data.dom_data;
					list_container.prepend(dom_data);
				}
			}
		});	
	});


});