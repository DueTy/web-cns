define("widgetMenu",function(require,exports,module){
	"use strict";
	(function($){
        var jQuery = $;

        if (!$) {
            return console.warn("widgetMenu needs jQuery");
        }

        $.fn.widgetMenu = function(opts){
            var defaults = {
				is_left: true,//默认为click true左键click，
				//false右键contextmenu
				trigger: "",
				parent: "body",
				show_class: "",
				flo_mouse: false//默认为不跟随鼠标事件
			};
			var settings = $.extend(defaults,opts);
			var _this = $(this),
				_ck_type = settings.is_left?"click":"contextmenu",
				_flo_mouse = settings.flo_mouse,
				_trigger = $(settings.trigger),
				_show_class = settings.show_class,
				_mask = $(".page-mask"),
				_mask_show_class = "mask-show",
				_this_height = $(this).height();


			_trigger.on(_ck_type, addClass2Menu);	

			_this.on("click", maskClick);
			
			_mask.on("click contextmenu", maskClick);
			



			function addClass2Menu(e){
				e.preventDefault();
				var style_obj = _flo_mouse?setCoordinate(e):{};
				_this.addClass(_show_class).css(style_obj);
				_mask.addClass(_mask_show_class);
				return false;
			}

			function maskClick(e){
				e.preventDefault();
				_this.removeClass(_show_class);
				_mask.removeClass(_mask_show_class)
				return false;
			}
			function setCoordinate(e){
				var event_x = _trigger.offset().left,
					event_y = _trigger.offset().top;
				var event_bottom = $(window).height()-e.pageY;

				var x = e.pageX,
					y = e.pageY;
				if(_this_height>event_bottom){
					y = y - _this_height;
				}
				return {
					top: y,
					left: x
				}
			}


			
        };
	})(window.jQuery || require("jquery"));
});