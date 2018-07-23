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
	map.addEventListener('card-closed', onCardClose);
	mapPins.addEventListener('mousedown', function(e) {
		e.preventDefault(); //отмена выделения карты
	});


	//функция активации карты и формы. Запускается однократно, а потом удаляет обработчик
	function onMainPinMouseUp (e) {
		showMap();
		window.map.pin.drawButtons();
		mainPin.style.zIndex = 1000; // показывать над другими элементами
		//убирать слушателья mouseup?
		mainPin.removeEventListener('mouseup', onMainPinMouseUp);
		mainPin.addEventListener('mousedown', window.drag.onDragstart);
	};

	//обработка кликов по пинам
	function onMapPinsClick (e) {
		//делегирование - поднимаемся по родителям
		var target = e.target;
		while (target != this) {
			if ( target.classList.contains("map__pin") ) break;
			target = target.parentNode;
		}
		if (target == this) return;

		//логика
		showCard(target);
	};
	
//	generateEvent() {
//    this.elem.dispatchEvent(new CustomEvent('form-send', {
//          bubbles: true,
//          detail: this.user._id
//        }));
//  }
	
	
	
	function showCard (target) {
		onCardClose();
		window.map.card.showCard(target);
		window.map.pin.selectPin(target);
	}
	
	function onCardClose () {
		if(window.map.activePin) window.map.pin.deselectPin();
	}

	
	function showMap () {
		map.classList.remove('map--faded'); //
		window.form.noticeForm.classList.remove('notice__form--disabled'); //
		window.form.fieldsets.forEach(function(item){
			item.removeAttribute('disabled');
		});
		window.mapShowed = true;
	}
	
	

	
	/////////////////////
//	06 - XHR


})();