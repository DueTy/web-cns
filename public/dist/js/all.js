define("fullPage",function(require,exports,module){
	"use strict";
	(function($){
        var jQuery = $;

        if (!$) {
            return console.warn("fullHeight needs jQuery");
        }

        $.fn.fullHeight = function(opts){
            var defaults = {
                main: "",
                extra: []
            };
            var setting = $.extend(defaults,opts);
        	var _this = $(this),
                _extra = setting.extra;


        	setHeight();
        	$(window).on("resize",setHeight);

        	function setHeight(){        		
        		var _top = _this.offset().top,
                    _extra_height = getExtraHeight(_extra),
        			w_h = $(window).height();
        		_this.css("height",w_h-_top-3-_extra_height); 
        	}

            function getExtraHeight(extra_arr){
                var tol_height =0;
                if (extra_arr.length===0) {
                    return tol_height;
                }else{
                    tol_height=10;
                    for (var i = 0; i < extra_arr.length; i++) {
                        tol_height+= $("."+extra_arr[i]).height();
                    }
                }                
                return tol_height;
            }
        }
	})(window.jQuery || require("jquery"));
});
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
		})
		console.log(CKEDITOR.instances.editor._.data);
	})

});

/*
== malihu jquery custom scrollbars plugin == 
version: 2.8.2 
author: malihu (http://manos.malihu.gr) 
plugin home: http://manos.malihu.gr/jquery-custom-content-scroller 
*/

/*
Copyright 2010-2013 Manos Malihutsakis 

This program is free software: you can redistribute it and/or modify 
it under the terms of the GNU Lesser General Public License as published by 
the Free Software Foundation, either version 3 of the License, or 
any later version. 

This program is distributed in the hope that it will be useful, 
but WITHOUT ANY WARRANTY; without even the implied warranty of 
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the 
GNU Lesser General Public License for more details. 

You should have received a copy of the GNU Lesser General Public License 
along with this program.  If not, see http://www.gnu.org/licenses/lgpl.html. 
*/
define("customScrollBar",function(require,exports,module){
(function($){
	/*plugin script*/
	var methods={
		init:function(options){
			var defaults={ 
				set_width:false, /*optional element width: boolean, pixels, percentage*/
				set_height:false, /*optional element height: boolean, pixels, percentage*/
				horizontalScroll:false, /*scroll horizontally: boolean*/
				scrollInertia:950, /*scrolling inertia: integer (milliseconds)*/
				mouseWheel:true, /*mousewheel support: boolean*/
				mouseWheelPixels:"auto", /*mousewheel pixels amount: integer, "auto"*/
				autoDraggerLength:true, /*auto-adjust scrollbar dragger length: boolean*/
				autoHideScrollbar:false, /*auto-hide scrollbar when idle*/
				snapAmount:null, /* optional element always snaps to a multiple of this number in pixels */
				snapOffset:0, /* when snapping, snap with this number in pixels as an offset */
				scrollButtons:{ /*scroll buttons*/
					enable:false, /*scroll buttons support: boolean*/
					scrollType:"continuous", /*scroll buttons scrolling type: "continuous", "pixels"*/
					scrollSpeed:"auto", /*scroll buttons continuous scrolling speed: integer, "auto"*/
					scrollAmount:40 /*scroll buttons pixels scroll amount: integer (pixels)*/
				},
				advanced:{
					updateOnBrowserResize:true, /*update scrollbars on browser resize (for layouts based on percentages): boolean*/
					updateOnContentResize:false, /*auto-update scrollbars on content resize (for dynamic content): boolean*/
					autoExpandHorizontalScroll:false, /*auto-expand width for horizontal scrolling: boolean*/
					autoScrollOnFocus:true, /*auto-scroll on focused elements: boolean*/
					normalizeMouseWheelDelta:false /*normalize mouse-wheel delta (-1/1)*/
				},
				contentTouchScroll:true, /*scrolling by touch-swipe content: boolean*/
				callbacks:{
					onScrollStart:function(){}, /*user custom callback function on scroll start event*/
					onScroll:function(){}, /*user custom callback function on scroll event*/
					onTotalScroll:function(){}, /*user custom callback function on scroll end reached event*/
					onTotalScrollBack:function(){}, /*user custom callback function on scroll begin reached event*/
					onTotalScrollOffset:0, /*scroll end reached offset: integer (pixels)*/
					onTotalScrollBackOffset:0, /*scroll begin reached offset: integer (pixels)*/
					whileScrolling:function(){} /*user custom callback function on scrolling event*/
				},
				theme:"light" /*"light", "dark", "light-2", "dark-2", "light-thick", "dark-thick", "light-thin", "dark-thin"*/
			},
			options=$.extend(true,defaults,options);
			return this.each(function(){
				var $this=$(this);
				/*set element width/height, create markup for custom scrollbars, add classes*/
				if(options.set_width){
					$this.css("width",options.set_width);
				}
				if(options.set_height){
					$this.css("height",options.set_height);
				}
				if(!$(document).data("mCustomScrollbar-index")){
					$(document).data("mCustomScrollbar-index","1");
				}else{
					var mCustomScrollbarIndex=parseInt($(document).data("mCustomScrollbar-index"));
					$(document).data("mCustomScrollbar-index",mCustomScrollbarIndex+1);
				}
				$this.wrapInner("<div class='mCustomScrollBox"+" mCS-"+options.theme+"' id='mCSB_"+$(document).data("mCustomScrollbar-index")+"' style='position:relative; height:100%; overflow:hidden; max-width:100%;' />").addClass("mCustomScrollbar _mCS_"+$(document).data("mCustomScrollbar-index"));
				var mCustomScrollBox=$this.children(".mCustomScrollBox");
				if(options.horizontalScroll){
					mCustomScrollBox.addClass("mCSB_horizontal").wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");
					var mCSB_h_wrapper=mCustomScrollBox.children(".mCSB_h_wrapper");
					mCSB_h_wrapper.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />").children(".mCSB_container").css({"width":mCSB_h_wrapper.children().outerWidth(),"position":"relative"}).unwrap();
				}else{
					mCustomScrollBox.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />");
				}
				var mCSB_container=mCustomScrollBox.children(".mCSB_container");
				if($.support.touch){
					mCSB_container.addClass("mCS_touch");
				}
				mCSB_container.after("<div class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer'><div class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");
				var mCSB_scrollTools=mCustomScrollBox.children(".mCSB_scrollTools"),
					mCSB_draggerContainer=mCSB_scrollTools.children(".mCSB_draggerContainer"),
					mCSB_dragger=mCSB_draggerContainer.children(".mCSB_dragger");
				if(options.horizontalScroll){
					mCSB_dragger.data("minDraggerWidth",mCSB_dragger.width());
				}else{
					mCSB_dragger.data("minDraggerHeight",mCSB_dragger.height());
				}
				if(options.scrollButtons.enable){
					if(options.horizontalScroll){
						mCSB_scrollTools.prepend("<a class='mCSB_buttonLeft' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonRight' oncontextmenu='return false;'></a>");
					}else{
						mCSB_scrollTools.prepend("<a class='mCSB_buttonUp' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonDown' oncontextmenu='return false;'></a>");
					}
				}
				/*mCustomScrollBox scrollTop and scrollLeft is always 0 to prevent browser focus scrolling*/
				mCustomScrollBox.bind("scroll",function(){
					if(!$this.is(".mCS_disabled")){ /*native focus scrolling for disabled scrollbars*/
						mCustomScrollBox.scrollTop(0).scrollLeft(0);
					}
				});
				/*store options, global vars/states, intervals*/
				$this.data({
					/*init state*/
					"mCS_Init":true,
					/*instance index*/
					"mCustomScrollbarIndex":$(document).data("mCustomScrollbar-index"),
					/*option parameters*/
					"horizontalScroll":options.horizontalScroll,
					"scrollInertia":options.scrollInertia,
					"scrollEasing":"mcsEaseOut",
					"mouseWheel":options.mouseWheel,
					"mouseWheelPixels":options.mouseWheelPixels,
					"autoDraggerLength":options.autoDraggerLength,
					"autoHideScrollbar":options.autoHideScrollbar,
					"snapAmount":options.snapAmount,
					"snapOffset":options.snapOffset,
					"scrollButtons_enable":options.scrollButtons.enable,
					"scrollButtons_scrollType":options.scrollButtons.scrollType,
					"scrollButtons_scrollSpeed":options.scrollButtons.scrollSpeed,
					"scrollButtons_scrollAmount":options.scrollButtons.scrollAmount,
					"autoExpandHorizontalScroll":options.advanced.autoExpandHorizontalScroll,
					"autoScrollOnFocus":options.advanced.autoScrollOnFocus,
					"normalizeMouseWheelDelta":options.advanced.normalizeMouseWheelDelta,
					"contentTouchScroll":options.contentTouchScroll,
					"onScrollStart_Callback":options.callbacks.onScrollStart,
					"onScroll_Callback":options.callbacks.onScroll,
					"onTotalScroll_Callback":options.callbacks.onTotalScroll,
					"onTotalScrollBack_Callback":options.callbacks.onTotalScrollBack,
					"onTotalScroll_Offset":options.callbacks.onTotalScrollOffset,
					"onTotalScrollBack_Offset":options.callbacks.onTotalScrollBackOffset,
					"whileScrolling_Callback":options.callbacks.whileScrolling,
					/*events binding state*/
					"bindEvent_scrollbar_drag":false,
					"bindEvent_content_touch":false,
					"bindEvent_scrollbar_click":false,
					"bindEvent_mousewheel":false,
					"bindEvent_buttonsContinuous_y":false,
					"bindEvent_buttonsContinuous_x":false,
					"bindEvent_buttonsPixels_y":false,
					"bindEvent_buttonsPixels_x":false,
					"bindEvent_focusin":false,
					"bindEvent_autoHideScrollbar":false,
					/*buttons intervals*/
					"mCSB_buttonScrollRight":false,
					"mCSB_buttonScrollLeft":false,
					"mCSB_buttonScrollDown":false,
					"mCSB_buttonScrollUp":false
				});
				/*max-width/max-height*/
				if(options.horizontalScroll){
					if($this.css("max-width")!=="none"){
						if(!options.advanced.updateOnContentResize){ /*needs updateOnContentResize*/
							options.advanced.updateOnContentResize=true;
						}
					}
				}else{
					if($this.css("max-height")!=="none"){
						var percentage=false,maxHeight=parseInt($this.css("max-height"));
						if($this.css("max-height").indexOf("%")>=0){
							percentage=maxHeight,
							maxHeight=$this.parent().height()*percentage/100;
						}
						$this.css("overflow","hidden");
						mCustomScrollBox.css("max-height",maxHeight);
					}
				}
				$this.mCustomScrollbar("update");
				/*window resize fn (for layouts based on percentages)*/
				if(options.advanced.updateOnBrowserResize){
					var mCSB_resizeTimeout,currWinWidth=$(window).width(),currWinHeight=$(window).height();
					$(window).bind("resize."+$this.data("mCustomScrollbarIndex"),function(){
						if(mCSB_resizeTimeout){
							clearTimeout(mCSB_resizeTimeout);
						}
						mCSB_resizeTimeout=setTimeout(function(){
							if(!$this.is(".mCS_disabled") && !$this.is(".mCS_destroyed")){
								var winWidth=$(window).width(),winHeight=$(window).height();
								if(currWinWidth!==winWidth || currWinHeight!==winHeight){ /*ie8 fix*/
									if($this.css("max-height")!=="none" && percentage){
										mCustomScrollBox.css("max-height",$this.parent().height()*percentage/100);
									}
									$this.mCustomScrollbar("update");
									currWinWidth=winWidth; currWinHeight=winHeight;
								}
							}
						},150);
					});
				}
				/*content resize fn (for dynamically generated content)*/
				if(options.advanced.updateOnContentResize){
					var mCSB_onContentResize;
					if(options.horizontalScroll){
						var mCSB_containerOldSize=mCSB_container.outerWidth();
					}else{
						var mCSB_containerOldSize=mCSB_container.outerHeight();
					}
					mCSB_onContentResize=setInterval(function(){
						if(options.horizontalScroll){
							if(options.advanced.autoExpandHorizontalScroll){
								mCSB_container.css({"position":"absolute","width":"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({"width":mCSB_container.outerWidth(),"position":"relative"}).unwrap();
							}
							var mCSB_containerNewSize=mCSB_container.outerWidth();
						}else{
							var mCSB_containerNewSize=mCSB_container.outerHeight();
						}
						if(mCSB_containerNewSize!=mCSB_containerOldSize){
							$this.mCustomScrollbar("update");
							mCSB_containerOldSize=mCSB_containerNewSize;
						}
					},300);
				}
			});
		},
		update:function(){
			var $this=$(this),
				mCustomScrollBox=$this.children(".mCustomScrollBox"),
				mCSB_container=mCustomScrollBox.children(".mCSB_container");
			mCSB_container.removeClass("mCS_no_scrollbar");
			$this.removeClass("mCS_disabled mCS_destroyed");
			mCustomScrollBox.scrollTop(0).scrollLeft(0); /*reset scrollTop/scrollLeft to prevent browser focus scrolling*/
			var mCSB_scrollTools=mCustomScrollBox.children(".mCSB_scrollTools"),
				mCSB_draggerContainer=mCSB_scrollTools.children(".mCSB_draggerContainer"),
				mCSB_dragger=mCSB_draggerContainer.children(".mCSB_dragger");
			if($this.data("horizontalScroll")){
				var mCSB_buttonLeft=mCSB_scrollTools.children(".mCSB_buttonLeft"),
					mCSB_buttonRight=mCSB_scrollTools.children(".mCSB_buttonRight"),
					mCustomScrollBoxW=mCustomScrollBox.width();
				if($this.data("autoExpandHorizontalScroll")){
					mCSB_container.css({"position":"absolute","width":"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({"width":mCSB_container.outerWidth(),"position":"relative"}).unwrap();
				}
				var mCSB_containerW=mCSB_container.outerWidth();
			}else{
				var mCSB_buttonUp=mCSB_scrollTools.children(".mCSB_buttonUp"),
					mCSB_buttonDown=mCSB_scrollTools.children(".mCSB_buttonDown"),
					mCustomScrollBoxH=mCustomScrollBox.height(),
					mCSB_containerH=mCSB_container.outerHeight();
			}
			if(mCSB_containerH>mCustomScrollBoxH && !$this.data("horizontalScroll")){ /*content needs vertical scrolling*/
				mCSB_scrollTools.css("display","block");
				var mCSB_draggerContainerH=mCSB_draggerContainer.height();
				/*auto adjust scrollbar dragger length analogous to content*/
				if($this.data("autoDraggerLength")){
					var draggerH=Math.round(mCustomScrollBoxH/mCSB_containerH*mCSB_draggerContainerH),
						minDraggerH=mCSB_dragger.data("minDraggerHeight");
					if(draggerH<=minDraggerH){ /*min dragger height*/
						mCSB_dragger.css({"height":minDraggerH});
					}else if(draggerH>=mCSB_draggerContainerH-10){ /*max dragger height*/
						var mCSB_draggerContainerMaxH=mCSB_draggerContainerH-10;
						mCSB_dragger.css({"height":mCSB_draggerContainerMaxH});
					}else{
						mCSB_dragger.css({"height":draggerH});
					}
					mCSB_dragger.children(".mCSB_dragger_bar").css({"line-height":mCSB_dragger.height()+"px"});
				}
				var mCSB_draggerH=mCSB_dragger.height(),
				/*calculate and store scroll amount, add scrolling*/
					scrollAmount=(mCSB_containerH-mCustomScrollBoxH)/(mCSB_draggerContainerH-mCSB_draggerH);
				$this.data("scrollAmount",scrollAmount).mCustomScrollbar("scrolling",mCustomScrollBox,mCSB_container,mCSB_draggerContainer,mCSB_dragger,mCSB_buttonUp,mCSB_buttonDown,mCSB_buttonLeft,mCSB_buttonRight);
				/*scroll*/
				var mCSB_containerP=Math.abs(mCSB_container.position().top);
				$this.mCustomScrollbar("scrollTo",mCSB_containerP,{scrollInertia:0,trigger:"internal"});
			}else if(mCSB_containerW>mCustomScrollBoxW && $this.data("horizontalScroll")){ /*content needs horizontal scrolling*/
				mCSB_scrollTools.css("display","block");
				var mCSB_draggerContainerW=mCSB_draggerContainer.width();
				/*auto adjust scrollbar dragger length analogous to content*/
				if($this.data("autoDraggerLength")){
					var draggerW=Math.round(mCustomScrollBoxW/mCSB_containerW*mCSB_draggerContainerW),
						minDraggerW=mCSB_dragger.data("minDraggerWidth");
					if(draggerW<=minDraggerW){ /*min dragger height*/
						mCSB_dragger.css({"width":minDraggerW});
					}else if(draggerW>=mCSB_draggerContainerW-10){ /*max dragger height*/
						var mCSB_draggerContainerMaxW=mCSB_draggerContainerW-10;
						mCSB_dragger.css({"width":mCSB_draggerContainerMaxW});
					}else{
						mCSB_dragger.css({"width":draggerW});
					}
				}
				var mCSB_draggerW=mCSB_dragger.width(),
				/*calculate and store scroll amount, add scrolling*/
					scrollAmount=(mCSB_containerW-mCustomScrollBoxW)/(mCSB_draggerContainerW-mCSB_draggerW);
				$this.data("scrollAmount",scrollAmount).mCustomScrollbar("scrolling",mCustomScrollBox,mCSB_container,mCSB_draggerContainer,mCSB_dragger,mCSB_buttonUp,mCSB_buttonDown,mCSB_buttonLeft,mCSB_buttonRight);
				/*scroll*/
				var mCSB_containerP=Math.abs(mCSB_container.position().left);
				$this.mCustomScrollbar("scrollTo",mCSB_containerP,{scrollInertia:0,trigger:"internal"});
			}else{ /*content does not need scrolling*/
				/*unbind events, reset content position, hide scrollbars, remove classes*/
				mCustomScrollBox.unbind("mousewheel focusin");
				if($this.data("horizontalScroll")){
					mCSB_dragger.add(mCSB_container).css("left",0);
				}else{
					mCSB_dragger.add(mCSB_container).css("top",0);
				}
				mCSB_scrollTools.css("display","none");
				mCSB_container.addClass("mCS_no_scrollbar");
				$this.data({"bindEvent_mousewheel":false,"bindEvent_focusin":false});
			}
		},
		scrolling:function(mCustomScrollBox,mCSB_container,mCSB_draggerContainer,mCSB_dragger,mCSB_buttonUp,mCSB_buttonDown,mCSB_buttonLeft,mCSB_buttonRight){
			var $this=$(this);
			/*scrollbar drag scrolling*/
			if(!$this.data("bindEvent_scrollbar_drag")){
				var mCSB_draggerDragY,mCSB_draggerDragX;
				if($.support.msPointer){ /*MSPointer*/
					mCSB_dragger.bind("MSPointerDown",function(e){
						e.preventDefault();
						$this.data({"on_drag":true}); mCSB_dragger.addClass("mCSB_dragger_onDrag");
						var elem=$(this),
							elemOffset=elem.offset(),
							x=e.originalEvent.pageX-elemOffset.left,
							y=e.originalEvent.pageY-elemOffset.top;
						if(x<elem.width() && x>0 && y<elem.height() && y>0){
							mCSB_draggerDragY=y;
							mCSB_draggerDragX=x;
						}
					});
					$(document).bind("MSPointerMove."+$this.data("mCustomScrollbarIndex"),function(e){
						e.preventDefault();
						if($this.data("on_drag")){
							var elem=mCSB_dragger,
								elemOffset=elem.offset(),
								x=e.originalEvent.pageX-elemOffset.left,
								y=e.originalEvent.pageY-elemOffset.top;
							scrollbarDrag(mCSB_draggerDragY,mCSB_draggerDragX,y,x);
						}
					}).bind("MSPointerUp."+$this.data("mCustomScrollbarIndex"),function(e){
						$this.data({"on_drag":false}); mCSB_dragger.removeClass("mCSB_dragger_onDrag");
					});
				}else{ /*mouse/touch*/
					mCSB_dragger.bind("mousedown touchstart",function(e){
						e.preventDefault(); e.stopImmediatePropagation();
						var	elem=$(this),elemOffset=elem.offset(),x,y;
						if(e.type==="touchstart"){
							var touch=e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
							x=touch.pageX-elemOffset.left; y=touch.pageY-elemOffset.top;
						}else{
							$this.data({"on_drag":true}); mCSB_dragger.addClass("mCSB_dragger_onDrag");
							x=e.pageX-elemOffset.left; y=e.pageY-elemOffset.top;
						}
						if(x<elem.width() && x>0 && y<elem.height() && y>0){
							mCSB_draggerDragY=y; mCSB_draggerDragX=x;
						}
					}).bind("touchmove",function(e){
						e.preventDefault(); e.stopImmediatePropagation();
						var touch=e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
							elem=$(this),
							elemOffset=elem.offset(),
							x=touch.pageX-elemOffset.left,
							y=touch.pageY-elemOffset.top;
						scrollbarDrag(mCSB_draggerDragY,mCSB_draggerDragX,y,x);
					});
					$(document).bind("mousemove."+$this.data("mCustomScrollbarIndex"),function(e){
						if($this.data("on_drag")){
							var elem=mCSB_dragger,
								elemOffset=elem.offset(),
								x=e.pageX-elemOffset.left,
								y=e.pageY-elemOffset.top;
							scrollbarDrag(mCSB_draggerDragY,mCSB_draggerDragX,y,x);
						}
					}).bind("mouseup."+$this.data("mCustomScrollbarIndex"),function(e){
						$this.data({"on_drag":false}); mCSB_dragger.removeClass("mCSB_dragger_onDrag");
					});
				}
				$this.data({"bindEvent_scrollbar_drag":true});
			}
			function scrollbarDrag(mCSB_draggerDragY,mCSB_draggerDragX,y,x){
				if($this.data("horizontalScroll")){
					$this.mCustomScrollbar("scrollTo",(mCSB_dragger.position().left-(mCSB_draggerDragX))+x,{moveDragger:true,trigger:"internal"});
				}else{
					$this.mCustomScrollbar("scrollTo",(mCSB_dragger.position().top-(mCSB_draggerDragY))+y,{moveDragger:true,trigger:"internal"});
				}
			}
			/*content touch-drag*/
			if($.support.touch && $this.data("contentTouchScroll")){
				if(!$this.data("bindEvent_content_touch")){
					var touch,
						elem,elemOffset,y,x,mCSB_containerTouchY,mCSB_containerTouchX;
					mCSB_container.bind("touchstart",function(e){
						e.stopImmediatePropagation();
						touch=e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
						elem=$(this);
						elemOffset=elem.offset();
						x=touch.pageX-elemOffset.left;
						y=touch.pageY-elemOffset.top;
						mCSB_containerTouchY=y;
						mCSB_containerTouchX=x;
					});
					mCSB_container.bind("touchmove",function(e){
						e.preventDefault(); e.stopImmediatePropagation();
						touch=e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
						elem=$(this).parent();
						elemOffset=elem.offset();
						x=touch.pageX-elemOffset.left;
						y=touch.pageY-elemOffset.top;
						if($this.data("horizontalScroll")){
							$this.mCustomScrollbar("scrollTo",mCSB_containerTouchX-x,{trigger:"internal"});
						}else{
							$this.mCustomScrollbar("scrollTo",mCSB_containerTouchY-y,{trigger:"internal"});
						}
					});
				}
			}
			/*dragger rail click scrolling*/
			if(!$this.data("bindEvent_scrollbar_click")){
				mCSB_draggerContainer.bind("click",function(e){
					var scrollToPos=(e.pageY-mCSB_draggerContainer.offset().top)*$this.data("scrollAmount"),target=$(e.target);
					if($this.data("horizontalScroll")){
						scrollToPos=(e.pageX-mCSB_draggerContainer.offset().left)*$this.data("scrollAmount");
					}
					if(target.hasClass("mCSB_draggerContainer") || target.hasClass("mCSB_draggerRail")){
						$this.mCustomScrollbar("scrollTo",scrollToPos,{trigger:"internal",scrollEasing:"draggerRailEase"});
					}
				});
				$this.data({"bindEvent_scrollbar_click":true});
			}
			/*mousewheel scrolling*/
			if($this.data("mouseWheel")){
				if(!$this.data("bindEvent_mousewheel")){
					mCustomScrollBox.bind("mousewheel",function(e,delta){
						var scrollTo,mouseWheelPixels=$this.data("mouseWheelPixels"),absPos=Math.abs(mCSB_container.position().top),
							draggerPos=mCSB_dragger.position().top,limit=mCSB_draggerContainer.height()-mCSB_dragger.height();
						if($this.data("normalizeMouseWheelDelta")){
							if(delta<0){delta=-1;}else{delta=1;}
						}
						if(mouseWheelPixels==="auto"){
							mouseWheelPixels=100+Math.round($this.data("scrollAmount")/2);
						}
						if($this.data("horizontalScroll")){
							draggerPos=mCSB_dragger.position().left; 
							limit=mCSB_draggerContainer.width()-mCSB_dragger.width();
							absPos=Math.abs(mCSB_container.position().left);
						}
						if((delta>0 && draggerPos!==0) || (delta<0 && draggerPos!==limit)){e.preventDefault(); e.stopImmediatePropagation();}
						scrollTo=absPos-(delta*mouseWheelPixels);
						$this.mCustomScrollbar("scrollTo",scrollTo,{trigger:"internal"});
					});
					$this.data({"bindEvent_mousewheel":true});
				}
			}
			/*buttons scrolling*/
			if($this.data("scrollButtons_enable")){
				if($this.data("scrollButtons_scrollType")==="pixels"){ /*scroll by pixels*/
					if($this.data("horizontalScroll")){
						mCSB_buttonRight.add(mCSB_buttonLeft).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend",mCSB_buttonRight_stop,mCSB_buttonLeft_stop);
						$this.data({"bindEvent_buttonsContinuous_x":false});
						if(!$this.data("bindEvent_buttonsPixels_x")){
							/*scroll right*/
							mCSB_buttonRight.bind("click",function(e){
								e.preventDefault();
								PixelsScrollTo(Math.abs(mCSB_container.position().left)+$this.data("scrollButtons_scrollAmount"));
							});
							/*scroll left*/
							mCSB_buttonLeft.bind("click",function(e){
								e.preventDefault();
								PixelsScrollTo(Math.abs(mCSB_container.position().left)-$this.data("scrollButtons_scrollAmount"));
							});
							$this.data({"bindEvent_buttonsPixels_x":true});
						}
					}else{
						mCSB_buttonDown.add(mCSB_buttonUp).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend",mCSB_buttonRight_stop,mCSB_buttonLeft_stop);
						$this.data({"bindEvent_buttonsContinuous_y":false});
						if(!$this.data("bindEvent_buttonsPixels_y")){
							/*scroll down*/
							mCSB_buttonDown.bind("click",function(e){
								e.preventDefault();
								PixelsScrollTo(Math.abs(mCSB_container.position().top)+$this.data("scrollButtons_scrollAmount"));
							});
							/*scroll up*/
							mCSB_buttonUp.bind("click",function(e){
								e.preventDefault();
								PixelsScrollTo(Math.abs(mCSB_container.position().top)-$this.data("scrollButtons_scrollAmount"));
							});
							$this.data({"bindEvent_buttonsPixels_y":true});
						}
					}
					function PixelsScrollTo(to){
						if(!mCSB_dragger.data("preventAction")){
							mCSB_dragger.data("preventAction",true);
							$this.mCustomScrollbar("scrollTo",to,{trigger:"internal"});
						}
					}
				}else{ /*continuous scrolling*/
					if($this.data("horizontalScroll")){
						mCSB_buttonRight.add(mCSB_buttonLeft).unbind("click");
						$this.data({"bindEvent_buttonsPixels_x":false});
						if(!$this.data("bindEvent_buttonsContinuous_x")){
							/*scroll right*/
							mCSB_buttonRight.bind("mousedown touchstart MSPointerDown",function(e){
								e.preventDefault();
								var scrollButtonsSpeed=ScrollButtonsSpeed();
								$this.data({"mCSB_buttonScrollRight":setInterval(function(){
									$this.mCustomScrollbar("scrollTo",Math.abs(mCSB_container.position().left)+scrollButtonsSpeed,{trigger:"internal",scrollEasing:"easeOutCirc"});
								},17)});
							});
							var mCSB_buttonRight_stop=function(e){
								e.preventDefault(); clearInterval($this.data("mCSB_buttonScrollRight"));
							}
							mCSB_buttonRight.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",mCSB_buttonRight_stop);
							/*scroll left*/
							mCSB_buttonLeft.bind("mousedown touchstart MSPointerDown",function(e){
								e.preventDefault();
								var scrollButtonsSpeed=ScrollButtonsSpeed();
								$this.data({"mCSB_buttonScrollLeft":setInterval(function(){
									$this.mCustomScrollbar("scrollTo",Math.abs(mCSB_container.position().left)-scrollButtonsSpeed,{trigger:"internal",scrollEasing:"easeOutCirc"});
								},17)});
							});	
							var mCSB_buttonLeft_stop=function(e){
								e.preventDefault(); clearInterval($this.data("mCSB_buttonScrollLeft"));
							}
							mCSB_buttonLeft.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",mCSB_buttonLeft_stop);
							$this.data({"bindEvent_buttonsContinuous_x":true});
						}
					}else{
						mCSB_buttonDown.add(mCSB_buttonUp).unbind("click");
						$this.data({"bindEvent_buttonsPixels_y":false});
						if(!$this.data("bindEvent_buttonsContinuous_y")){
							/*scroll down*/
							mCSB_buttonDown.bind("mousedown touchstart MSPointerDown",function(e){
								e.preventDefault();
								var scrollButtonsSpeed=ScrollButtonsSpeed();
								$this.data({"mCSB_buttonScrollDown":setInterval(function(){
									$this.mCustomScrollbar("scrollTo",Math.abs(mCSB_container.position().top)+scrollButtonsSpeed,{trigger:"internal",scrollEasing:"easeOutCirc"});
								},17)});
							});
							var mCSB_buttonDown_stop=function(e){
								e.preventDefault(); clearInterval($this.data("mCSB_buttonScrollDown"));
							}
							mCSB_buttonDown.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",mCSB_buttonDown_stop);
							/*scroll up*/
							mCSB_buttonUp.bind("mousedown touchstart MSPointerDown",function(e){
								e.preventDefault();
								var scrollButtonsSpeed=ScrollButtonsSpeed();
								$this.data({"mCSB_buttonScrollUp":setInterval(function(){
									$this.mCustomScrollbar("scrollTo",Math.abs(mCSB_container.position().top)-scrollButtonsSpeed,{trigger:"internal",scrollEasing:"easeOutCirc"});
								},17)});
							});	
							var mCSB_buttonUp_stop=function(e){
								e.preventDefault(); clearInterval($this.data("mCSB_buttonScrollUp"));
							}
							mCSB_buttonUp.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",mCSB_buttonUp_stop);
							$this.data({"bindEvent_buttonsContinuous_y":true});
						}
					}
					function ScrollButtonsSpeed(){
						var speed=$this.data("scrollButtons_scrollSpeed");
						if($this.data("scrollButtons_scrollSpeed")==="auto"){
							speed=Math.round(($this.data("scrollInertia")+100)/40);
						}
						return speed;
					}
				}
			}
			/*scrolling on element focus (e.g. via TAB key)*/
			if($this.data("autoScrollOnFocus")){
				if(!$this.data("bindEvent_focusin")){
					mCustomScrollBox.bind("focusin",function(){
						mCustomScrollBox.scrollTop(0).scrollLeft(0);
						var focusedElem=$(document.activeElement);
						if(focusedElem.is("input,textarea,select,button,a[tabindex],area,object")){
							var mCSB_containerPos=mCSB_container.position().top,
								focusedElemPos=focusedElem.position().top,
								visibleLimit=mCustomScrollBox.height()-focusedElem.outerHeight();
							if($this.data("horizontalScroll")){
								mCSB_containerPos=mCSB_container.position().left;
								focusedElemPos=focusedElem.position().left;
								visibleLimit=mCustomScrollBox.width()-focusedElem.outerWidth();
							}
							if(mCSB_containerPos+focusedElemPos<0 || mCSB_containerPos+focusedElemPos>visibleLimit){
								$this.mCustomScrollbar("scrollTo",focusedElemPos,{trigger:"internal"});
							}
						}
					});
					$this.data({"bindEvent_focusin":true});
				}
			}
			/*auto-hide scrollbar*/
			if($this.data("autoHideScrollbar")){
				if(!$this.data("bindEvent_autoHideScrollbar")){
					mCustomScrollBox.bind("mouseenter",function(e){
						mCustomScrollBox.addClass("mCS-mouse-over");
						functions.showScrollbar.call(mCustomScrollBox.children(".mCSB_scrollTools"));
					}).bind("mouseleave touchend",function(e){
						mCustomScrollBox.removeClass("mCS-mouse-over");
						if(e.type==="mouseleave"){functions.hideScrollbar.call(mCustomScrollBox.children(".mCSB_scrollTools"));}
					});
					$this.data({"bindEvent_autoHideScrollbar":true});
				}
			}
		},
		scrollTo:function(scrollTo,options){
			var $this=$(this),
				defaults={
					moveDragger:false,
					trigger:"external",
					callbacks:true,
					scrollInertia:$this.data("scrollInertia"),
					scrollEasing:$this.data("scrollEasing")
				},
				options=$.extend(defaults,options),
				draggerScrollTo,
				mCustomScrollBox=$this.children(".mCustomScrollBox"),
				mCSB_container=mCustomScrollBox.children(".mCSB_container"),
				mCSB_scrollTools=mCustomScrollBox.children(".mCSB_scrollTools"),
				mCSB_draggerContainer=mCSB_scrollTools.children(".mCSB_draggerContainer"),
				mCSB_dragger=mCSB_draggerContainer.children(".mCSB_dragger"),
				contentSpeed=draggerSpeed=options.scrollInertia,
				scrollBeginning,scrollBeginningOffset,totalScroll,totalScrollOffset;
			if(!mCSB_container.hasClass("mCS_no_scrollbar")){
				$this.data({"mCS_trigger":options.trigger});
				if($this.data("mCS_Init")){options.callbacks=false;}
				if(scrollTo || scrollTo===0){
					if(typeof(scrollTo)==="number"){ /*if integer, scroll by number of pixels*/
						if(options.moveDragger){ /*scroll dragger*/
							draggerScrollTo=scrollTo;
							if($this.data("horizontalScroll")){
								scrollTo=mCSB_dragger.position().left*$this.data("scrollAmount");
							}else{
								scrollTo=mCSB_dragger.position().top*$this.data("scrollAmount");
							}
							draggerSpeed=0;
						}else{ /*scroll content by default*/
							draggerScrollTo=scrollTo/$this.data("scrollAmount");
						}
					}else if(typeof(scrollTo)==="string"){ /*if string, scroll by element position*/
						var target;
						if(scrollTo==="top"){ /*scroll to top*/
							target=0;
						}else if(scrollTo==="bottom" && !$this.data("horizontalScroll")){ /*scroll to bottom*/
							target=mCSB_container.outerHeight()-mCustomScrollBox.height();
						}else if(scrollTo==="left"){ /*scroll to left*/
							target=0;
						}else if(scrollTo==="right" && $this.data("horizontalScroll")){ /*scroll to right*/
							target=mCSB_container.outerWidth()-mCustomScrollBox.width();
						}else if(scrollTo==="first"){ /*scroll to first element position*/
							target=$this.find(".mCSB_container").find(":first");
						}else if(scrollTo==="last"){ /*scroll to last element position*/
							target=$this.find(".mCSB_container").find(":last");
						}else{ /*scroll to element position*/
							target=$this.find(scrollTo);
						}
						if(target.length===1){ /*if such unique element exists, scroll to it*/
							if($this.data("horizontalScroll")){
								scrollTo=target.position().left;
							}else{
								scrollTo=target.position().top;
							}
							draggerScrollTo=scrollTo/$this.data("scrollAmount");
						}else{
							draggerScrollTo=scrollTo=target;
						}
					}
					/*scroll to*/
					if($this.data("horizontalScroll")){
						if($this.data("onTotalScrollBack_Offset")){ /*scroll beginning offset*/
							scrollBeginningOffset=-$this.data("onTotalScrollBack_Offset");
						}
						if($this.data("onTotalScroll_Offset")){ /*total scroll offset*/
							totalScrollOffset=mCustomScrollBox.width()-mCSB_container.outerWidth()+$this.data("onTotalScroll_Offset");
						}
						if(draggerScrollTo<0){ /*scroll start position*/
							draggerScrollTo=scrollTo=0; clearInterval($this.data("mCSB_buttonScrollLeft"));
							if(!scrollBeginningOffset){scrollBeginning=true;}
						}else if(draggerScrollTo>=mCSB_draggerContainer.width()-mCSB_dragger.width()){ /*scroll end position*/
							draggerScrollTo=mCSB_draggerContainer.width()-mCSB_dragger.width();
							scrollTo=mCustomScrollBox.width()-mCSB_container.outerWidth(); clearInterval($this.data("mCSB_buttonScrollRight"));
							if(!totalScrollOffset){totalScroll=true;}
						}else{scrollTo=-scrollTo;}
						var snapAmount = $this.data("snapAmount");
						if (snapAmount) {
							scrollTo = Math.round(scrollTo / snapAmount) * snapAmount - $this.data("snapOffset");
						}
						/*scrolling animation*/
						functions.mTweenAxis.call(this,mCSB_dragger[0],"left",Math.round(draggerScrollTo),draggerSpeed,options.scrollEasing);
						functions.mTweenAxis.call(this,mCSB_container[0],"left",Math.round(scrollTo),contentSpeed,options.scrollEasing,{
							onStart:function(){
								if(options.callbacks && !$this.data("mCS_tweenRunning")){callbacks("onScrollStart");}
								if($this.data("autoHideScrollbar")){functions.showScrollbar.call(mCSB_scrollTools);}
							},
							onUpdate:function(){
								if(options.callbacks){callbacks("whileScrolling");}
							},
							onComplete:function(){
								if(options.callbacks){
									callbacks("onScroll");
									if(scrollBeginning || (scrollBeginningOffset && mCSB_container.position().left>=scrollBeginningOffset)){callbacks("onTotalScrollBack");}
									if(totalScroll || (totalScrollOffset && mCSB_container.position().left<=totalScrollOffset)){callbacks("onTotalScroll");}
								}
								mCSB_dragger.data("preventAction",false); $this.data("mCS_tweenRunning",false);
								if($this.data("autoHideScrollbar")){if(!mCustomScrollBox.hasClass("mCS-mouse-over")){functions.hideScrollbar.call(mCSB_scrollTools);}}
							}
						});
					}else{
						if($this.data("onTotalScrollBack_Offset")){ /*scroll beginning offset*/
							scrollBeginningOffset=-$this.data("onTotalScrollBack_Offset");
						}
						if($this.data("onTotalScroll_Offset")){ /*total scroll offset*/
							totalScrollOffset=mCustomScrollBox.height()-mCSB_container.outerHeight()+$this.data("onTotalScroll_Offset");
						}
						if(draggerScrollTo<0){ /*scroll start position*/
							draggerScrollTo=scrollTo=0; clearInterval($this.data("mCSB_buttonScrollUp"));
							if(!scrollBeginningOffset){scrollBeginning=true;}
						}else if(draggerScrollTo>=mCSB_draggerContainer.height()-mCSB_dragger.height()){ /*scroll end position*/
							draggerScrollTo=mCSB_draggerContainer.height()-mCSB_dragger.height();
							scrollTo=mCustomScrollBox.height()-mCSB_container.outerHeight(); clearInterval($this.data("mCSB_buttonScrollDown"));
							if(!totalScrollOffset){totalScroll=true;}
						}else{scrollTo=-scrollTo;}
						var snapAmount = $this.data("snapAmount");
						if (snapAmount) {
							scrollTo = Math.round(scrollTo / snapAmount) * snapAmount - $this.data("snapOffset");
						}
						/*scrolling animation*/
						functions.mTweenAxis.call(this,mCSB_dragger[0],"top",Math.round(draggerScrollTo),draggerSpeed,options.scrollEasing);
						functions.mTweenAxis.call(this,mCSB_container[0],"top",Math.round(scrollTo),contentSpeed,options.scrollEasing,{
							onStart:function(){
								if(options.callbacks && !$this.data("mCS_tweenRunning")){callbacks("onScrollStart");}
								if($this.data("autoHideScrollbar")){functions.showScrollbar.call(mCSB_scrollTools);}
							},
							onUpdate:function(){
								if(options.callbacks){callbacks("whileScrolling");}
							},
							onComplete:function(){
								if(options.callbacks){
									callbacks("onScroll");
									if(scrollBeginning || (scrollBeginningOffset && mCSB_container.position().top>=scrollBeginningOffset)){callbacks("onTotalScrollBack");}
									if(totalScroll || (totalScrollOffset && mCSB_container.position().top<=totalScrollOffset)){callbacks("onTotalScroll");}
								}
								mCSB_dragger.data("preventAction",false); $this.data("mCS_tweenRunning",false);
								if($this.data("autoHideScrollbar")){if(!mCustomScrollBox.hasClass("mCS-mouse-over")){functions.hideScrollbar.call(mCSB_scrollTools);}}
							}
						});
					}
					if($this.data("mCS_Init")){$this.data({"mCS_Init":false});}
				}
			}
			/*callbacks*/
			function callbacks(cb){
				this.mcs={
					top:mCSB_container.position().top,left:mCSB_container.position().left,
					draggerTop:mCSB_dragger.position().top,draggerLeft:mCSB_dragger.position().left,
					topPct:Math.round((100*Math.abs(mCSB_container.position().top))/Math.abs(mCSB_container.outerHeight()-mCustomScrollBox.height())),
					leftPct:Math.round((100*Math.abs(mCSB_container.position().left))/Math.abs(mCSB_container.outerWidth()-mCustomScrollBox.width()))
				};
				switch(cb){
					/*start scrolling callback*/
					case "onScrollStart":
						$this.data("mCS_tweenRunning",true).data("onScrollStart_Callback").call($this,this.mcs);
						break;
					case "whileScrolling":
						$this.data("whileScrolling_Callback").call($this,this.mcs);
						break;
					case "onScroll":
						$this.data("onScroll_Callback").call($this,this.mcs);
						break;
					case "onTotalScrollBack":
						$this.data("onTotalScrollBack_Callback").call($this,this.mcs);
						break;
					case "onTotalScroll":
						$this.data("onTotalScroll_Callback").call($this,this.mcs);
						break;
				}
			}
		},
		stop:function(){
			var $this=$(this),
				mCSB_container=$this.children().children(".mCSB_container"),
				mCSB_dragger=$this.children().children().children().children(".mCSB_dragger");
			functions.mTweenAxisStop.call(this,mCSB_container[0]);
			functions.mTweenAxisStop.call(this,mCSB_dragger[0]);
		},
		disable:function(resetScroll){
			var $this=$(this),
				mCustomScrollBox=$this.children(".mCustomScrollBox"),
				mCSB_container=mCustomScrollBox.children(".mCSB_container"),
				mCSB_scrollTools=mCustomScrollBox.children(".mCSB_scrollTools"),
				mCSB_dragger=mCSB_scrollTools.children().children(".mCSB_dragger");
			mCustomScrollBox.unbind("mousewheel focusin mouseenter mouseleave touchend");
			mCSB_container.unbind("touchstart touchmove")
			if(resetScroll){
				if($this.data("horizontalScroll")){
					mCSB_dragger.add(mCSB_container).css("left",0);
				}else{
					mCSB_dragger.add(mCSB_container).css("top",0);
				}
			}
			mCSB_scrollTools.css("display","none");
			mCSB_container.addClass("mCS_no_scrollbar");
			$this.data({"bindEvent_mousewheel":false,"bindEvent_focusin":false,"bindEvent_content_touch":false,"bindEvent_autoHideScrollbar":false}).addClass("mCS_disabled");
		},
		destroy:function(){
			var $this=$(this);
			$this.removeClass("mCustomScrollbar _mCS_"+$this.data("mCustomScrollbarIndex")).addClass("mCS_destroyed").children().children(".mCSB_container").unwrap().children().unwrap().siblings(".mCSB_scrollTools").remove();
			$(document).unbind("mousemove."+$this.data("mCustomScrollbarIndex")+" mouseup."+$this.data("mCustomScrollbarIndex")+" MSPointerMove."+$this.data("mCustomScrollbarIndex")+" MSPointerUp."+$this.data("mCustomScrollbarIndex"));
			$(window).unbind("resize."+$this.data("mCustomScrollbarIndex"));
		}
	},
	functions={
		/*hide/show scrollbar*/
		showScrollbar:function(){
			this.stop().animate({opacity:1},"fast");
		},
		hideScrollbar:function(){
			this.stop().animate({opacity:0},"fast");
		},
		/*js animation tween*/
		mTweenAxis:function(el,prop,to,duration,easing,callbacks){
			var callbacks=callbacks || {},
				onStart=callbacks.onStart || function(){},onUpdate=callbacks.onUpdate || function(){},onComplete=callbacks.onComplete || function(){};
			var startTime=_getTime(),_delay,progress=0,from=el.offsetTop,elStyle=el.style;
			if(prop==="left"){from=el.offsetLeft;}
			var diff=to-from;
			_cancelTween();
			_startTween();
			function _getTime(){
				if(window.performance && window.performance.now){
					return window.performance.now();
				}else{
					if(window.performance && window.performance.webkitNow){
						return window.performance.webkitNow();
					}else{
						if(Date.now){return Date.now();}else{return new Date().getTime();}
					}
				}
			}
			function _step(){
				if(!progress){onStart.call();}
				progress=_getTime()-startTime;
				_tween();
				if(progress>=el._time){
					el._time=(progress>el._time) ? progress+_delay-(progress- el._time) : progress+_delay-1;
					if(el._time<progress+1){el._time=progress+1;}
				}
				if(el._time<duration){el._id=_request(_step);}else{onComplete.call();}
			}
			function _tween(){
				if(duration>0){
					el.currVal=_ease(el._time,from,diff,duration,easing);
					elStyle[prop]=Math.round(el.currVal)+"px";
				}else{
					elStyle[prop]=to+"px";
				}
				onUpdate.call();
			}
			function _startTween(){
				_delay=1000/60;
				el._time=progress+_delay;
				_request=(!window.requestAnimationFrame) ? function(f){_tween(); return setTimeout(f,0.01);} : window.requestAnimationFrame;
				el._id=_request(_step);
			}
			function _cancelTween(){
				if(el._id==null){return;}
				if(!window.requestAnimationFrame){clearTimeout(el._id);
				}else{window.cancelAnimationFrame(el._id);}
				el._id=null;
			}
			function _ease(t,b,c,d,type){
				switch(type){
					case "linear":
						return c*t/d + b;
						break;
					case "easeOutQuad":
						t /= d; return -c * t*(t-2) + b;
						break;
					case "easeInOutQuad":
						t /= d/2;
						if (t < 1) return c/2*t*t + b;
						t--;
						return -c/2 * (t*(t-2) - 1) + b;
						break;
					case "easeOutCubic":
						t /= d; t--; return c*(t*t*t + 1) + b;
						break;
					case "easeOutQuart":
						t /= d; t--; return -c * (t*t*t*t - 1) + b;
						break;
					case "easeOutQuint":
						t /= d; t--; return c*(t*t*t*t*t + 1) + b;
						break;
					case "easeOutCirc":
						t /= d; t--; return c * Math.sqrt(1 - t*t) + b;
						break;
					case "easeOutSine":
						return c * Math.sin(t/d * (Math.PI/2)) + b;
						break;
					case "easeOutExpo":
						return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
						break;
					case "mcsEaseOut":
						var ts=(t/=d)*t,tc=ts*t;
						return b+c*(0.499999999999997*tc*ts + -2.5*ts*ts + 5.5*tc + -6.5*ts + 4*t);
						break;
					case "draggerRailEase":
						t /= d/2;
						if (t < 1) return c/2*t*t*t + b;
						t -= 2;
						return c/2*(t*t*t + 2) + b;
						break;
				}
			}
		},
		/*stop js animation tweens*/
		mTweenAxisStop:function(el){
			if(el._id==null){return;}
			if(!window.requestAnimationFrame){clearTimeout(el._id);
			}else{window.cancelAnimationFrame(el._id);}
			el._id=null;
		},
		/*detect requestAnimationFrame and polyfill*/
		rafPolyfill:function(){
			var pfx=["ms","moz","webkit","o"],i=pfx.length;
			while(--i > -1 && !window.requestAnimationFrame){
				window.requestAnimationFrame=window[pfx[i]+"RequestAnimationFrame"];
				window.cancelAnimationFrame=window[pfx[i]+"CancelAnimationFrame"] || window[pfx[i]+"CancelRequestAnimationFrame"];
			}
		}
	}
	/*detect features*/
	functions.rafPolyfill.call(); /*requestAnimationFrame*/
	$.support.touch=!!('ontouchstart' in window); /*touch*/
	$.support.msPointer=window.navigator.msPointerEnabled; /*MSPointer support*/
	/*plugin dependencies*/
	var _dlp=("https:"==document.location.protocol) ? "https:" : "http:";
	$.event.special.mousewheel || document.write('<script src="'+_dlp+'//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.0.6/jquery.mousewheel.min.js"><\/script>');
	/*plugin fn*/
	$.fn.mCustomScrollbar=function(method){
		if(methods[method]){
			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		}else if(typeof method==="object" || !method){
			return methods.init.apply(this,arguments);
		}else{
			$.error("Method "+method+" does not exist");
		}
	};
})(jQuery);
});
define("mouseWheel",function(require,exports,module){

    (function($) {

        var types = ['DOMMouseScroll', 'mousewheel'];

        if ($.event.fixHooks) {
            for ( var i=types.length; i; ) {
                $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
            }
        }

        $.event.special.mousewheel = {
            setup: function() {
                if ( this.addEventListener ) {
                    for ( var i=types.length; i; ) {
                        this.addEventListener( types[--i], handler, false );
                    }
                } else {
                    this.onmousewheel = handler;
                }
            },

            teardown: function() {
                if ( this.removeEventListener ) {
                    for ( var i=types.length; i; ) {
                        this.removeEventListener( types[--i], handler, false );
                    }
                } else {
                    this.onmousewheel = null;
                }
            }
        };

        $.fn.extend({
            mousewheel: function(fn) {
                return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
            },

            unmousewheel: function(fn) {
                return this.unbind("mousewheel", fn);
            }
        });


        function handler(event) {
            var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
            event = $.event.fix(orgEvent);
            event.type = "mousewheel";

            if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
            if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
            
            deltaY = delta;
            
            if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
                deltaY = 0;
                deltaX = -1*delta;
            }
            
            if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
            if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
            
            args.unshift(event, delta, deltaX, deltaY);
            
            return ($.event.dispatch || $.event.handle).apply(this, args);
        }

    })(jQuery);
});
define("unslider",function(require,exports,module){
        /**
     *   Unslider
     *   version 2.0
     *   by @idiot and friends
     *   https://github.com/idiot/unslider
     */

    (function($) {
        "use strict";
        var jQuery = $;

        //  Don"t throw any errors when jQuery
        if (!$) {
            return console.warn("Unslider needs jQuery");
        }


        $.Unslider = function(context, options) {
            var self = this;

            //  Create an Unslider reference we can use everywhere
            self._ = "unslider";

            //  Store our default options in here
            //  Everything will be overwritten by the jQuery plugin though
            self.defaults = {
                //  Should the slider move on its own or only when
                //  you interact with the nav/arrows?
                //  Only accepts boolean true/false.
                autoplay: false,

                //  3 second delay between slides moving, pass
                //  as a number in milliseconds.
                delay: 3000,

                //  Animation speed in millseconds
                speed: 750,

                //  An easing string to use. If you"re using Velocity, use a
                //  Velocity string otherwise you can use jQuery/jQ UI options.
                easing: "swing", // [.42, 0, .58, 1],

                //  Does it support keyboard arrows?
                //  Can pass either true or false -
                //  or an object with the keycodes, like so:
                //  {
                //   prev: 37,
                //   next: 39
                // }
                //  You can call any internal method name
                //  before the keycode and it"ll be called.
                keys: {
                    prev: 37,
                    next: 39
                },

                //  Do you want to generate clickable navigation
                //  to skip to each slide? Accepts boolean true/false or
                //  a callback function per item to generate.
                nav: true,

                //  Should there be left/right arrows to go back/forth?
                //   -> This isn"t keyboard support.
                //  Either set true/false, or an object with the HTML
                //  elements for each arrow like below:
                arrows: {
                    prev: "<a class=\"" + self._ + "-arrow prev\"><</a>",
                    next: "<a class=\"" + self._ + "-arrow next\">></a>"
                },

                //  How should Unslider animate?
                //  It can do one of the following types:
                //  \"fade\": each slide fades in to each other
                //  \"horizontal\": each slide moves from left to right
                //  \"vertical\": each slide moves from top to bottom
                animation: "horizontal",

                //  If you don"t want to use a list to display your slides,
                //  you can change it here. Not recommended and you"ll need
                //  to adjust the CSS accordingly.
                selectors: {
                    container: "ul:first",
                    slides: "li"
                },

                //  Do you want to animate the heights of each slide as
                //  it moves
                animateHeight: false,

                //  Active class for the nav
                activeClass: self._ + "-active",

                //  Have swipe support?
                //  You can set this here with a boolean and always use
                //  initSwipe/destroySwipe later on.
                swipe: true,
                // Swipe threshold -
                // lower float for enabling short swipe
                swipeThreshold: 0.2
            };

            //  Set defaults
            self.$context = context;
            self.options = {};

            //  Leave our elements blank for now
            //  Since they get changed by the options, we"ll need to
            //  set them in the init method.
            self.$parent = null;
            self.$container = null;
            self.$slides = null;
            self.$nav = null;
            self.$arrows = [];

            //  Set our indexes and totals
            self.total = 0;
            self.current = 0;

            //  Generate a specific random ID so we don"t dupe events
            self.prefix = self._ + "-";
            self.eventSuffix = "." + self.prefix + ~~(Math.random() * 2e3);

            //  In case we"re going to use the autoplay
            self.interval = null;

            //  Get everything set up innit
            self.init = function(options) {
                //  Set up our options inside here so we can re-init at
                //  any time
                self.options = $.extend({}, self.defaults, options);

                //  Our elements
                self.$container = self.$context.find(self.options.selectors.container).addClass(self.prefix + "wrap");
                self.$slides = self.$container.children(self.options.selectors.slides);

                //  We"ll manually init the container
                self.setup();

                //  We want to keep this script as small as possible
                //  so we"ll optimise some checks
                $.each(["nav", "arrows", "keys", "infinite"], function(index, module) {
                    self.options[module] && self["init" + $._ucfirst(module)]();
                });

                //  Add swipe support
                if (jQuery.event.special.swipe && self.options.swipe) {
                    self.initSwipe();
                }

                //  If autoplay is set to true, call self.start()
                //  to start calling our timeouts
                self.options.autoplay && self.start();

                //  We should be able to recalculate slides at will
                self.calculateSlides();

                //  Listen to a ready event
                self.$context.trigger(self._ + ".ready");

                //  Everyday I"m chainin"
                return self.animate(self.options.index || self.current, "init");
            };

            self.setup = function() {
                //  Add a CSS hook to the main element
                self.$context.addClass(self.prefix + self.options.animation).wrap("<div class=\"" + self._ + "\" />");
                self.$parent = self.$context.parent("." + self._);

                //  We need to manually check if the container is absolutely
                //  or relatively positioned
                var position = self.$context.css("position");

                //  If we don"t already have a position set, we"ll
                //  automatically set it ourselves
                if (position === "static") {
                    self.$context.css("position", "relative");
                }

                self.$context.css("overflow", "hidden");
            };

            //  Set up the slide widths to animate with
            //  so the box doesn"t float over
            self.calculateSlides = function() {
                self.total = self.$slides.length;

                //  Set the total width
                if (self.options.animation !== "fade") {
                    var prop = "width";

                    if (self.options.animation === "vertical") {
                        prop = "height";
                    }

                    self.$container.css(prop, (self.total * 100) + "%").addClass(self.prefix + "carousel");
                    self.$slides.css(prop, (100 / self.total) + "%");
                }
            };


            //  Start our autoplay
            self.start = function() {
                self.interval = setTimeout(function() {
                    //  Move on to the next slide
                    self.next();

                    //  If we"ve got autoplay set up
                    //  we don"t need to keep starting
                    //  the slider from within our timeout
                    //  as .animate() calls it for us
                }, self.options.delay);

                return self;
            };

            //  And pause our timeouts
            //  and force stop the slider if needed
            self.stop = function() {
                clearTimeout(self.interval);

                return self;
            };


            //  Set up our navigation
            self.initNav = function() {
                var $nav = $("<nav class=\"" + self.prefix + "nav\"><ol /></nav>");

                //  Build our click navigation item-by-item
                self.$slides.each(function(key) {
                    //  If we"ve already set a label, let"s use that
                    //  instead of generating one
                    var label = this.getAttribute("data-nav") || key + 1;

                    //  Listen to any callback functions
                    if ($.isFunction(self.options.nav)) {
                        label = self.options.nav.call(self.$slides.eq(key), key, label);
                    }

                    //  And add it to our navigation item
                    $nav.children("ol").append("<li data-slide=\"" + key + "\"></li>");
                });

                //  Keep a copy of the nav everywhere so we can use it
                self.$nav = $nav.insertAfter(self.$context);

                //  Now our nav is built, let"s add it to the slider and bind
                //  for any click events on the generated links
                self.$nav.find("li").on("click" + self.eventSuffix, function() {
                    //  Cache our link and set it to be active
                    var $me = $(this).addClass(self.options.activeClass);

                    //  Set the right active class, remove any other ones
                    $me.siblings().removeClass(self.options.activeClass);

                    //  Move the slide
                    self.animate($me.attr("data-slide"));
                });
            };


            //  Set up our left-right arrow navigation
            //  (Not keyboard arrows, prev/next buttons)
            self.initArrows = function() {
                if (self.options.arrows === true) {
                    self.options.arrows = self.defaults.arrows;
                }

                //  Loop our options object and bind our events
                $.each(self.options.arrows, function(key, val) {
                    //  Add our arrow HTML and bind it
                    self.$arrows.push(
                        $(val).insertAfter(self.$context).on("click" + self.eventSuffix, self[key])
                    );
                });
            };


            //  Set up our keyboad navigation
            //  Allow binding to multiple keycodes
            self.initKeys = function() {
                if (self.options.keys === true) {
                    self.options.keys = self.defaults.keys;
                }

                $(document).on("keyup" + self.eventSuffix, function(e) {
                    $.each(self.options.keys, function(key, val) {
                        if (e.which === val) {
                            $.isFunction(self[key]) && self[key].call(self);
                        }
                    });
                });
            };

            //  Requires jQuery.event.swipe
            //  -> stephband.info/jquery.event.swipe
            self.initSwipe = function() {
                var width = self.$slides.width();

                //  We don"t want to have a tactile swipe in the slider
                //  in the fade animation, as it can cause some problems
                //  with layout, so we"ll just disable it.
                if (self.options.animation !== "fade") {

                    self.$container.on({

                        movestart: function(e) {
                            //  If the movestart heads off in a upwards or downwards
                            //  direction, prevent it so that the browser scrolls normally.
                            if ((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) {
                                return !!e.preventDefault();
                            }

                            self.$container.css("position", "relative");
                        },

                        move: function(e) {
                            self.$container.css("left", -(100 * self.current) + (100 * e.distX / width) + "%");
                        },

                        moveend: function(e) {
                            // Check if swiped distance is greater than threshold.
                            // If yes slide to next/prev slide. If not animate to
                            // starting point.

                            if ((Math.abs(e.distX) / width) > self.options.swipeThreshold) {

                                self[e.distX < 0 ? "next" : "prev"]();
                            } else {

                                self.$container.animate({
                                    left: -(100 * self.current) + "%"
                                }, self.options.speed / 2);
                            }
                        }
                    });
                }
            };

            //  Infinite scrolling is a massive pain in the arse
            //  so we need to create a whole bloody function to set
            //  it up. Argh.
            self.initInfinite = function() {
                var pos = ["first", "last"];

                $.each(pos, function(index, item) {
                    var tmp = self.$slides.filter(":not(\"." + self._ + "-clone\")")[item]()

                    //  Make a copy of it and identify it as a clone
                    .clone().addClass(self._ + "-clone")

                    //  Either insert before or after depending on whether we"re
                    //  the first or last clone
                    ["insert" + (index === 0 ? "After" : "Before")](
                        //  Return the other element in the position array
                        //  if item = first, return \"last\"
                        self.$slides[pos[~~!index]]()
                    );

                    tmp.each(function() {
                        self.$slides.push($(this));
                    });

                });
            };

            //  Remove any trace of arrows
            //  Loop our array of arrows and use jQuery to remove
            //  It"ll unbind any event handlers for us
            self.destroyArrows = function() {
                $.each(self.$arrows, function(i, $arrow) {
                    $arrow.remove();
                });
            };

            //  Remove any swipe events and reset the position
            self.destroySwipe = function() {
                //  We bind to 4 events, so we"ll unbind those
                self.$container.off("movestart move moveend");
            };

            //  Unset the keyboard navigation
            //  Remove the handler
            self.destroyKeys = function() {
                //  Remove the event handler
                $(document).off("keyup" + self.eventSuffix);
            };

            self.setIndex = function(to) {
                if (to < 0) {
                    to = self.total - 1;
                }

                self.current = Math.min(Math.max(0, to), self.total - 1);

                if (self.options.nav) {
                    self.$nav.find("[data-slide=\"" + self.current + "\"]")._active(self.options.activeClass);
                }

                self.$slides.eq(self.current)._active(self.options.activeClass);

                return self;
            };

            //  Despite the name, this doesn"t do any animation - since there"s
            //  now three different types of animation, we let this method delegate
            //  to the right type, keeping the name for backwards compat.
            self.animate = function(to, dir) {
                //  Animation shortcuts
                //  Instead of passing a number index, we can now
                //  use .data("unslider").animate("last");
                //  or .unslider("animate:last")
                //  to go to the very last slide
                if (to === "first") {
                    to = 0;
                }
                if (to === "last") {
                    to = self.total;
                }

                //  Don"t animate if it"s not a valid index
                if (isNaN(to)) {
                    return self;
                }

                if (self.options.autoplay) {
                    self.stop().start();
                }

                self.setIndex(to);

                //  Add a callback method to do stuff with
                self.$context.trigger(self._ + ".change", [to, self.$slides.eq(to)]);

                //  Delegate the right method - everything"s named consistently
                //  so we can assume it"ll be called \"animate\" +
                var fn = "animate" + $._ucfirst(self.options.animation);

                //  Make sure it"s a valid animation method, otherwise we"ll get
                //  a load of bug reports that"ll be really hard to report
                if ($.isFunction(self[fn])) {
                    self[fn](self.current, dir);
                }

                return self;
            };


            //  Shortcuts for animating if we don"t know what the current
            //  index is (i.e back/forward)
            //  For moving forward we need to make sure we don"t overshoot.
            self.next = function() {
                var target = self.current + 1;

                //  If we"re at the end, we need to move back to the start
                if (target >= self.total) {
                    target = 0;
                }

                return self.animate(target, "next");
            };

            //  Previous is a bit simpler, we can just decrease the index
            //  by one and check if it"s over 0.
            self.prev = function() {
                return self.animate(self.current - 1, "prev");
            };


            //  Our default animation method, the old-school left-to-right
            //  horizontal animation
            self.animateHorizontal = function(to) {
                var prop = "left";

                //  Add RTL support, slide the slider
                //  the other way if the site is right-to-left
                if (self.$context.attr("dir") === "rtl") {
                    prop = "right";
                }

                if (self.options.infinite) {
                    //  So then we need to hide the first slide
                    self.$container.css("margin-" + prop, "-100%");
                }

                return self.slide(prop, to);
            };

            //  The same animation methods, but vertical support
            //  RTL doesn"t affect the vertical direction so we
            //  can just call as is
            self.animateVertical = function(to) {
                self.options.animateHeight = true;

                //  Normal infinite CSS fix doesn"t work for
                //  vertical animation so we need to manually set it
                //  with pixels. Ah well.
                if (self.options.infinite) {
                    self.$container.css("margin-top", -self.$slides.outerHeight());
                }

                return self.slide("top", to);
            };

            //  Actually move the slide now
            //  We have to pass a property to animate as there"s
            //  a few different directions it can now move, but it"s
            //  otherwise unchanged from before.
            self.slide = function(prop, to) {
                //  If we want to change the height of the slider
                //  to match the current slide, you can set
                //  {animateHeight: true}
                self.animateHeight(to);

                //  For infinite sliding we add a dummy slide at the end and start
                //  of each slider to give the appearance of being infinite
                if (self.options.infinite) {
                    var dummy;

                    //  Going backwards to last slide
                    if (to === self.total - 1) {
                        //  We"re setting a dummy position and an actual one
                        //  the dummy is what the index looks like
                        //  (and what we"ll silently update to afterwards),
                        //  and the actual is what makes it not go backwards
                        dummy = self.total - 3;
                        to = -1;
                    }

                    //  Going forwards to first slide
                    if (to === self.total - 2) {
                        dummy = 0;
                        to = self.total - 2;
                    }

                    //  If it"s a number we can safely set it
                    if (typeof dummy === "number") {
                        self.setIndex(dummy);

                        //  Listen for when the slide"s finished transitioning so
                        //  we can silently move it into the right place and clear
                        //  this whole mess up.
                        self.$context.on(self._ + ".moved", function() {
                            if (self.current === dummy) {
                                self.$container.css(prop, -(100 * dummy) + "%").off(self._ + ".moved");
                            }
                        });
                    }
                }

                //  We need to create an object to store our property in
                //  since we don"t know what it"ll be.
                var obj = {};

                //  Manually create it here
                obj[prop] = -(100 * to) + "%";

                //  And animate using our newly-created object
                return self._move(self.$container, obj);
            };


            //  Fade between slides rather than, uh, sliding it
            self.animateFade = function(to) {
                //  If we want to change the height of the slider
                //  to match the current slide, you can set
                //  {animateHeight: true}
                self.animateHeight(to);

                var $active = self.$slides.eq(to).addClass(self.options.activeClass);

                //  Toggle our classes
                self._move($active.siblings().removeClass(self.options.activeClass), {
                    opacity: 0
                });
                self._move($active, {
                    opacity: 1
                }, false);
            };

            // Animate height of slider
            self.animateHeight = function(to) {
                //  If we want to change the height of the slider
                //  to match the current slide, you can set
                //  {animateHeight: true}
                if (self.options.animateHeight) {
                    self._move(self.$context, {
                        height: self.$slides.eq(to).outerHeight()
                    }, false);
                }
            };

            self._move = function($el, obj, callback, speed) {
                if (callback !== false) {
                    callback = function() {
                        self.$context.trigger(self._ + ".moved");
                    };
                }

                return $el._move(obj, speed || self.options.speed, self.options.easing, callback);
            };

            //  Allow daisy-chaining of methods
            return self.init(options);
        };

        //  Internal (but global) jQuery methods
        //  They"re both just helpful types of shorthand for
        //  anything that might take too long to write out or
        //  something that might be used more than once.
        $.fn._active = function(className) {
            return this.addClass(className).siblings().removeClass(className);
        };

        //  The equivalent to PHP"s ucfirst(). Take the first
        //  character of a string and make it uppercase.
        //  Simples.
        $._ucfirst = function(str) {
            //  Take our variable, run a regex on the first letter
            return (str + "").toLowerCase().replace(/^./, function(match) {
                //  And uppercase it. Simples.
                return match.toUpperCase();
            });
        };

        $.fn._move = function() {
            this.stop(true, true);
            return $.fn[$.fn.velocity ? "velocity" : "animate"].apply(this, arguments);
        };

        //  And set up our jQuery plugin
        $.fn.unslider = function(opts) {
            return this.each(function() {
                var $this = $(this);

                //  Allow usage of .unslider("function_name")
                //  as well as using .data("unslider") to access the
                //  main Unslider object
                if (typeof opts === "string" && $this.data("unslider")) {
                    opts = opts.split(":");

                    var call = $this.data("unslider")[opts[0]];

                    //  Do we have arguments to pass to the string-function?
                    if ($.isFunction(call)) {
                        return call.apply($this, opts[1] ? opts[1].split(",") : []);
                    }
                }

                return $this.data("unslider", new $.Unslider($this, opts));
            });
        };
    })(window.jQuery || require("jquery"));
});
