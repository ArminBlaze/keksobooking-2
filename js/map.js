////////////////////////////////
// Map Module
'use strict';

(function () { 
	var map = document.querySelector('.map');
	var mapShowed = false;
	var advertCard = null;






	// End of Map module
	//////////////////////////////

	function showMap () {
		map.classList.remove('map--faded'); //
		window.form.noticeForm.classList.remove('notice__form--disabled'); //
		window.form.fieldsets.forEach(function(item){
			item.removeAttribute('disabled');
		});
		//
		mapShowed = true;
	}






	
	window.map = {
		mapElem: map,
		mapShowed: mapShowed,
		advertCard: advertCard,
		showMap: showMap
	};
})();