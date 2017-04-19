define(function(require,exports,module){
	//加载依赖模块
	require("fullPage");
	require("mouseWheel");
	require("customScrollBar");

	var main_box = $(".main-box"),
		side_close = $(".side-close"),
		side_open = $(".side-open");
	var folder_item_list = $(".folder-item-list"),
		view_list = $(".view-list");


	side_close.on("click", sideBarOpt);
	side_open.on("click", sideBarOpt);

	view_list.fullHeight();
	folder_item_list.fullHeight();
	var scroll_opts = {
		mouseWheelPixels: 250
	}
	view_list.mCustomScrollbar(scroll_opts);
	folder_item_list.mCustomScrollbar(scroll_opts);


	function sideBarOpt(){
		main_box.toggleClass("page-side-close");
		$(window).trigger("resize");
	}
});
