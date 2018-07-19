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
		mainPin.addEventListener('mousedown', onDragstart);
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
	
	
	//перетаскивание пина
	function onDragstart (e) {
		var mapCoords = getCoords(map);
		var mapMax = {
			width: map.clientWidth - mainPin.offsetWidth,
			height: map.clientHeight - mainPin.offsetHeight
		}
		
		e.preventDefault();
		var coords = getCoords(mainPin);
		
// запоминаем место клика по элементу и учитываем координаты родителя-карты,
// т.к. будем задавать пину относительные координаты, а не абсолютные
		var shiftX = e.pageX - coords.left + mapCoords.left;
		var shiftY = e.pageY - coords.top + mapCoords.top;
		
//		 подготовить к перемещению
//		 2. разместить на том же месте, но в абсолютных координатах
		mainPin.style.position = 'absolute';
		mainPin.style.transform = "none";
		onMouseMove(e);
		
		
		
//		 3, перемещать по экрану
		document.addEventListener('mousemove', onMouseMove);

		// 4. отследить окончание переноса
		document.addEventListener('mouseup', onMouseUp);
		
		function onMouseMove(e) {
			var left = e.pageX - shiftX;
			var top = e.pageY - shiftY;
			
			//Ограничиваем координаты: Y min = 100, Y max = 500
			var yMin = 100;
			var yMax = 600;
			
			if(left < 0) left = 0;
			else if (left > mapMax.width) left = mapMax.width;
			if(top < yMin) top = yMin;
			else if (top > yMax) top = yMax;
//			else if (top > mapMax.height) top = mapMax.height;

			mainPin.style.left = left + 'px';
			mainPin.style.top = top + 'px';
		}
		
		function onMouseUp () {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
			
			calculatePosition();
		}
		
		function calculatePosition () {
			
			var mainPinOffset = {
				x: 32,
				y: 82
			};
			
			var position = {
				x: +mainPin.style.left.slice(0, -2) + mainPinOffset.x,
				y: +mainPin.style.top.slice(0, -2) + mainPinOffset.y
			};
			
			
			window.form.setAddress(position);
		}
		
		mainPin.ondragstart = function() {
			return false;
		};
		
		function getCoords(elem) {   // кроме IE8-
			var box = elem.getBoundingClientRect();
			return {
				top: box.top + pageYOffset,
				left: box.left + pageXOffset
			};
		}
	
	}

})();