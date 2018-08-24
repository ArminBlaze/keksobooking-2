// Map Module
import map__drag from './map__drag';
import data from './data';
import map__pin from './map__pin';
import map__showCard from './map__showCard';
import form from './form';
import filters from './filters';

var mapElem = document.querySelector('.map');
var mapPins = mapElem.querySelector('.map__pins');
var mainPin = mapPins.querySelector('.map__pin--main');
var mapFilters = mapElem.querySelector('.map__filters');

var mapState = {
  mapShowed: false,
  advertCard: null,
  activePin: null,
};




mainPin.addEventListener('mouseup', onMainPinMouseUp);

mapElem.addEventListener('card-closed', onCardClose);
mapPins.addEventListener('mousedown', function(e) {
  e.preventDefault(); //отмена выделения карты
});

var debouncedOnFiltersChange = filters.debounce(onFiltersChange, 500);
mapFilters.addEventListener('change', debouncedOnFiltersChange);


//	var updateWizardsWithDelay = window.util.debounce(window.setup.updateWizards, 500);

function onFiltersChange (e) {
  var activeFilters = filters.createFilters(e);

  data.filteredAdverts = filters.filterAdverts(activeFilters);
  // отображать отфильтрованные функцией отрисовки пинов
  data.filteredButtons = data.createButtons(data.getfilteredAdverts());
  map__pin.drawButtons(data.getFilteredButtons());

}

//функция активации карты и формы. Запускается однократно, а потом удаляет обработчик
function onMainPinMouseUp (e) {
  console.log("mainUp");
  var adverts = data.getAdverts()
  if(!adverts) return;
  initMap();
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
//		console.log(target);

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
  map__showCard.showCard(target);
  debugger;
  map__pin.selectPin(target);
  console.log(mapState);
}

function onCardClose (e) {
//  console.log(e);
  debugger;
  console.log(mapState.activePin);
  if(mapState.activePin) map__pin.deselectPin();
}


function initMap () {
  mapElem.classList.remove('map--faded'); //
  form.noticeForm.classList.remove('notice__form--disabled'); //
  form.fieldsets.forEach(function(item){
    item.removeAttribute('disabled');
  });
  mapState.mapShowed = true;

  map__pin.drawButtons(data.getButtons());
//		data.init();
  mainPin.style.zIndex = 1000; // показывать над другими элементами
  //убирать слушателья mouseup?
  mainPin.removeEventListener('mouseup', onMainPinMouseUp);
  mainPin.addEventListener('mousedown', map__drag.onDragstart);

  mapPins.addEventListener('click', onMapPinsClick);
}

export default {
  mapShowed: mapState.mapShowed,
  advertCard: mapState.advertCard,
  activePin: mapState.activePin,

  showMap: initMap,
  mapPins: mapPins,
  mainPin: mainPin,
  mapFilters: mapFilters
};


/////////////////////
//	06 - XHR
