define("noteEdit", function(require,exports,module){
	"use strict";
	var editormd = require("editormd");


	var edit_bar = $(".edit-bar"),
		view_list = $(".view-list"),
		name_cont = edit_bar.find(".name-cont"),
		save_btn = edit_bar.find(".save-btn"),
		share_btn = edit_bar.find(".share-btn"),
		edit_cont = $(".edit-cont"),
		folder_item_list = $(".folder-item-list"),
		folder_list_title = $(".folder-list-title"),
		editor_md;

	var editor_init = {
		mkEditorInit: function(data){
			editor_md = editormd("editor", {
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
		            // console.log('onload', this);
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
		noteEditorInit: function(){
			window.CKEDITOR.replace("editor");				
		}
	};
	


	view_list.on("click", ".view-item", function() {
		var _this = $(this),
			this_note = _this.find(".item-cont"),
			this_name = _this.find(".btn-text").text(),
			note_id = this_note.attr("data-entity-id"),
			note_type = this_note.attr("data-type"),
			editorInitKey = note_type+"EditorInit";


		$(this).addClass("selected").siblings(".view-item").removeClass("selected");
		name_cont.text(this_name);

		save_btn.attr("data-entity-id", note_id);
		share_btn.attr("data-entity-id", note_id);

		save_btn.attr("data-type", note_type);
		share_btn.attr("data-type",  note_type);

		var post_data = {
			note_id: note_id
		};
		$.ajax({
			url: "/getNote",
			type: "POST",
			dataType: "JSON",
			data: post_data,
			success:function(data){
				var note_content = data.note_content;

				var editor_dom = {
					mk: ["<div id=\"editor\"><textarea style=\"display:none;\">"+
					note_content+"</textarea></div>"].join(""),
					note: ["<div id=\"editor\">"+note_content+"</div>"].join("")
				}
				edit_cont.html("").append(editor_dom[note_type]);
				var editorInit = editor_init[editorInitKey];
				editorInit();
			}
		});

				
	});

	save_btn.on("click", saveFun);

	function getAbstract(text){
		var abstract = "";
		if(text.length>80){
			abstract = text.substring(0,80);
		}else{
			abstract = text;
		}
		return abstract;
	}
	function saveFun(){
		var _this = $(this),
			note_type = _this.attr("data-type"),
			post_data = {};
		_this.text("正在保存")
		post_data.note_id = _this.attr("data-entity-id");
		if(note_type==="note"){
			var abstract = getAbstract(CKEDITOR.instances.editor.document.getBody().getText());
			
			post_data.note_content = CKEDITOR.instances.editor.getData();
			post_data.note_abstract = abstract;

		}else{
			post_data.note_content = editor_md.getMarkdown();
			post_data.note_abstract = "";
		}
		
		$.ajax({
			url: "/saveNote",
			type: "POST",
			dataType: "JSON",
			data: post_data,
			success:function(data){
				if(data.is_saved){
					if(folder_list_title.hasClass("title-selected")){
						folder_list_title.trigger("click")
					}else{
						folder_item_list.find(".selected").trigger("click");
					}
					_this.text("保存");
				}
			}
		});
	}
	window.CKEDITOR.on("instanceReady", ckEditorReady);

	function ckEditorReady(){
		var cke_contents = $(".cke_contents"),
		edit_cont = $(".edit-cont");

		cke_contents.fullHeight({
			extra:["cke_bottom"]
		});
		edit_cont.fullHeight();
	}
});