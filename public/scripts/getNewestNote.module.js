define("getNewestNote",function(require,exports,module){
	"use strict";

	require("customScrollBar");

	var get_btn = $(".side-bar-main .newest"),
		view_list = $(".view-list"),
		list_container = view_list.find(".mCSB_container"),
		empty_dom = ["<div class=\"empty-msg\">",
						"您最近一周都没写笔记~~~",
						"</div>"].join("");

	get_btn.on("click",getAjax);

	function getAjax(){
		var post_data = {
			is_new: true
		};
		$.ajax({
 			url: "/getNewestNote",
 			type: "POST",
 			dataType: "JSON",
 			data: post_data,
 			success:function(data){
 				if (data.is_get&&data.list_dom!=="") {
 					list_container.html("").append(data.list_dom);
					view_list.find(".view-item").eq(0).trigger("click");
 				}else{ 					
 					list_container.html("").append(empty_dom);	
 					var cont_empty= list_container.find(".empty-msg");
 					cont_empty.css("margin-top",view_list.height()/2-20+"px");
					$(window).on("resize", function() {
						cont_empty.css("margin-top",view_list.height()/2-20+"px");
					});	
 				}
 				var side_bar = $(".side-bar-list");
 				side_bar.find(".selected").removeClass("selected");
 				side_bar.find(".title-selected").removeClass("title-selected");
 				get_btn.find(".item-cont").addClass("selected");
				view_list.mCustomScrollbar("update");
 			}
 		});
	}

});