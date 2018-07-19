'use strict';


(function () { 
		///////////////////////////
	// Card Module
	
	var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
	var buttons = window.data.buttons;
	var map = window.map.mapElem;
	var ESC_KEYCODE = 27;
	var adverts = data.adverts;


	function showCard(target) {
		console.log("card.showCard()");
		closeCard();

		if(~buttons.indexOf(target)) {
			var index = buttons.indexOf(target);
	//    console.log(index);
			window.map.advertCard = createMapCard(index);
			map.appendChild(window.map.advertCard);

			document.addEventListener('keydown', onPopupEscPress);
			window.map.advertCard.querySelector('.popup__close').addEventListener('click', closeCard);
		}
	}

	function closeCard () {
		if(window.map.advertCard) {
			console.log("card.closeCard()");
			generateCloseEvent(window.map.mapElem);
			map.removeChild(window.map.advertCard);
			document.removeEventListener('keydown', onPopupEscPress);
			window.map.advertCard = null;
		}
	}
	
	function generateCloseEvent (elem) {
		elem.dispatchEvent(new CustomEvent('card-closed', {
			bubbles: true
		}));
	}
	
	function onPopupEscPress (e) {
	//  if( e.target.classList.contains('setup-user-name') ) return; // игнорируем, если выделение на инпуте
		if(e.keyCode === ESC_KEYCODE) {
			closeCard();
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

	window.map.card = {
		showCard: showCard,
		closeCard: closeCard
	};
})();