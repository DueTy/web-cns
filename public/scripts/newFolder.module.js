define("newFolder",function(require,exports,module){
	"use strict";

	require("customScrollBar");
	require("renameWidget");

	var root_new_folder = $(".bar-top .new-folder"),
		folder_menu = $(".folder-menu"),
		list_new_folder = folder_menu.find(".new-folder"),
		folder_item_list = $(".side-bar .folder-item-list"),
		list_container = folder_item_list.find(".mCSB_container");
	
	root_new_folder.on("click", rootAjax);

	list_new_folder.on("click", itemAjax);

	function rootAjax(data){
		var post_data = {
			is_new: true,
			par_folder_level: 0,
			par_folder_id: "root"
		};
		$.ajax({
			url: "/newFolder",
			type: "POST",
			dataType: "JSON",
			data: post_data,
			success: function(data){
				var dom_data = "",
				folder_id = "";
				if(data){
					dom_data = data.dom_data,
					folder_id = data.folder_id;

					list_container.prepend(dom_data);

					var new_folder_node = list_container
					.find("div[data-entity-id="+folder_id+"]");

					new_folder_node.find(".rename-cont").renameWidget();
				}
			}
		});
		folder_item_list.mCustomScrollbar("update");		
	}

	function itemAjax(data){
		var post_data = {
			is_new: true
		};

		var has_sub_icon = ["<i class=\"due-if arr-icon\">&#xe637;</i>"].join(""),
			open_arr_dom = ["<span class=\"has-sub-open\">",
							"<i class=\"due-if arr-icon\">&#xe636;</i>",
							"<i class=\"due-if folder-icon\">&#xe633;</i>",
							"</span>"].join(""),
			sub_list_dom = ["<ul class=\"sub-list\">",
							"</ul>"].join("");

		var par_folder_id = (folder_menu).attr("data-target-id"),
			par_folder = list_container
						.find("div[data-entity-id="+par_folder_id+"]");

		var is_has_sub = par_folder.find(".has-sub .arr-icon")[0]?true:false;

		if(!is_has_sub){
			par_folder.after(sub_list_dom);
			var par_has_sub = par_folder.find(".has-sub");

			par_has_sub.append(has_sub_icon);
			par_has_sub.after(open_arr_dom);
		}		

		var sub_list = par_folder.next(".sub-list");

		var par_folder_level = par_folder.data("level");

		post_data.par_folder_level = par_folder_level;
		post_data.par_folder_id = par_folder_id;

		$.ajax({
			url: "/newFolder",
			type: "POST",
			dataType: "JSON",
			data: post_data,
			success: function(data){
				var dom_data = "",
				folder_id = "";
				if(data){
					dom_data = data.dom_data,
					folder_id = data.folder_id;

					sub_list.prepend(dom_data);

					var new_folder_node = list_container
					.find("div[data-entity-id="+folder_id+"]");

					if(!par_folder.hasClass("folder-open")){
						par_folder.find(".has-sub .arr-icon").trigger("click");
					}
					
					new_folder_node.find(".rename-cont").renameWidget();

				}
			}
		});
		folder_item_list.mCustomScrollbar("update");
	}

	


});