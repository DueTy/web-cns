define("getSearchNote",function(require,exports,module){
	"use strict";

	require("customScrollBar");
	require("backLayer");

	var search_cont =$(".search-bar .search-cont"),
		search_btn = search_cont.find(".cns-btn"),
		search_ipt = search_cont.find(".search-ipt"),
		view_list = $(".view-list"),
		list_container = view_list.find(".mCSB_container"),
		empty_dom = ["<div class=\"empty-msg\">",
						"抱歉没找到任何笔记~~~",
						"</div>"].join("");

	search_btn.on("click", getAjax);

	function getAjax(){
		var keyword = search_ipt.val();
		var post_data = {
			is_new: true,
			keyword: keyword
		};
		if(keyword===""){
			var warn_msg = $(".warn-msg");
			warn_msg.find(".msg-text").text("查找标题不能为空");
			warn_msg.backLayer({
				closeCall: warnCloseCall
			});
			return false;
		}
		$.ajax({
 			url: "/getSearchNote",
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
				view_list.mCustomScrollbar("update");
 			}
 		});
	}
	function warnCloseCall(containerBox, layer){
		var warn_interval,
		count_down = 1;
		warn_interval = setInterval(function(){
			count_down--;
			if (count_down===0) {
				clearInterval(warn_interval);
				containerBox.hide();
				layer.remove();
			}
		},1000);
	}  

});