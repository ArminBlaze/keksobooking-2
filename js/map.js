////////////////////////////////
// Map Module
'use strict';

(function () { 
	var map = document.querySelector('.map');
	var mapPins = map.querySelector('.map__pins');
	var mainPin = mapPins.querySelector('.map__pin--main');
	var mapFilters = map.querySelector('.map__filters');
	
	window.map = {
		mapShowed: false,
		advertCard: null,
		activePin: null,
		mapElem: map,
		showMap: initMap,
		mapPins: mapPins,
		mainPin: mainPin
	};
	
	
	mainPin.addEventListener('mouseup', onMainPinMouseUp);
	
	map.addEventListener('card-closed', onCardClose);
	mapPins.addEventListener('mousedown', function(e) {
		e.preventDefault(); //отмена выделения карты
	});
	mapFilters.addEventListener('change', onFiltersChange);
	
	function onFiltersChange (e) {
		var filters = window.filters.createFilters(e);
		window.data.filteredAdverts = window.filters.filterAdverts(filters);
		// отображать отфильтрованные функцией отрисовки пинов
		window.data.filteredButtons = window.data.createButtons(window.data.filteredAdverts);
		window.map.pin.drawButtons(window.data.filteredButtons);
		
	}

	//функция активации карты и формы. Запускается однократно, а потом удаляет обработчик
	function onMainPinMouseUp (e) {
		if(!window.data.adverts) return;
		initMap();
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
		console.log(target);

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

	
	function initMap () {
		map.classList.remove('map--faded'); //
		window.form.noticeForm.classList.remove('notice__form--disabled'); //
		window.form.fieldsets.forEach(function(item){
			item.removeAttribute('disabled');
		});
		window.mapShowed = true;
		
		window.map.pin.drawButtons(window.data.buttons);
//		window.data.init();
		mainPin.style.zIndex = 1000; // показывать над другими элементами
		//убирать слушателья mouseup?
		mainPin.removeEventListener('mouseup', onMainPinMouseUp);
		mainPin.addEventListener('mousedown', window.drag.onDragstart);
		
		mapPins.addEventListener('click', onMapPinsClick);
	}
	
	

	
	/////////////////////
//	06 - XHR


})();