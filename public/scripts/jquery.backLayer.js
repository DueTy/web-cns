define("backLayer",function(require,exports,module){
	"use strict";
	(function($){

		if (!$) {
            return console.warn("backLayer needs jQuery");
        }
        $.fn.backLayer = function(opts) {

        	var defaults = {
        		closeCall:function(){},
        		bg_color: "#000"
        	};

        	var settings = $.extend(defaults, opts);

			var isIE = (document.all) ? true : false;
    		var isIE6 = isIE && !window.XMLHttpRequest;
    		var position = !isIE6 ? "fixed" : "absolute";
    		var containerBox = $(this);
    		var bg_color = settings.bg_color,
                closeCall = settings.closeCall;

        	return this.each(function(){
        		containerBox.css({
        			"z-index": "9999",
        			"display": "block",
        			"position": position,
        			"top": "50%",
        			"left": "50%",
        			"margin-top": -(containerBox.height() / 2) + "px",
        			"margin-left": -(containerBox.width() / 2) + "px"
        		});
        		var layer = $("<div class=\"back-layer\"></div>");
        		layer.css({
        			"width": "100%",
        			"height": "100%",
        			"position": position,
        			"top": "0px",
        			"left": "0px",
        			"background-color": bg_color,
        			"z-index": "9998",
        			"opacity": "0.5"
        		});
        		$("body").append(layer);

        		if (isIE) {
        			layer.css("filter", "alpha(opacity=60)");
        		}
        		if (isIE6) {
        			layer_iestyle();
        			containerBox_iestyle();
        		}
        		$("window").resize(function() {
        			layer_iestyle();
        		});

                // layer.one("click", function() {                    
                //     containerBox.hide();
                //     layer.remove();
                // });
                closeCall(containerBox,layer);

        	});
        

        	function layer_iestyle() {
        		var maxWidth = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) + "px";
        		var maxHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) + "px";
        		layer.css({
        			"width": maxWidth,
        			"height": maxHeight
        		});
        	}

        	function containerBox_iestyle() {
        		var marginTop = $(document).scrollTop - containerBox.height() / 2 + "px";
        		var marginLeft = $(document).scrollLeft - containerBox.width() / 2 + "px";
        		containerBox.css({
        			"margin-top": marginTop,
        			"margin-left": marginLeft
        		});
        	}
    };

	})(window.jQuery || require("jquery"));
});