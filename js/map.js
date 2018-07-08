////////////////////////////////
// Map Module
'use strict';

(function () { 
	var map = document.querySelector('.map');
	var mapPins = map.querySelector('.map__pins');
	var mainPin = mapPins.querySelector('.map__pin--main');
	
	window.map = {
		mapShowed: false,
		advertCard: null,
		activePin: null,
		mapElem: map,
		showMap: showMap,
		mapPins: mapPins,
		mainPin: mainPin
	};
	
	
	
	
	mainPin.addEventListener('mouseup', onMainPinMouseUp);
	mapPins.addEventListener('click', onMapPinsClick);


	function onMainPinMouseUp (e) {
		if(window.mapShowed) return;
		
		showMap();
		window.map.pin.drawButtons();
		
		//убирать слушателья mouseup?
	}

	function onMapPinsClick (e) {
		var target = e.target;

		while (target != this) {
			if ( target.classList.contains("map__pin") ) break;
			target = target.parentNode;
		}
		if (target == this) return;

		if(window.map.activePin) {
			window.map.pin.deselectPin();
		}

		window.map.pin.selectPin(target);
		
		window.map.card.showCard(target);
	}
	

	function showMap () {
		map.classList.remove('map--faded'); //
		window.form.noticeForm.classList.remove('notice__form--disabled'); //
		window.form.fieldsets.forEach(function(item){
			item.removeAttribute('disabled');
		});
		//
		window.mapShowed = true;
	}

})();