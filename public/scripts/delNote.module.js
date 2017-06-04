define("delNote",function(require,exports,module){
	"use strict";
	
	var note_menu = $(".note-detail-menu"),
		del_note = note_menu.find(".delete"),
		view_list = $(".view-list"),
		list_container = view_list.find(".mCSB_container");

	del_note.on("click", noteDelAjax);

	var empty_folder = ["<div class=\"empty-msg\">",
						"<i class=\"due-if\">&#xe8ea;</i><br>",
						"空文件夹",
						"</div>"].join("");

	function noteDelAjax(){

		var note_id = note_menu.attr("data-target-id"),
			note = view_list.find("div[data-entity-id="+note_id+"]");

		var post_data = {
			note_id: note_id
		};
		$.ajax({
			url: "/delNote",
			type: "POST",
			dataType: "JSON",
			data: post_data,
			success: function(data){
				var bro_num = note.parent(".view-item").siblings().length;
				if(bro_num===0){
					list_container.html("");
					list_container.append(empty_folder);
					var cont_empty= list_container.find(".empty-msg");
					cont_empty.css("margin-top",view_list.height()/2-20+"px");
					$(window).on("resize", function() {
						cont_empty.css("margin-top",view_list.height()/2-20+"px");
					});
				}
				note.remove();
			}
		});
	}


});