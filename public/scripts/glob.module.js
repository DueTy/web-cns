define(function(require){
	//加载依赖模块
	require("fullPage");
	require("mouseWheel");
	require("customScrollBar");
	require("widgetMenu");
	require("renameWidget");
	var editormd = require("editormd");

	var main_box = $(".main-box"),
	side_close = $(".side-close"),
	side_open = $(".side-open");
	var folder_item_list = $(".folder-item-list"),
		view_list = $(".view-list"),
		edit_cont = $(".edit-cont");


	side_close.on("click", sideBarOpt);
	side_open.on("click", sideBarOpt);
	edit_cont.fullHeight();

	view_list.fullHeight();
	folder_item_list.fullHeight();
	
	var scroll_opts = {
		mouseWheelPixels: 250,
		advanced:{
    		autoScrollOnFocus:false
  		}
	};
	view_list.mCustomScrollbar(scroll_opts);
	folder_item_list.mCustomScrollbar(scroll_opts);

	var folder_item_list = $(".folder-item-list"),
		view_list = $(".view-list");
	
	require("newNote");
	require("newFolder");


	function sideBarOpt(){
		main_box.toggleClass("page-side-close");
		$(window).trigger("resize");
	}
	window.CKEDITOR.replace( 'editor' );
	// testEditor = editormd("editor", {
 //        width: "100%",
 //        height: "100%",
 //        path : '/dist/editormd/lib/',
 //        codeFold : true,
 //        //syncScrolling : false,
 //        saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
 //        searchReplace : true,
 //        //watch : false,                // 关闭实时预览
 //        htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启    
 //        //toolbar  : false,             //关闭工具栏
 //        //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
 //        emoji : true,
 //        taskList : true,
 //        tocm            : true,         // Using [TOCM]
 //        tex : true,                   // 开启科学公式TeX语言支持，默认关闭
 //        flowChart : true,             // 开启流程图支持，默认关闭
 //        sequenceDiagram : true,       // 开启时序/序列图支持，默认关闭,
 //        //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
 //        //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
 //        //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
 //        //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
 //        //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
 //        imageUpload : true,
 //        imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
 //        imageUploadURL : "./php/upload.php",
 //        onload : function() {
 //            console.log('onload', this);
 //            //this.fullscreen();
 //            //this.unwatch();
 //            //this.watch().fullscreen();

 //            //this.setMarkdown("#PHP");
 //            //this.width("100%");
 //            //this.height(480);
 //            //this.resize("100%", 640);
 //        }
 //    });
 	

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

 	folder_item_list.on("click", ".item-cont", function() {
 		var post_data = {},
 			_this = $(this),
 			folder_id = _this.attr("data-entity-id");

 		post_data.folder_id = folder_id;

 		$.ajax({
 			url: "/getNoteList",
 			type: "POST",
 			dataType: "JSON",
 			data: post_data,
 			success:function(data){
 				var list_dom = "";
 				if (data) {
 					list_dom = data.list_dom;
 					var list_container = view_list.find(".mCSB_container");
 					list_container.html("");
 					list_container.append(list_dom);
 					view_list.mCustomScrollbar("update");
 				}
 				view_list.mCustomScrollbar("scrollTo","top");
 			}
 		});	
 		folder_item_list.find(".item-cont").removeClass("selected");
 		_this.addClass("selected");
 	});

 	view_list.on("click", ".item-cont", function() {
 		var post_data = {},
 			_this = $(this),
 			note_id = _this.attr("data-entity-id"); 		
 	});


	var new_btn = $(".side-bar .new-btn"),
		new_menu = $(".side-bar .new-menu");
	
	

	window.CKEDITOR.on("instanceReady", afterEditorInited);


	function afterEditorInited(){
		var cke_contents = $(".cke_contents"),
			edit_cont = $(".edit-cont");

		cke_contents.fullHeight({
			extra:["cke_bottom"]
		});
		edit_cont.fullHeight();
		new_btn.on("click", function() {
		
			// CKEDITOR.instances.editor.setData("<p>听，海哭的声音。。。</p>");
			console.log(CKEDITOR.instances.editor.getData());
		});
	}
	function renameCall(menu){
		var rename_btn = menu.find(".rename");

		rename_btn.on("click", function() {
			var target_id = menu.attr("data-target-id");
			var target = $("div[data-entity-id="+target_id+"]");
			target.find(".rename-cont").renameWidget();
		});
	}
});
