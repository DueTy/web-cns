define("fullPage",function(require,exports,module){
	"use strict";
	(function($){
        var jQuery = $;

        if (!$) {
            return console.warn("fullHeight needs jQuery");
        }

        $.fn.fullHeight = function(){
        	var _this = $(this);
        	setHeight();
        	$(window).on("resize",setHeight);
        	function setHeight(){        		
        		var _top = _this.offset().top,
        			w_h = $(window).height();
        		_this.css("height",w_h-_top); 
        	}
        }
	})(window.jQuery || require("jquery"));
});