  ///////////////////////////
// Card Module
import map from './map';
import util from './util';
import data from './data';

var mapElem = map.mapElem;

var template = document.querySelector('template');


if('content' in template) {
  var mapCardTemplate = template.content.querySelector('.map__card');
}
else {
  var mapCardTemplate = template.children[0];
}


var ESC_KEYCODE = 27;



function showCard(target) {
  var buttons = data.filteredButtons;
  closeCard();

  if(~buttons.indexOf(target)) {
    var index = buttons.indexOf(target);
//    console.log(index);
    map.advertCard = createMapCard(index);
    mapElem.appendChild(map.advertCard);

    document.addEventListener('keydown', onPopupEscPress);
    map.advertCard.querySelector('.popup__close').addEventListener('click', closeCard);
  }
}

function closeCard () {
  if(map.advertCard) {
//			generateCloseEvent(map.mapElem);
    util.generateEvent(map.mapElem, "card-closed");
    mapElem.removeChild(map.advertCard);
    document.removeEventListener('keydown', onPopupEscPress);
    map.advertCard = null;
  }
}

//	function generateCloseEvent (elem) {
////		var event = new CustomEvent('card-closed', {bubbles: true});	//Edge > 11 IE
//		var event = document.createEvent("Event"); //IE 9+
//		event.initEvent("card-closed", true, true); //IE 9+
//		elem.dispatchEvent(event);
//	}

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
  var adverts = data.filteredAdverts;
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

//map.card = {
//  showCard: showCard,
//  closeCard: closeCard
//};

export default {
  showCard: showCard,
  closeCard: closeCard
};
