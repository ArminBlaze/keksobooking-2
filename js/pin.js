'use strict';

(function () { 
	////////////////////////
	// Pin Module
	var map = window.map.mapElem;
	var mapPins = document.querySelector('.map__pins');
	var mainPin = mapPins.querySelector('.map__pin--main');
	
	mainPin.addEventListener('mouseup', onMainPinMouseUp);
	mapPins.addEventListener('click', onMapPinsClick);

	var activePin = null;


	function onMainPinMouseUp (e) {
		if(window.map.mapShowed) return;
		
		window.map.showMap();
		mapPins.appendChild(drawButtons(window.data.buttons)); 
		//убирать слушателья mouseup?
	}
	
	function drawButtons (buttons) {
		var fragment = document.createDocumentFragment();
		for (var i = 0; i < buttons.length; i++) {
			fragment.appendChild(buttons[i]);
		}
		return fragment;
	}


	function onMapPinsClick (e) {
		var target = e.target;

		while (target != this) {
			if ( target.classList.contains("map__pin") ) break;
			target = target.parentNode;
		}
		if (target == this) return;

//		onAdvertClose();
		onAdvertOpen(target);
	}
	// End of Pin Module
	////////////////////////
})();