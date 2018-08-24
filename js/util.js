'use strict';

;(function () { 
	function generateEvent (elem, msg) {
//		var event = new CustomEvent('card-closed', {bubbles: true});	//Edge > 11 IE
		var event = document.createEvent("Event"); //IE 9+
//		event.initEvent("image-added", true, true); //IE 9+
		event.initEvent(msg, true, true); //IE 9+
//    event.detail = ["peka", "lol"];
		elem.dispatchEvent(event);
	}
	
	window.util = {
		generateEvent: generateEvent
	};
})();