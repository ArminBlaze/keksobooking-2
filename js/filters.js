'use strict';

(function () { 
	var filters = {
		features: {}
	};
	var newAdverts = [];
	
	//собираем данные с измененных фильтров
	function createFilters (e) {
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
		
		return filters;
//		filterAdverts(filters);
	}
	
	
	function filterAdverts (filters) {
		var adverts = window.data.adverts;
		newAdverts = adverts.filter(function (elem) {
			return filterAdvert(elem);
		});
		
		console.log(newAdverts);
		return newAdverts;
		
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
					if(prop === "type") check = filterEqual(offer[prop], filters[prop]);
					if(prop === "rooms" || prop === "guests") check = filterMin(offer[prop], filters[prop]);
					if(prop === "features") filterFeatures(offer.features, filters.features);
					
					if(check == false) break;
				}
			}
			
			return check;
		}
		
		function filterMin (advertRoom, filterRoom) {
			console.log(advertRoom + " " + filterRoom);
			return advertRoom >= filterRoom;
		}
		
		function filterEqual (advertType, filterType) {
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
	
	window.filters = {
		filters: filters,
		createFilters: createFilters,
		filterAdverts: filterAdverts,
		newAdverts: newAdverts
	}
})();