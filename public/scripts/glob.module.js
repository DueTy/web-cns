define(function(require){
	//加载依赖模块
	require("fullPage");
	require("mouseWheel");
	require("customScrollBar");
	require("widgetMenu");
	require("renameWidget");

	var main_box = $(".main-box"),
	side_close = $(".side-close"),
	side_open = $(".side-open");
	var folder_item_list = $(".folder-item-list"),
		view_list = $(".view-list"),
		edit_cont = $(".edit-cont");


	side_close.on("click", sideBarOpt);
	side_open.on("click", sideBarOpt);

	if (edit_cont[0]) {
		edit_cont.fullHeight();
		view_list.fullHeight();
		folder_item_list.fullHeight();
		require("noteEdit");
	}	
	
	var scroll_opts = {
		mouseWheelPixels: 250,
		advanced:{
    		autoScrollOnFocus:false
  		}
	};
	view_list.mCustomScrollbar(scroll_opts);
	folder_item_list.mCustomScrollbar(scroll_opts);

	folder_item_list = $(".folder-item-list");
	view_list = $(".view-list");
	
	require("newNote");
	require("newFolder");
	require("delFolder");
	require("delNote");


	function sideBarOpt(){
		main_box.toggleClass("page-side-close");
		$(window).trigger("resize");
	} 	

 	$(".new-menu").widgetMenu({
		tri_par: ".side-bar .new-btn",
		show_class: "blk-show"
	});
 	$(".flo-menu").widgetMenu({
 		trigger: ".item-cont",
		show_class: "blk-show",
 		tri_par: ".folder-item-list",
 		is_left: false,
 		flo_mouse: true,
 		call: renameCall
 	});
 	$(".down-arr-menu").widgetMenu({
 		trigger: ".folder-item .down-arr",
 		tri_par: ".folder-item-list",
		show_class: "blk-show",
 		flo_mouse: true,
 		call: renameCall
 	});
 	$(".note-detail-menu").widgetMenu({
 		trigger: ".item-cont",
		show_class: "blk-show",
 		tri_par: ".view-list",
 		is_left: false,
 		flo_mouse: true,
 		call: renameCall
 	});

 	folder_item_list.on("click",".arr-icon", function() {
 		var par_folder = $(this).parents(".item-cont");
 		var sub_list = par_folder.next(".sub-list");
 		par_folder.toggleClass("folder-open");
 		sub_list.toggleClass("list-open");
 	});

 	folder_item_list.on("click", ".item-cont", noteListAjax);

 	var folder_list_title = $(".side-bar .folder-list-title");
 	folder_list_title.on("click", noteListAjax);
 	folder_list_title.trigger("click");

 	view_list.on("click", ".item-cont", function() {
 		var post_data = {},
 			_this = $(this),
 			note_id = _this.attr("data-entity-id");		
 	});

	var new_btn = $(".side-bar .new-btn"),
		new_menu = $(".side-bar .new-menu");	

	
	function renameCall(menu){
		var rename_btn = menu.find(".rename");

		rename_btn.on("click", function() {
			var target_id = menu.attr("data-target-id");
			var target = $("div[data-entity-id="+target_id+"]");
			target.find(".rename-cont").renameWidget();
		});
	}
	var empty_folder = ["<div class=\"empty-msg\">",
						"<i class=\"due-if\">&#xe8ea;</i><br>",
						"空文件夹",
						"</div>"].join(""),
		empty_editor = ["<div class=\"empty-editor\"><i class=\"due-if\">&#xe606;</i></div>"].join("");

	function noteListAjax(){
		var post_data = {},
 			_this = $(this),
 			folder_id = _this.attr("data-entity-id");

 		post_data.belong_folder_id = folder_id;
 		
 		$.ajax({
 			url: "/getNoteList",
 			type: "POST",
 			dataType: "JSON",
 			data: post_data,
 			success:function(data){
 				var list_dom = "";
 				if (data) {
 					var is_empty = data.list_dom==="";

 					list_dom = is_empty?empty_folder:data.list_dom;

 					var list_container = view_list.find(".mCSB_container");
 					list_container.html("");
 					list_container.append(list_dom);

 					if (is_empty) {
 						var cont_empty= list_container.find(".empty-msg");
 						cont_empty.css("margin-top",view_list.height()/2-20+"px");
 						$(window).on("resize", function() {
 							cont_empty.css("margin-top",view_list.height()/2-20+"px");
 						});
 					}

 					view_list.mCustomScrollbar("update");
 					if(list_container.find(".view-item").length!==0){
 						list_container.find(".view-item").eq(0).trigger("click");
 					}else{
 						edit_cont.html("").append(empty_editor);
 						var cont_empty= edit_cont.find(".empty-editor");
 						cont_empty.css("margin-top",view_list.height()/2-20+"px");
 						$(window).on("resize", function() {
 							cont_empty.css("margin-top",view_list.height()/2-20+"px");
 						});
 					}
 				}
 				view_list.mCustomScrollbar("scrollTo","top");
 			}
 		});	
 		folder_list_title.removeClass("title-selected");
 		folder_item_list.find(".item-cont").removeClass("selected");
 		var is_title_folder = _this.hasClass("folder-list-title")?true:false;
 		is_title_folder?_this.addClass("title-selected"):_this.addClass("selected");
 		
	}
});
