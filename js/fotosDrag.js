'use strict';

;(function () { 
	var fotosBlock = window.fotos.fotosBlock;
	var fotosDropzone = window.fotos.fotosDropzone;
	var fotosInput = window.fotos.fotosInput;
	
	var avatarBlock = window.fotos.avatarBlock;
	var avatarDropzone = window.fotos.avatarDropzone;
	var avatarInput = window.fotos.avatarInput;
	var avatarPreview = window.fotos.avatarPreview;
	
	
	//отменяем поведение по умолчанию и останавливаем всплытие выше необходимого
	['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
		fotosDropzone.addEventListener(eventName, preventDefaults, false);
		avatarDropzone.addEventListener(eventName, preventDefaults, false);
	});

	function preventDefaults (e) {
		e.preventDefault()
		e.stopPropagation()
	};
	
	
	// подсветка границы по dragenter и dragover
	['dragenter', 'dragover'].forEach(eventName => {
  	fotosDropzone.addEventListener(eventName, highlight, false);
  	avatarDropzone.addEventListener(eventName, highlight, false);
	});

	['dragleave', 'drop'].forEach(eventName => {
		fotosDropzone.addEventListener(eventName, unhighlight, false);
		avatarDropzone.addEventListener(eventName, unhighlight, false);
	});

	function highlight(e) {
		this.classList.add('highlight');
	};

	function unhighlight(e) {
		this.classList.remove('highlight');
	};
	
	
	//Берём инфу о перетащенных файлах
	fotosDropzone.addEventListener('drop', handleFotosDrop, false);
	avatarDropzone.addEventListener('drop', handleAvatarDrop, false);

	function handleFotosDrop(e) {
		let dt = e.dataTransfer;
		let files = dt.files;

		window.fotos.handleFotos(files);
	};
	
	function handleAvatarDrop(e) {
		let dt = e.dataTransfer;
		let file = dt.files[0];

		window.fotos.handleAvatar(file);
	};
	
	
	
})();