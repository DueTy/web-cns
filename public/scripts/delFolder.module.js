define("delFolder",function(require,exports,module){
	"use strict";

	var folder_menu = $(".folder-menu"),
		del_folder1 = folder_menu.eq(0).find(".delete"),
		del_folder2 = folder_menu.eq(1).find(".delete"),
		folder_item_list = $(".side-bar .folder-item-list"),
		list_container = folder_item_list.find(".mCSB_container");

	del_folder1.on("click", delAjax);

	del_folder2.on("click", delAjax);

	function delAjax(){
		
		var par_menu = $(this).parent(".widget-menu");

		var folder_id = par_menu.attr("data-target-id"),
			folder = list_container
						.find("div[data-entity-id="+folder_id+"]");

		var is_par_has_sub = folder.parent().parent().hasClass("sub-list");

		var post_data = {
			folder_id: folder_id,
			folder_level: folder.attr("data-level")
		};

		$.ajax({
			url: "/delFolder",
			type: "POST",
			dataType: "JSON",
			data: post_data,
			success: function(data){
				if (data.is_delete_all&&is_par_has_sub) {
					var bro_num = folder.parent(".folder-item").siblings().length;
					if (bro_num===0) {
						var par_list = folder.parent(".folder-item").parent(".sub-list"),
							prev_cont = par_list.prev(".item-cont");
						console.log(prev_cont);
						prev_cont.removeClass("folder-open");
						prev_cont.children(".has-sub").find(".arr-icon").remove();
					}
					folder.remove();					
				}
			}

		});
	}
});