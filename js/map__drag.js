//import map from './map.js';
import form from './form';

//var mapElem = document.querySelector('.map');
//var mainPin = mapElem.querySelector('.map__pin--main');

import('./map.js')
  .then((map) => {
    var mapElem = map.mapElem1;
    var mainPin = map.mainPin;
  });

  //перетаскивание пина
function onDragstart (e) {
  var mapCoords = getCoords(mapElem);
  var mapMax = {
    width: mapElem.clientWidth - mainPin.offsetWidth,
    height: mapElem.clientHeight - mainPin.offsetHeight
  }

  e.preventDefault();
  var coords = getCoords(mainPin);

// запоминаем место клика по элементу и учитываем координаты родителя-карты,
// т.к. будем задавать пину относительные координаты, а не абсолютные
  var shiftX = e.pageX - coords.left + mapCoords.left;
  var shiftY = e.pageY - coords.top + mapCoords.top;

//		 подготовить к перемещению
//		 2. разместить на том же месте, но в абсолютных координатах
  mainPin.style.position = 'absolute';
  mainPin.style.transform = "none";
  onMouseMove(e);



//		 3, перемещать по экрану
  document.addEventListener('mousemove', onMouseMove);

  // 4. отследить окончание переноса
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(e) {
    var left = e.pageX - shiftX;
    var top = e.pageY - shiftY;

    //Ограничиваем координаты: Y min = 100, Y max = 500
    var yMin = 100;
    var yMax = 600;

    if(left < 0) left = 0;
    else if (left > mapMax.width) left = mapMax.width;
    if(top < yMin) top = yMin;
    else if (top > yMax) top = yMax;
//			else if (top > mapMax.height) top = mapMax.height;

    mainPin.style.left = left + 'px';
    mainPin.style.top = top + 'px';
  }

  function onMouseUp () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    calculatePosition();
  }

  function calculatePosition () {

    var mainPinOffset = {
      x: 32,
      y: 82
    };

    var position = {
      x: +mainPin.style.left.slice(0, -2) + mainPinOffset.x,
      y: +mainPin.style.top.slice(0, -2) + mainPinOffset.y
    };


    form.setAddress(position);
  }

  mainPin.ondragstart = function() {
    return false;
  };

  function getCoords(elem) {   // кроме IE8-
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

}

//	window.drag = {
//		onDragstart: onDragstart
//	}

  export default {
    onDragstart: onDragstart
  }
