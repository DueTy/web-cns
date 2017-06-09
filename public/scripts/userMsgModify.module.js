define("userMsgModify",function(require,exports,module){
	"use strict";

	require("backLayer");

	var msg_control_btn = $(".user-control .user-msg-cont"),
		msg_modify_cont = $(".user-msg-modify");

	msg_control_btn.on("click", contPop);

	function contPop(){
		msg_modify_cont.backLayer({
			closeCall: warnClkClose
		});
	}

	function warnClkClose(containerBox, layer){
		layer.one("click",function(){
			containerBox.hide();
			layer.remove();
		});
	}

})