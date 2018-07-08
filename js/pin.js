'use strict';

(function () { 
	////////////////////////
	// Pin Module
	
	
	function drawButtons () {
		var buttons = window.data.buttons;
		
		var fragment = document.createDocumentFragment();
		for (var i = 0; i < buttons.length; i++) {
			fragment.appendChild(buttons[i]);
		}
//		return fragment;
		window.map.mapPins.appendChild(fragment);
	}


	
	
	window.map.pin = {
		drawButtons: drawButtons
	};
	// End of Pin Module
	////////////////////////
})();