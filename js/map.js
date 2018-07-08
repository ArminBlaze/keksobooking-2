////////////////////////////////
// Map Module
'use strict';

(function () { 
	var map = document.querySelector('.map');
	
	window.map = {
		mapShowed: false,
		advertCard: null,
		activePin: null,
		mapElem: map
	};
	
	
	var mapPins = map.querySelector('.map__pins');
	var mainPin = mapPins.querySelector('.map__pin--main');
	
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
			window.map.activePin.classList.remove('map__pin_active');
			window.map.activePin = null;
		}

		//добавляем map__pin_active элементу
		window.map.activePin = target;
		window.map.activePin.classList.add('map__pin_active');
		
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

		
		window.map.showMap = showMap;
		window.map.mapPins = mapPins;
		window.map.mainPin = mainPin;
})();