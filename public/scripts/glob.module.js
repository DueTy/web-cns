define(function(require,exports,module){
	//加载依赖模块
	require("fullPage");

	var main_box = $(".main-box"),
		side_close = $(".side-close"),
		side_open = $(".side-open");
	var side_bar_main = $(".side-bar-main"),
		search_bar_main = $(".search-bar-main");


	side_close.on("click", function() {		
		main_box.addClass("page-side-close");
	});
	side_open.on("click", function() {
		main_box.removeClass("page-side-close");
	});

	side_bar_main.fullHeight();
	search_bar_main.fullHeight();
});
