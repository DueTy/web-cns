define("newNote",function(require,exports,module){	
	"use strict";

	var root_new_note = $(".new-menu .new-note"),
		root_new_mk = $(".new-menu .new-mk"),
		folder_menu = $(".folder-menu"),
		folder_new_note = folder_menu.find(".new-note"),
		folder_new_mk = folder_menu.find(".new-mk"),
		view_list = $(".view-list"),
		list_container = view_list.find(".mCSB_container");

	root_new_note.on("click", addAndPost);
	root_new_mk.on("click", addAndPost);

	function rootAjax(){
		var _this = $(this),
			_type = "";
		
		_type = _this.hasClass("new-note")?"note":"mk";

		var post_data = {
			is_new: true,
			type: _type
		};
		$.ajax({
			url: "/newNote",
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
	}

	function folderAjax(){
		
	}
});