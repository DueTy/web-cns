define("newNote",function(require,exports,module){	
	"use strict";

	var new_note_btn = $(".new-menu .new-note"),
		new_mk_btn = $(".new-menu .new-mk");
	var view_list = $(".view-list");
	var list_container = view_list
	.is(".mCustomScrollbar")?view_list
	.find(".mCSB_container"):view_list;

	new_note_btn.on("click", addAndPost);
	new_mk_btn.on("click", addAndPost);

	function addAndPost(){
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
});