'use strict';

;(function () { 
	////////////////////////
	// Pin Module
	
	
	function drawButtons (buttons) {
		var fragment = document.createDocumentFragment();
		for (var i = 0; i < buttons.length; i++) {
			fragment.appendChild(buttons[i]);
		}
//		return fragment;
//		window.map.mapPins.innerHTML = "";
		deleteButtons();
		window.map.mapPins.appendChild(fragment);
	}
	
	function deleteButtons () {
		var buttons = window.map.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
		
		buttons.forEach(function(item){
			item.parentNode.removeChild(item);
		});
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