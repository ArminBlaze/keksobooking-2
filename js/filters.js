'use strict';

;(function () { 
//	var mapFilters = document.querySelector('.map__filters');
	
	var filters = {
		features: {}
	};
	
	var newAdverts = [];
	
	//собираем данные с измененных фильтров
	function createFilters (e) {
		//можно собирать по селектору все checked элементы, преобразовывать в массив и фильтровать+маппировать
//		var features = mapFilters.querySelectorAll('input:checked');
		
		var key, value;
		key = e.target.id.split("-")[1];
		
		if(e.target.nodeName === "SELECT") {
			value = e.target.value;
			filters[key] = value;
		} 
		else {
			value = e.target.checked;
			filters.features[key] = value;
		}
		
		console.log(filters);
		return filters;
	}
	
	//фильтруем объявления по собранным фильтрам
	function filterAdverts (filters) {
		var adverts = window.data.adverts;
		newAdverts = adverts.filter(function (elem) {
			return filterAdvert(elem);
		});
		
		return newAdverts;
		
		function filterAdvert (advert) {
			var offer = advert.offer;
			var features = advert.offer.features;
			var check = true;
			
			for (var prop in filters) {
//				if (!filters.hasOwnProperty(prop)) continue;
				if(filters[prop] === "any") continue;

				if(prop === "price") check = filterPrice(offer[prop], filters[prop]);
				if(prop === "type") check = filterEqual(offer[prop], filters[prop]);
				if(prop === "rooms" || prop === "guests") check = filterMin(offer[prop], filters[prop]);
				if(prop === "features") check = filterFeatures(offer.features, filters.features);

				if(check == false) break;
				
			}
			return check;
		}
		
		function filterFeatures (advertFeatures, filterFeatures) {
			var store = {}; // объект для коллекции и быстрого поиска свойства в нём
			var check = true;
			
			advertFeatures.forEach(function(key) {
				store[key] = true;
			})
			
			for (var feature in filterFeatures) {
//				if (!filters.hasOwnProperty(prop)) continue;
					if(filterFeatures[feature] === false) continue;
					
					if(!store[feature]) check = false;
					if(check === false) break;
			}
				
			return check;
		}
		
		function filterMin (advertRoom, filterRoom) {
			return advertRoom >= filterRoom;
		}
		
		function filterEqual (advertType, filterType) {
			return advertType === filterType;
		}
		
		function filterPrice (advertPrice, filterPrice) {
			var minPrice = 10000;
			var maxPrice = 50000;
			
			if(filterPrice === "low") return (advertPrice < minPrice);
			else if (filterPrice === "middle") return ( advertPrice >= minPrice && advertPrice <= maxPrice );
			else if (filterPrice === "high") return (advertPrice >= maxPrice );
		}
	};
	
	function debounce (f, ms) {
		var timer;

		return function() {
			if(timer) clearTimeout(timer);

			var self = this;
			var args = [].slice.call(arguments);

			timer = setTimeout(function() {
				f.apply(self, args);
			}, ms, args);
		};
	};
	
	window.filters = {
		filters: filters,
		createFilters: createFilters,
		filterAdverts: filterAdverts,
		newAdverts: newAdverts,
		debounce: debounce
	}
})();