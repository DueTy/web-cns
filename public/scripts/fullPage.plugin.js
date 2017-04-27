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
        };
	})(window.jQuery || require("jquery"));
});