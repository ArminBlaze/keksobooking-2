'use strict';


(function () { 
		///////////////////////////////
	// Модуль формы
	
	//синхронизация полей ввода
	var noticeForm = document.querySelector('.notice__form');

	var fieldsets = [].slice.call(noticeForm.querySelectorAll('fieldset'));

	fieldsets.forEach(function(item){
	//  console.log(item);
		item.setAttribute('disabled', '');
	})

	
	

	// валидация формы
	var form = document.querySelector('.notice__form');
	var submitButton = form.querySelector('.form__submit');

	var inputs = form.querySelectorAll('input:not([type="submit"])');

	submitButton.addEventListener('click', formValidation, true);

	function formValidation (e) {
		console.log("validation");
		for (var i = 0; i < inputs.length; i++) {
			var validity = inputs[i].validity.valid;
			if (!validity) {
				inputs[i].classList.add('form__error');
			} else {
				inputs[i].classList.remove('form__error');
			}
		}
	}


	
	function setAddress (position) {
		address.value = "x: " + position.x + ", y: " + position.y;
//		testAddress(position);
	}
	
	//тестовая функция. Не нужна в финальной сборке. Отображает маркер на полученных координатах.
//	function testAddress (position) {
//		console.log(position);
//		var div = document.createElement('div');
//		div.style.position = 'absolute';
//		div.style.left = position.x + "px";
//		div.style.top = position.y + "px";
//		div.style.width = "1px";
//		div.style.height = "1px";
//		div.style.background = "lime";
//		div.style.outline = "1px solid black";
//		div.style.zIndex = "1001";
//		
//		window.map.mapElem.appendChild(div)
//	}
	
	
	//06 - Синхронизация полей - общая функция
	timein.addEventListener('input', onTimeinChange);
	timeout.addEventListener('input', onTimeinChange);
	type.addEventListener('input', onTypeChange);
	
	function onTypeChange (e) {
		synchronizeFields(type, price, ["flat", "house", "palace", "bungalo"], [1000, 5000, 10000, 0], syncValueWithMin);
	}
	
	var syncValueWithMin = function(element, value) {
		element.min = value;
		element.placeholder = value;
	};
	
	
	function onTimeinChange () {
	//	(this === timein) ? timeout.value = this.value : timein.value = this.value;
		timein.value = timeout.value = this.value;
	}

	
	function synchronizeFields (elem1, elem2, values1, values2, callback) {
		var value1 = elem1.value;
		
		var position = values1.indexOf(value1);
		console.log(position);
		var value2 = values2[position];
		console.log(value2);
		callback(elem2, value2);
	}	
	
	room_number.addEventListener('input', onRoomChange);
	
	function onRoomChange (e) { //(elem, value)
		synchronizeFields(room_number, capacity, ["1", "2", "3", "100"], ["1", "2", "3", "0"], syncRooms);
	}
	
	function syncRooms (element, value) {
		value = +value;
		disableAllOptions(element); 
		enableOptions(value); 
		
		function enableOptions (num) {
			if (num === 0) {
				element.querySelector('[value="0"]').disabled = false;
			}

			for (var i = 0; i < num; i++) {
				element.options[i].disabled = false;
			}

			element.value = num; //выбираем опцию
		}

		function disableAllOptions (select) {
			var options = [].slice.call(select.options);

			options.forEach(function(item){
				item.setAttribute('disabled', 'true');
			})
		}
	}
	
	
	
	
	window.form = {
		noticeForm: noticeForm,
		fieldsets: fieldsets,
		setAddress: setAddress
	};
})();


	//Старая фция синхронизации цены (частный случай)
//	function onTypeChangettt (e) {
//	//	console.log(this.value);
//	//	console.log(price.min);
//
//		switch(this.value) {
//			case "flat":
//				price.min = 1000;
//				price.placeholder = 1000;
//				break;
//			case "house":
//				price.min = 5000;
//				price.placeholder = 5000;
//				break;
//			case "palace":
//				price.min = 10000;
//				price.placeholder = 10000;
//				break;
//			default:
//				price.min = 0;
//				price.placeholder = 0;
//				break;
//		}
//	}