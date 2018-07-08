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

	timein.addEventListener('input', onTimeinChange);
	timeout.addEventListener('input', onTimeinChange);

	type.addEventListener('input', onTypeChange);

	room_number.addEventListener('input', onRoomChange);

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
	//	console.log(this.value);
	//	console.log(price.min);

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
	
	function setAddress (position) {
		address.value = "x: " + position.x + ", y: " + position.y;
//		testAddress(position);
	}
	
	//тестовая функция. Не нужна в финальной сборке. Отображает маркер на полученных координатах.
	function testAddress (position) {
		console.log(position);
		var div = document.createElement('div');
		div.style.position = 'absolute';
		div.style.left = position.x + "px";
		div.style.top = position.y + "px";
		div.style.width = "1px";
		div.style.height = "1px";
		div.style.background = "lime";
		div.style.outline = "1px solid black";
		div.style.zIndex = "1001";
		
		window.map.mapElem.appendChild(div)
	}
	
	window.form = {
		noticeForm: noticeForm,
		fieldsets: fieldsets,
		setAddress: setAddress
	};
})();