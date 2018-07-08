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
	
	function deselectPin () {
		window.map.activePin.classList.remove('map__pin_active');
		window.map.activePin = null;
	}
	
	function selectPin (target) {
		window.map.activePin = target;
		window.map.activePin.classList.add('map__pin_active');
	}


	
	
	window.map.pin = {
		drawButtons: drawButtons,
		selectPin: selectPin,
		deselectPin: deselectPin
	};
	// End of Pin Module
	////////////////////////
})();