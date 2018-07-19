'use strict';


(function () { 
/////////////////////////////////////
// Data module
//	var adverts = generateAdverts(8);
	var adverts, buttons;
	window.backend.load(onLoad, onError);
	
//	console.log(adverts);

	var map = document.querySelector('.map');

	var template = document.querySelector('template').content;

	var buttonTemplate = template.querySelector('.map__pin');

	
	//console.log(buttons);

	
	var mapCardTemplate = template.querySelector('.map__card');

	
	function createButtons (adverts) {
	//  var fragment = document.createDocumentFragment();
		var buttonsArr = [];

		for (var i = 0; i < adverts.length; i++) {
			var button = buttonTemplate.cloneNode(true);
			buttonsArr.push(createButton(button, i));
		}

		return buttonsArr;
	}

	function createButton(elem, i) {
		// магические числа - смещение указателей на макете относительно низа стрелки
		// x -25, y -61
		var left = window.data.adverts[i].location.x;
		var top = window.data.adverts[i].location.y;
		var avatar = window.data.adverts[i].author.avatar;

		elem.style = 'left:' + left + 'px; top:' + top + 'px;'
		elem.querySelector('img').src = avatar;
		return elem;
	}

//	function generateAdverts(n) {
//		var arr = [];
//
//		for (var i = 0; i < n; i++) {
//			arr.push(generateAdvert());
//		}
//
//		return arr;
//
//
//		function generateAdvert() {
//			var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
//			var types = ['flat', 'house', 'bungalo'];
//			var checkins = ['12:00', '13:00', '14:00'];
//			var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
//
//			var advert = {
//				'author': {
//					'avatar': 'img/avatars/user0' + (i + 1) + '.png'
//				},
//				'offer': {
//					'title': titles[i],
//
//					//        "address": "{{location.x}}, {{location.y}}",
//					'price': randomInteger(1000, 1000000),
//					'type': types[randomInteger(0, types.length - 1)],
//					'rooms': randomInteger(1, 5),
//					'guests': randomInteger(1, 20),
//					'checkin': checkins[randomInteger(0, checkins.length - 1)],
//					'checkout': checkins[randomInteger(0, checkins.length - 1)],
//					'features': generateFeatures(randomInteger(0, features.length)),
//					'description': '',
//					'photos': [],
//				},
//				'location': {
//					'x': randomInteger(300, 900),
//					'y': randomInteger(100, 500)
//				}
//			};
//
//			return advert;
//
//			function generateFeatures(length) {
//				var tempFeatures = features.slice();
//				var arr2 = [];
//
//				for (var j = 0; j < length; j++) {
//
//					var randomNum = randomInteger(0, tempFeatures.length);
//
//					while (!tempFeatures[randomNum]) {
//						randomNum = randomInteger(0, tempFeatures.length);
//					}
//
//					arr2.push(tempFeatures[randomNum]);
//					tempFeatures[randomNum] = false;
//				}
//
//				return arr2;
//			}
//		}
//	}

	function randomInteger(min, max) {
		var rand = min + Math.random() * (max + 1 - min);
		rand = Math.floor(rand);
		return rand;
	}
	
	//06 - XHR
		
	
	function onLoad (data) {
		window.data.adverts = data;
		window.data.buttons = createButtons(data);
	}
	
	function onError (message) {
		console.error(message);
			
		var errorDiv = document.querySelector('.errorDiv');

//		if(errorDiv) document.removeChild(errorDiv);

		if(!errorDiv) {
			errorDiv = document.createElement('div');
			errorDiv.style = '\
				z-index: 100;\
				margin: 0 auto;\
				text-align: center;\
				background-color: red;\
				position: absolute;\
				top: 0;\
				left: 0;\
				right: 0;\
				font-size: 30px;\
			';
		}
		
		errorDiv.textContent = message;
		document.body.appendChild(errorDiv);
	}
	
	
	window.data = {
		buttons: buttons,
		adverts: adverts
	};

})();
// End of Data module
/////////////////