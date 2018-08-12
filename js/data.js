'use strict';


;(function () { 
/////////////////////////////////////
// Data module
//	var adverts = generateAdverts(8);
	var adverts, buttons;
	var MAX_BUTTONS = 5;
	window.backend.load(onLoad, onError)
	

	var map = document.querySelector('.map');

	var template = document.querySelector('template');
  
  if('content' in template) { //полифилл под IE11
    var mapCardTemplate = template.content.querySelector('.map__card');
    var buttonTemplate = template.content.querySelector('.map__pin');
  }
  else {
    var mapCardTemplate = template.children[0];
    var buttonTemplate = template.children[1];
  }
	
	
	function createButtons (adverts) {
		var length = MAX_BUTTONS;
		if(adverts.length < MAX_BUTTONS) length = adverts.length;
	//  var fragment = document.createDocumentFragment();
		var buttonsArr = [];

		for (var i = 0; i < length; i++) {
			var button = buttonTemplate.cloneNode(true);
			buttonsArr.push(createButton(button, i, adverts));
		}

		return buttonsArr;
	}

	function createButton(elem, i, adverts) {
//		console.log(adverts[i]);
		// магические числа - смещение указателей на макете относительно низа стрелки
		// x -25, y -61
		var left = adverts[i].location.x;
		var top = adverts[i].location.y;
		var avatar = adverts[i].author.avatar;

//		elem.style = 'left:' + left + 'px; top:' + top + 'px;';
		elem.style.left = left + 'px';
    elem.style.top = top + 'px';
		elem.querySelector('img').src = avatar;
		return elem;
	}


	function randomInteger(min, max) {
		var rand = min + Math.random() * (max + 1 - min);
		rand = Math.floor(rand);
		return rand;
	}
	
	
	//06 - XHR
	function onLoad (data) {
    console.log(data);
		window.data.adverts = data;
		window.data.filteredAdverts = window.data.adverts;
		window.data.buttons = createButtons(data);
		window.data.filteredButtons = window.data.buttons;
	}
	
	
	function onError (message, success) {
		if (!success) console.error(message);
			
		var errorDiv = document.querySelector('.errorDiv');

//		if(errorDiv) document.removeChild(errorDiv);

		if(!errorDiv) {
			errorDiv = document.createElement('div');
			errorDiv.classList.add('errorDiv');
			errorDiv.style.cssText = '\
				z-index: 100;\
				margin: 0 auto;\
				text-align: center;\
				position: fixed;\
				top: 0;\
				left: 0;\
				right: 0;\
				font-size: 30px;\
			';
			if(!success) errorDiv.style.backgroundColor = "red";
			else {
				errorDiv.style.backgroundColor = "green";
			}
		}
			

		if(window.data.timer) {
			clearTimeout(window.data.timer);
			window.data.timer = null;
		}

		window.data.timer = setTimeout(function(){
			var errorDiv = document.querySelector('.errorDiv');
			if(errorDiv) errorDiv.parentNode.removeChild(errorDiv);
		}, 10000);
		
		
		errorDiv.textContent = message;
		document.body.appendChild(errorDiv);
	}
	
	
	window.data = {
		buttons: buttons,
		adverts: adverts,
		onError: onError,
		createButtons: createButtons
	};

})();












// End of Data module
/////////////////

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