'use strict';

var adverts = generateAdverts(8);

console.log(adverts);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var template = document.querySelector('template').content;

var buttonTemplate = template.querySelector('.map__pin');

var buttons = createButtons(adverts);
console.log(buttons);

var mapPins = map.querySelector('.map__pins');
mapPins.appendChild(drawButtons(buttons));

var mapCardTemplate = template.querySelector('.map__card');

map.appendChild(createMapCard(mapCardTemplate));


function createMapCard (template) {
  // нет адреса и дескрипшена
//  var advert = adverts[0];
  // рандомное объявление
  var advert = adverts[randomInteger(0, adverts.length - 1)];
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
