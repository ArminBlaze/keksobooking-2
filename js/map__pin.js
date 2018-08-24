// Pin Module
import map from './map';

function drawButtons (buttons) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < buttons.length; i++) {
    fragment.appendChild(buttons[i]);
  }
//		return fragment;
//		map.mapPins.innerHTML = "";
  deleteButtons();
  map.mapPins.appendChild(fragment);
}

function deleteButtons () {
  var buttons = map.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
  buttons = [].slice.call(buttons);

  buttons.forEach(function(item){
    item.parentNode.removeChild(item);
  });
}

function deselectPin () {
  console.log(map.activePin);
  map.activePin.classList.remove('map__pin_active');
  map.activePin = null;
}

function selectPin (target) {
  map.activePin = target;
  map.activePin.classList.add('map__pin_active');
}




//	map.pin = {
//		drawButtons: drawButtons,
//		selectPin: selectPin,
//		deselectPin: deselectPin
//	};

export default {
  drawButtons: drawButtons,
  selectPin: selectPin,
  deselectPin: deselectPin
};
// End of Pin Module
////////////////////////
