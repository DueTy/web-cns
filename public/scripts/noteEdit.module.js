define("noteEdit", function(require,exports,module){
	"use strict";
	var editormd = require("editormd");

	var editor_init = {
		mkEditorInit: function(data,save_btn){
			var testEditor = editormd("editor", {
		        width: "100%",
		        height: "100%",
		        path : '/dist/editormd/lib/',
		        codeFold : true,
		        //syncScrolling : false,
		        saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
		        searchReplace : true,
		        //watch : false,                // 关闭实时预览
		        htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启    
		        //toolbar  : false,             //关闭工具栏
		        //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
		        emoji : true,
		        taskList : true,
		        tocm            : true,         // Using [TOCM]
		        tex : true,                   // 开启科学公式TeX语言支持，默认关闭
		        flowChart : true,             // 开启流程图支持，默认关闭
		        sequenceDiagram : true,       // 开启时序/序列图支持，默认关闭,
		        //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
		        //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
		        //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
		        //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
		        //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
		        imageUpload : true,
		        imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
		        imageUploadURL : "./php/upload.php",
		        onload : function() {
		            console.log('onload', this);
		            //this.fullscreen();
		            //this.unwatch();
		            //this.watch().fullscreen();

		            //this.setMarkdown("#PHP");
		            //this.width("100%");
		            //this.height(480);
		            //this.resize("100%", 640);
		        }
		    });
		},
		noteEditorInit: function(data,save_btn){
			window.CKEDITOR.replace("editor");

			window.CKEDITOR.on("instanceReady", ckEditorReady);

			function ckEditorReady(){
				var cke_contents = $(".cke_contents"),
				edit_cont = $(".edit-cont");

				cke_contents.fullHeight({
					extra:["cke_bottom"]
				});
				edit_cont.fullHeight();
			}
		}
	};
	var edit_bar = $(".edit-bar"),
		view_list = $(".view-list"),
		save_btn = edit_bar.find(".save-btn"),
		share_btn = edit_bar.find(".share-btn"),
		edit_cont = $(".edit-cont");

	view_list.on("click", ".view-item", function() {
		var this_note = $(this).find(".item-cont"),
			note_id = this_note.attr("data-entity-id"),
			note_type = this_note.attr("data-type"),
			editorInitKey = note_type+"EditorInit",
			editor_dom = ["<div id=\"editor\"></div>"].join("");

		save_btn.attr("data-entity-id", note_id);
		share_btn.attr("data-entity-id", note_id);

		edit_cont.html("").append(editor_dom);

		var editorInit = editor_init[editorInitKey];
		editorInit();		
	});
});