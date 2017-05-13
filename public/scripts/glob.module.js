define(function(require){
	//加载依赖模块
	require("fullPage");
	require("mouseWheel");
	require("customScrollBar");
	require("widgetMenu");
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
		mouseWheelPixels: 250
	};
	view_list.mCustomScrollbar(scroll_opts);
	folder_item_list.mCustomScrollbar(scroll_opts);
	
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
 	$(".folder-menu").widgetMenu({
 		trigger: ".folder-item",
 		show_class: "folder-menu-show",
 		is_left: false,
 		flo_mouse: true
 	});
 	$(".folder-menu").widgetMenu({
 		trigger: ".folder-item .down-arr",
 		show_class: "folder-menu-show",
 		flo_mouse: true
 	});
 	$(".note-detail-menu").widgetMenu({
 		trigger: ".view-item",
 		show_class: "note-detail-menu-show",
 		is_left: false,
 		flo_mouse: true
 	});


	var new_btn = $(".side-bar .new-btn"),
		new_menu = $(".side-bar .new-menu");
	
	new_menu.widgetMenu({
		trigger: ".side-bar .new-btn",
		show_class: "new-menu-show"
	});

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
});
