'use strict';

;(function () { 
	var fotosBlock = window.fotos.fotosBlock;
	var fotosDropzone = window.fotos.fotosDropzone;
	var fotosInput = window.fotos.fotosInput;
	
	
	//отменяем поведение по умолчанию и останавливаем всплытие выше необходимого
	['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
		fotosDropzone.addEventListener(eventName, preventDefaults, false)
	});

	function preventDefaults (e) {
		e.preventDefault()
		e.stopPropagation()
	};
	
	
	// подсветка границы по dragenter и dragover
	['dragenter', 'dragover'].forEach(eventName => {
  	fotosDropzone.addEventListener(eventName, highlight, false);
	});

	['dragleave', 'drop'].forEach(eventName => {
		fotosDropzone.addEventListener(eventName, unhighlight, false);
	});

	function highlight(e) {
		fotosDropzone.classList.add('highlight');
	};

	function unhighlight(e) {
		fotosDropzone.classList.remove('highlight');
	};
	
	
	//Берём инфу о перетащенных файлах
	fotosDropzone.addEventListener('drop', handleDrop, false);

	function handleDrop(e) {
		let dt = e.dataTransfer;
		let files = dt.files;

		window.fotos.handleFiles(files);
	};
	
	
	
})();