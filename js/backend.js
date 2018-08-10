'use strict';

;(function () { 

//получать с сервера данные с помощью объекта XMLHttpRequest
//или с помощью JSONP, обрабатывать полученные запросы и
//передавать полученную информацию в функцию обратного
//вызова
	
//	var CALLBACK_NAME = '__jsonpCallback';
//	var DATA_URL = 'https://1510.dump.academy/code-and-magick/data';
	var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
	var SAVE_URL = 'https://js.dump.academy/keksobooking/';
	
	function request (options) {
		var xhr = new XMLHttpRequest();
		
		xhr.addEventListener('load', function() {
			if(xhr.status === 200) {
				try	{
//					console.log(xhr.response);
					var data = JSON.parse(xhr.response);
					options.onLoad(data);
				} 
				catch(err) {
//					console.log(err.message);
					options.onError('Ошибка обработки JSON: ' + err.message);
				}
			} 
			else {
				console.log(xhr.response);
				options.onError('Ошибка сервера: ' + xhr.status + ' ' + xhr.statusText);
			}
		});
		
		xhr.addEventListener('error', function() {
			options.onError('Произошла ошибка соединения');
		});
		
		xhr.addEventListener('timeout', function() {
			options.onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
		});
    
     xhr.addEventListener('loadstart', function() {
      console.log("loadstart");
      window.util.generateEvent(document, "backend-loadstart");
    });
    
    xhr.addEventListener('loadend', function() {
      console.log("loadend");
      window.util.generateEvent(document, "backend-loadend");
    });
		
		xhr.timeout = 10000;
		xhr.open(options.method, options.url);
		xhr.send(options.data);
	};
	
	
	function load (onLoad, onError) {
		request({
				url: LOAD_URL,
				method: 'GET',
				onLoad: onLoad,
				onError: onError
			});
	};
	
	function save (data, onLoad, onError) {
		request({
			url: SAVE_URL,
			method: 'POST',
			onLoad: onLoad,
			onError: onError,
			data: data
		});
	}
	
	
	window.backend = {
		load: load,
		save: save
	}
})();
