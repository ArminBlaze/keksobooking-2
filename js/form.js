		///////////////////////////////
	// Модуль формы

	//синхронизация полей ввода
	var form = document.querySelector('.notice__form');
//	var form = document.querySelector('.notice__form');

	var fieldsets = [].slice.call(form.querySelectorAll('fieldset'));

	fieldsets.forEach(function(item){
	//  console.log(item);
		item.setAttribute('disabled', '');
	});

	//делаем input#address типа "readonly", запрещаем любое выделение, т.к. нельзя сделать input одновременно required & readonly
  var address = document.getElementById("address");
	address.addEventListener('paste', function(e){e.preventDefault()});
	address.addEventListener('keypress', function(e){e.preventDefault()});
	address.addEventListener('mousedown', function(e){e.preventDefault()});
	address.addEventListener('focus', function(e){
		this.blur();
		e.preventDefault()
	});


	// валидация формы
	var submitButton = form.querySelector('.form__submit');

	var inputs = form.querySelectorAll('input:not([type="submit"])');

	submitButton.addEventListener('click', formValidation, true);
	form.addEventListener('submit', onFormSubmit);

	function onFormSubmit (e) {
		e.preventDefault();

		var data = new FormData(this);
//		var data = {};
//		var data = new FormData();

//		for (var i = 0, ii = form.length; i < ii; ++i) {
//			var input = form[i];
//			if (input.name) {
////				data[input.name] = input.value;
//				data.append(input.name, input.value)
//			}
//		}

//		console.log(data);

		//картинки добавленные в форму
		var sortedImages = window.fotosSort.sortFilesInInput();
//		console.log(sortedImages.length);

//		var formData    = new FormData(this);
//		var formKeys    = formData.keys();
//		var formEntries = formData.entries();
//
//		do {
//			console.log(formEntries.next().value);
//		} while (!formKeys.next().done)
//		console.log(data.getAll());

//		for (var i in items){
//			var item_number = items[i];
//			data.append('files' + i, storedFiles[item_number]);
//		}

//		data.files = {};
//
		sortedImages.forEach(function(item, i) {
//			data.append('files', item);
//			data.files[i] = item;
//			data.append('files' + i, storedFiles[item_number]);
//			data.append('files[]', item, item.name);
			data.append('file' + i, item, item.name);
		});

//		data.append('testField', 'test');
//		data.append('files', sortedImages[0]);

//		console.log(data.getAll('files'));

//    initializeProgress(); //для индикатора загрузки
		window.backend.save(data, onLoad, window.data.onError);
	};


	function onLoad (data) {	//при успешной отправке данных на сервер
		console.log(data);
		form.reset();
		window.data.onError("Данные отправлены", true);
	}

	function formValidation (e) {
		for (var i = 0; i < inputs.length; i++) {
			inputs[i].setCustomValidity(""); //сбрасываем кастомную валидацию, иначе поле невалидно
			var validity = inputs[i].validity.valid;
			if (!validity) {
				inputs[i].classList.add('form__error');
				customValidity(inputs[i]);
			} else {
				inputs[i].classList.remove('form__error');
			}
		}
	};

	function customValidity (elem) {
		if(elem === address && elem.validity.valueMissing) { //
			elem.setCustomValidity('Пожалуйста, выберите адрес маркером на карте');
		}
	}


	function setAddress (position) {
		address.value = "x: " + position.x + ", y: " + position.y;
//		testAddress(position);
	};

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
  var timein = document.getElementById("timein");
	timein.addEventListener('change', onTimeinChange);

  var timeout = document.getElementById("timeout");
	timeout.addEventListener('change', onTimeinChange);

  var type = document.getElementById("type");
  var price = document.getElementById("price");
	type.addEventListener('change', onTypeChange);

  var room_number = document.getElementById("room_number");
  var capacity = document.getElementById("capacity");
	room_number.addEventListener('change', onRoomChange);

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

	function onRoomChange (e) { //(elem, value)
		synchronizeFields(room_number, capacity, ["1", "2", "3", "100"], ["1", "2", "3", "0"], syncRooms);
	}

	function synchronizeFields (elem1, elem2, values1, values2, callback) {
		var value1 = elem1.value;

		var position = values1.indexOf(value1);
		console.log(position);
		var value2 = values2[position];
		console.log(value2);
		callback(elem2, value2);
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



	export default {
		noticeForm: form,
		fieldsets: fieldsets,
		setAddress: setAddress
	};


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
