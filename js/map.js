'use strict';

var adverts = generateAdverts(8);

console.log(adverts);

var map = document.querySelector('.map');

var template = document.querySelector('template').content;

var buttonTemplate = template.querySelector('.map__pin');

var buttons = createButtons(adverts);
console.log(buttons);

var mapPins = map.querySelector('.map__pins');


var mapCardTemplate = template.querySelector('.map__card');

//map.appendChild(createMapCard(mapCardTemplate));

//функция создание карточки объявления
function createMapCard (template, index) {
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
  
  var mapCard = template.cloneNode(true);
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


function drawButtons (buttons) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < buttons.length; i++) {
    fragment.appendChild(buttons[i]);
  }
  return fragment;
}


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
  var left = adverts[i].location.x;
  var top = adverts[i].location.y;
  var avatar = adverts[i].author.avatar;
  
  elem.style = 'left:' + left + 'px; top:' + top + 'px;'
  elem.querySelector('img').src = avatar;
  return elem;
}

function generateAdverts(n) {
  var arr = [];

  for (var i = 0; i < n; i++) {
    arr.push(generateAdvert());
  }

  return arr;


  function generateAdvert() {
    var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
    var types = ['flat', 'house', 'bungalo'];
    var checkins = ['12:00', '13:00', '14:00'];
    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

    var advert = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': titles[i],

        //        "address": "{{location.x}}, {{location.y}}",
        'price': randomInteger(1000, 1000000),
        'type': types[randomInteger(0, types.length - 1)],
        'rooms': randomInteger(1, 5),
        'guests': randomInteger(1, 20),
        'checkin': checkins[randomInteger(0, checkins.length - 1)],
        'checkout': checkins[randomInteger(0, checkins.length - 1)],
        'features': generateFeatures(randomInteger(0, features.length)),
        'description': '',
        'photos': [],
      },
      'location': {
        'x': randomInteger(300, 900),
        'y': randomInteger(100, 500)
      }
    };

    return advert;

    function generateFeatures(length) {
      var tempFeatures = features.slice();
      var arr2 = [];

      for (var j = 0; j < length; j++) {

        var randomNum = randomInteger(0, tempFeatures.length);

        while (!tempFeatures[randomNum]) {
          randomNum = randomInteger(0, tempFeatures.length);
        }

        arr2.push(tempFeatures[randomNum]);
        tempFeatures[randomNum] = false;
      }

      return arr2;
    }
  }
}

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}


////////////////////////////////////////
// 04 - Events
////////////////////////////////////////

//map.classList.remove('map--faded');
//mapPins.appendChild(drawButtons(buttons));
//map.appendChild(createMapCard(mapCardTemplate));

var mapShowed = false;
var mainPin = mapPins.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');

var fieldsets = [].slice.call(noticeForm.querySelectorAll('fieldset'));

fieldsets.forEach(function(item){
//  console.log(item);
  item.setAttribute('disabled', '');
})

mainPin.addEventListener('mouseup', onMainPinMouseUp);
mapPins.addEventListener('click', onMapPinsClick);

var advertCard = null;
var activePin = null;

var ESC_KEYCODE = 27;


//синхронизация полей ввода
timein.addEventListener('input', onTimeinChange);
timeout.addEventListener('input', onTimeinChange);

type.addEventListener('input', onTypeChange);

room_number.addEventListener('input', onRoomChange);

var form = document.querySelector('.notice__form');

form.addEventListener('invalid', onFormInvalid, true);

function onFormInvalid (e) {
	console.log(e.target);
	
	e.target.style = 'border: 5px solid red';
//	e.target.addEventListener('keydown', function())
};

//var validityForm = function () {
//    for (var i = 0; i < formInputsvalid.length; i++) {
//      var validity = formInputsvalid[i].validity.valid;
//      if (!validity) {
//        formInputsvalid[i].classList.add('error');
//      } else {
//        formInputsvalid[i].classList.remove('error');
//      }
//    }
//};

														
														

function onRoomChange (e) {
	disableAllOptions(capacity);
	enableOptions(this.value);
	
	function enableOptions (num) {
		if (num >= capacity.options.length) {
			capacity.options[capacity.options.length - 1].disabled = false;
			num = 0;
		}
		
		for (var i = 0; i < num; i++) {
			capacity.options[i].disabled = false;
		}
		
		capacity.value = num;
	}

	function disableAllOptions (select) {
		var options = [].slice.call(select.options);

		options.forEach(function(item){
		//  console.log(item);
			item.setAttribute('disabled', 'true');
		})
	}
}



function onTypeChange (e) {
	console.log(this.value);
	console.log(price.min);
	
	switch(this.value) {
		case "flat":
			price.min = 1000;
			price.placeholder = 1000;
			break;
		case "house":
			price.min = 5000;
			price.placeholder = 5000;
			break;
		case "palace":
			price.min = 10000;
			price.placeholder = 10000;
			break;
		default:
			price.min = 0;
			price.placeholder = 0;
			break;
	}
}

function onTimeinChange (e) {
//	(this === timein) ? timeout.value = this.value : timein.value = this.value;
	timein.value = timeout.value = this.value;
}

function onMainPinMouseUp (e) {
  if(mapShowed) return;
  console.log("mainPin");
  
  map.classList.remove('map--faded');
  mapPins.appendChild(drawButtons(buttons));
  noticeForm.classList.remove('notice__form--disabled');
  fieldsets.forEach(function(item){
    item.removeAttribute('disabled');
  });
	//
  mapShowed = true;
}

function onMapPinsClick (e) {
	
  var target = e.target;
  
  while (target != this) {
    if ( target.classList.contains("map__pin") ) break;
    target = target.parentNode;
  }
  if (target == this) return;
  
  console.log(target);
  
	onAdvertClose();
	
	onAdvertOpen(target);
}

function onAdvertOpen (target) {
	//добавляем map__pin_active элементу
	activePin = target;
	activePin.classList.add('map__pin_active');
	
	document.addEventListener('keydown', onPopupEscPress);
	
	if(~buttons.indexOf(activePin)) {
		var index = buttons.indexOf(activePin);
    console.log(index);
		advertCard = createMapCard(mapCardTemplate, index);
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