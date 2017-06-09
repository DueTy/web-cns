define("noteShare",function(require,exports,module){
	"use strict";
	var editormd = require("editormd");
	require("fullPage");

	var note_type = $("#editor").attr("data-type"),
		editor_md;

	var editor_init = {
		mkEditorInit: function(data){
			editor_md = editormd("editor", {		        
                width: "100%",
                height: "100%",
		        path : '/dist/editormd/lib/',
                readOnly: true,
                styleActiveLine: false,   // disable active line
                lineNumbers: true      // hide line numbers
		    });
		},
		noteEditorInit: function(){
			window.CKEDITOR.replace("editor",{
				toolbarCanCollapse: false, 
				toolbarStartupExpanded: false
			});				
		}
	};
	$(".share-box").fullHeight();

	window.CKEDITOR.on("instanceReady", ckEditorReady);

	function ckEditorReady(){
		var cke_contents = $(".cke_contents"),
		share_box = $(".share-box");

		cke_contents.fullHeight({
			extra:["cke_bottom"]
		});
		share_box.fullHeight();
		CKEDITOR.instances.editor.setReadOnly(true);
	}

	var editorInitKey = note_type+"EditorInit";
	var editorInit = editor_init[editorInitKey];
	editorInit();

});