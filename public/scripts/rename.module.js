define("renameWidget",function(require,exports,module){
	"use strict";
    require("backLayer");

	(function($){

		if (!$) {
            return console.warn("rename needs jQuery");
        }
        $.fn.renameWidget = function(){
        	var _this = $(this),
        		_mask = $(".page-mask"),
        		_blk_show_cls = "rename-show",
        		_ipt_show_cls = "ipt-show";

    		return this.each(function(){
    			_this.addClass(_ipt_show_cls).trigger("select");
    			_mask.addClass(_blk_show_cls);

                _this.one("keydown", renameComplete);

                _mask.one("click contextmenu", renameComplete);    			
    		});
            $(window).on("keydown" , function() {
                console.log("window keydown");
            });

    		function renameComplete(e){
    			var e_type = e.type,
    				_val = _this.val();
    			if(e_type==="keydown"){
    				var keyCode = e.keyCode;
    				if (keyCode === 13) {
    					renameAjax(_val);    					
    				}
    			}else{
    				renameAjax(_val);
    			}    			
    		}
    		function renameAjax(val){

    			var this_par = _this.parents(".item-cont"),
    				pre_name = this_par.children(".btn-text"),
                    entity_type = this_par.parent().hasClass("folder-item")?"folder":"note";

    			if(val === ""){
					_this.val(pre_name.text());
    			}else{
    				var post_data = {
    					val: val,
    					entity_id: this_par.attr("data-entity-id"),
                        entity_type: entity_type
    				};

    				$.ajax({
    					url: "/rename",
    					type: "POST",
    					dataType: "JSON",
    					data: post_data,
    					success:function(data){
                            if(data.is_tooLong){
                                var warn_msg = $(".warn-msg");
                                warn_msg.find(".msg-text").text(data.msg);
                                warn_msg.backLayer({
                                    closeCall: warnCloseCall
                                });
                            }else{
                                if(data && data.is_affected){
                                    this_par.find(".btn-text").eq(0).text(data.new_name);
                                    _this.val(data.new_name);
                                }
                                
                            }
    						
    					}
    				});
    			}
    			_this.removeClass(_ipt_show_cls);
    			_mask.removeClass(_blk_show_cls);
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
                },1000);
            }   	
        };

	})(window.jQuery || require("jquery"));
});