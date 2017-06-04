define("newNote",function(require,exports,module){	
	"use strict";

	var root_new_note = $(".new-menu .new-note"),
		root_new_mk = $(".new-menu .new-mk"),
		folder_menu = $(".folder-menu"),
		folder_new_note1 = folder_menu.eq(0).find(".new-note"),
		folder_new_mk1 = folder_menu.eq(0).find(".new-mk"),
		folder_new_note2 = folder_menu.eq(1).find(".new-note"),
		folder_new_mk2 = folder_menu.eq(1).find(".new-mk"),
		folder_item_list = $(".folder-item-list"),
		view_list = $(".view-list"),
		list_container = view_list.find(".mCSB_container");

	root_new_note.on("click", newNote);

	root_new_mk.on("click", newNote);

	folder_new_note1.on("click", newNote);

	folder_new_mk1.on("click", newNote);

	folder_new_note2.on("click", newNote);

	folder_new_mk2.on("click", newNote);

	function newNote(){
		var _this = $(this),
			new_note_type = "",
			par_menu = _this.parent(".widget-menu"),
			is_new_menu = par_menu.hasClass("new-menu")?true:false;

		var menu_target_id = is_new_menu?"root":par_menu.attr("data-target-id");

		new_note_type = _this.hasClass("new-note")?"note":"mk";

		var post_data = {
			is_new: true,
			type: new_note_type,
			belong_folder_id: menu_target_id
		};
		$.ajax({
			url: "/newNote",
			type: "POST",
			dataType: "JSON",
			data: post_data,
			success: function(data){
				is_new_menu?rootAjaxSuc(data):folderAjaxSuc(menu_target_id);
			}
		});	
	}

	function rootAjaxSuc(data){
		var dom_data = "";
		if(data){
			dom_data = data.dom_data;
			list_container.prepend(dom_data);
		}
	}

	function folderAjaxSuc(folder_id){
		folder_item_list
		.find("div[data-entity-id="+folder_id+"]")
		.trigger("click");
	}

});