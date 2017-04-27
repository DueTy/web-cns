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
	};
	view_list.mCustomScrollbar(scroll_opts);
	folder_item_list.mCustomScrollbar(scroll_opts);


	function sideBarOpt(){
		main_box.toggleClass("page-side-close");
		$(window).trigger("resize");
	}
	if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
		CKEDITOR.tools.enableHtml5Elements( document );

	CKEDITOR.config.width = 'auto';


	var initSample = ( function() {
		var wysiwygareaAvailable = isWysiwygareaAvailable(),
		isBBCodeBuiltIn = !!CKEDITOR.plugins.get( 'bbcode' );

		return function() {
			var editorElement = CKEDITOR.document.getById( 'editor' );


			if ( wysiwygareaAvailable ) {
				CKEDITOR.replace( 'editor' );

			} else {
				editorElement.setAttribute( 'contenteditable', 'true' );
				CKEDITOR.inline( 'editor' );

			}
		};

		function isWysiwygareaAvailable() {
			if ( CKEDITOR.revision == ( '%RE' + 'V%' ) ) {
				return true;
			}

			return !!CKEDITOR.plugins.get( 'wysiwygarea' );
		}
	} )();
	initSample();


	window.CKEDITOR.on("instanceReady", function (evt) {

		var cke_contents = $(".cke_contents");

		cke_contents.fullHeight({
			extra:["cke_bottom"]
		});
		console.log(CKEDITOR.instances.editor._.data);
	});

});
