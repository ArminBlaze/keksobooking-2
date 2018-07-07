'use strict';


(function () { 
		///////////////////////////
	// Card Module
	
	var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

	var ESC_KEYCODE = 27;
	

	function onAdvertOpen (target) {
		onAdvertClose();
		//добавляем map__pin_active элементу
		activePin = target;
		activePin.classList.add('map__pin_active');

		document.addEventListener('keydown', onPopupEscPress);

		if(~buttons.indexOf(activePin)) {
			var index = buttons.indexOf(activePin);
	//    console.log(index);
			advertCard = createMapCard(index);
			map.appendChild(advertCard);

			advertCard.querySelector('.popup__close').addEventListener('click', onAdvertClose);
		}
	}

	function onAdvertClose () {
		if(activePin) {
			activePin.classList.remove('map__pin_active');
			activePin = null;
			if(advertCard) {
				map.removeChild(advertCard);
				document.removeEventListener('keydown', onPopupEscPress);
				advertCard = null;
			}
		}
	}

	function onPopupEscPress (e) {
	//  if( e.target.classList.contains('setup-user-name') ) return; // игнорируем, если выделение на инпуте
		if(e.keyCode === ESC_KEYCODE) {
			onAdvertClose();
		}
	}
	
		//функция создания карточки объявления по номеру метки
	function createMapCard (index) {
		// нет адреса и дескрипшена
	//  var advert = adverts[0];
		// рандомное объявление
	//  var advert = adverts[randomInteger(0, adverts.length - 1)];
		var advert = adverts[index];
		var type = advert.offer.type;

		switch (type) {
			case "house":
				type = "Дом";
				break;
			case "bungalo":
				type = "Бунгало";
				break;
			case "flat":
				type = "Квартира";
				break;
		}

		var mapCard = mapCardTemplate.cloneNode(true);
		mapCard.querySelector('.popup__avatar').src = advert.author.avatar;
		mapCard.querySelector('h3').innerHTML = advert.offer.title;
		mapCard.querySelector('.popup__price').innerHTML = advert.offer.price +'&#x20bd;/ночь';
		mapCard.querySelector('h4').innerHTML = type;
		mapCard.querySelector('.popup__rooms').innerHTML = advert.offer.rooms + " комнаты для " + advert.offer.guests + ' гостей';
		mapCard.querySelector('.popup__checkins').innerHTML = 'Заезд после ' + advert.offer.checkin + ", выезд до " + advert.offer.checkout;

		var features = mapCard.querySelector('.popup__features');
		features.innerHTML = '';
		for (var i = 0; i < advert.offer.features.length; i++) {
			var li = document.createElement('li');
			li.className = 'feature feature--' + advert.offer.features[i];
			features.appendChild(li);
		}

		return mapCard;
	}

	// End of Card Module
	//////////////////////////////
})();