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
	mapFilters.addEventListener('change', onFiltersChange);
	
	var filters = {
		features: {}
	};
	
	//собираем данные с измененных фильтров
	function onFiltersChange (e) {
//		console.log(e.target);
		var key, value;
//		console.log(e.target.nodeName);
		key = e.target.id.split("-")[1];
//		console.log(key);
		
		if(e.target.nodeName === "SELECT") {
			value = e.target.value;
//			console.log(value);
			filters[key] = value;
		} 
		else {
			value = e.target.checked;
//			console.log(value);
			filters.features[key] = value;
		}
		
		console.log(filters);
		filterAdverts(filters);
	}
	
	
	function filterAdverts (filters) {
		var adverts = window.data.adverts;
		var newAdverts = adverts.filter(function (elem) {
			return filterAdvert(elem);
		});
		
		console.log(newAdverts);
		
		function filterAdvert (advert) {
			var offer = advert.offer;
			var features = advert.offer.features;
//			console.log(offer);
			var check = true;
			
			for (var prop in filters) {
				if (filters.hasOwnProperty(prop)) {
//					console.log(prop + " " + filters[prop])
					if(filters[prop] === "any") continue;
					
					if(prop === "price") check = filterPrice(offer[prop], filters[prop]);
					if(prop === "type") check = filterType(offer[prop], filters[prop]);
					if(prop === "rooms") check = filterRooms(offer[prop], filters[prop]);
					if(prop === "features") filterFeatures(offer.features, filters.features);
					
					if(check == false) break;
				}
			}
			
			
			return check;
		}
		
		function filterRooms (advertRoom, filterRoom) {
			console.log(advertRoom + " " + filterRoom);
			return advertRoom >= filterRoom;
		}
		
		function filterType (advertType, filterType) {
//			console.log(advertType + " " + filterType);
			return advertType === filterType;
		}
		
		function filterPrice (advertPrice, filterPrice) {
			var minPrice = 10000;
			var maxPrice = 50000;
//			console.log(advertPrice + " " + filterPrice);
			
			if(filterPrice === "low") return (advertPrice < minPrice);
			else if (filterPrice === "middle") return ( advertPrice >= minPrice && advertPrice <= maxPrice );
			else if (filterPrice === "high") return (advertPrice >= maxPrice );
		}
		
		function filterFeatures (advertFeatures, filterFeatures) {
//			console.log(advertFeatures + " " + filterFeatures);
		}
	}
	
	


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