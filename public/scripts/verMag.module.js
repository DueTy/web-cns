define("verMag",function(require,exports,module){
	"use strict";

	require("customScrollBar");
	require("backLayer");
	var editormd = require("editormd");


	var check_ver_btn = $(".note-detail-menu .version"),
		ver_mag_cont = $(".version-mag-cont"),
		ver_note_cont = ver_mag_cont.find(".note-cont"),
		ver_list = ver_mag_cont.find(".version-list"),
		ver_container = ver_list.find(".mCSB_container"),
		view_list = $(".view-list"),
		ver_editormd;
		

	var editor_init = {
		mkEditorInit: function(){
			ver_editormd = editormd("ver_editor", {		        
                width: "100%",
                height: "100%",
		        path : '/dist/editormd/lib/',
                readOnly: true,
                styleActiveLine: false,   // disable active line
                lineNumbers: true      // hide line numbers
		    });
		},
		noteEditorInit: function(){
			window.CKEDITOR.replace("ver_editor",{
				toolbarCanCollapse: false, 
				toolbarStartupExpanded: false
			});				
		}
	};

	

	check_ver_btn.on("click",verMagInit);

	ver_list.on("click", ".version-item", verCheck);

	ver_list.on("click", ".back-btn", verBack);

	ver_list.on("click", ".del-btn", verDel);

	function verMagInit(){
		var _this = $(this),
			belong_note_id = _this.parent(".widget-menu").attr("data-target-id"),
			note_type = view_list.find("div[data-entity-id="+belong_note_id+"]")
						.attr("data-type");
		var post_data = {
			belong_note_id: belong_note_id,
			is_belong_id: true
		};

		$.ajax({
			url: "/verGet",
			type: "POST",
			dataType: "JSON",
			data: post_data,
			success:function(data){
				if (data.is_get) {
					ver_container.html("").append(data.list_dom);
					ver_mag_cont.attr("data-type",note_type);
					ver_mag_cont.attr("data-target-id",belong_note_id);
					ver_list.find(".version-item").eq(0).trigger("click");
					ver_mag_cont.backLayer({
						closeCall: warnClkClose
					});
				}else{
					$(".warn-msg").find(".msg-text").text("改笔记还未创建任何版本");
					$(".warn-msg").backLayer({
						closeCall: warnCloseCall
					});
				}
			}
		});
	}
	function verCheck(){
		var _this = $(this),
			ver_id = _this.attr("data-entity-id"),
			note_type = ver_mag_cont.attr("data-type");
		var post_data = {
			ver_id: ver_id,
			is_belong_id: false
		};
		$.ajax({
			url: "/verGet",
			type: "POST",
			dataType: "JSON",
			data: post_data,
			success:function(data){
				if (data.is_get) {
					_this.addClass("item-active")
					.siblings(".version-item").removeClass("item-active");
					var note_content = data.note_content;
					var editor_dom = {
						mk: ["<div id=\"ver_editor\"><textarea style=\"display:none;\">"+
						note_content+"</textarea></div>"].join(""),
						note: ["<div id=\"ver_editor\">"+note_content+"</div>"].join("")
					};
					ver_note_cont.html("").append(editor_dom[note_type]);
					var editorInit = editor_init[note_type+"EditorInit"];
					editorInit();
					if(note_type==="note"){
						window.CKEDITOR.on("instanceReady", ckEditorReady);
					}
				}
			}
		});

	}

	function verDel(event){
		event.stopPropagation();
		var ver_id = $(this).attr("data-back-id"),
			post_data = {};
		post_data.ver_id = ver_id;
		$.ajax({
			url: "/verDel",
			type: "POST",
			dataType: "JSON",
			data: post_data,
			success:function(data){
				if (data.is_del) {
					check_ver_btn.trigger("click");
					$(".back-layer").trigger("click");
				}
			}
		});

	}

	function verBack(event){	
		event.stopPropagation();
		/* Act on the event */
		var belong_note_id = ver_mag_cont.attr("data-target-id"),
			note_type = ver_mag_cont.attr("data-type"),
			post_data = {},
			ver_id = $(this).attr("data-back-id"),
			ver_del_post = {};

		post_data.belong_note_id = belong_note_id;
		post_data.ver_id = ver_id;
		ver_del_post.ver_id = ver_id;

		$.ajax({
			url: "/verBack",
			type: "POST",
			dataType: "JSON",
			data: post_data,
			success:function(data){
				if (data.is_back) {
					$(".back-layer").trigger("click");
					$(".side-bar-list").find(".selected").trigger("click");
					$(".side-bar-list").find(".title-selected").trigger("click");

					$.ajax({
						url: "/verDel",
						type: "POST",
						dataType: "JSON",
						data: ver_del_post,
						success:function(data){
							if (data.is_del) {
								console.log("del suc");
							}
						}
					});

				}
			}
		});

	}


	function ckEditorReady(){
		CKEDITOR.instances.ver_editor.setReadOnly(true);
	}

	function warnClkClose(containerBox, layer){
		layer.one("click",function(){
			containerBox.hide();
			layer.remove();
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
		},1500);
	} 
	function getAbstract(text){
		var abstract = "";
		if(text.length>80){
			abstract = text.substring(0,80);
		}else{
			abstract = text;
		}
		return abstract;
	}

});