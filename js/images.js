'use strict';

;(function () { 
	var avatarBlock = window.form.noticeForm.querySelector('.notice__photo');
	var avatarDropzone = avatarBlock.querySelector('.drop-zone');
	var avatarInput = avatarBlock.querySelector('#avatar');
	var avatarPreview = avatarBlock.querySelector('.notice__preview img');
	
	var fotosBlock = window.form.noticeForm.querySelector('.form__photo-container');
	var fotosDropzone = fotosBlock.querySelector('.drop-zone');
	var fotosInput = fotosBlock.querySelector('#images');
	
	var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
	var DEFAULT_AVATAR = 'img/muffin.png';
	
	
	window.form.noticeForm.addEventListener('reset', onFormReset);
	window.form.noticeForm.addEventListener('submit', onFormSubmit);
	avatarInput.addEventListener('change', onAvatarInputChange);
	fotosInput.addEventListener('change', onFotosInputChange);
	
	function onFormReset (e) {
		console.log('форма сброшена');
		deletePreviews();
	}
	
	function onAvatarInputChange (e) {
		console.log("onAvatarInputChange");
		var files = avatarInput.files;
		if(files.length === 0) return;
		
		var filteredFiles = testFilesType(files);
		
		if(filteredFiles.length > 0) {
			drawFiles(filteredFiles, onAvatarLoad);
		}
	};
	
	
	function onFotosInputChange (e) {
		console.log("onFotosInputChange");
		var files = fotosInput.files;
		if(files.length === 0) return;
		
		var filteredFiles = testFilesType(files);
		
		if(filteredFiles.length > 0) {
			drawFiles(filteredFiles, onFotosLoad);
		}
	};
	
	
	function testFilesType (files) {
		console.log(files);
		
		files = [].slice.call(files);
		
		var newFiles = files.filter(function(item) {
			var fileName = item.name.toLowerCase(); //имя файла
			console.log(fileName);
			var fileExt = fileName.split('.').pop();	//расширение добавленного в инпут файла
			console.log(fileExt);

			var matches = FILE_TYPES.some(function(item) { //есть ли расширение есть среди разрешенных
				console.log(fileExt, item);
				return fileExt === item;
			});
			console.log(matches);
			return matches;
		});
		
		
		console.log(newFiles);
		return newFiles;
	};
	
	
	function drawFiles (files, onLoad) {
		files.forEach(function(item){
			var reader = new FileReader();
			
			reader.addEventListener('load', function() {
				onLoad(reader);
			});
			
			reader.readAsDataURL(item);
		});
	};
	
	function deletePreviews	() {
		avatarPreview.src = DEFAULT_AVATAR;
		
		var imgs = fotosBlock.querySelectorAll('img');
		imgs = [].slice.call(imgs);
		imgs.forEach(function(item) {
			item.parentNode.removeChild(item);
		});
	}
	
	
	function onAvatarLoad (reader) {
		avatarPreview.src = reader.result;
		avatarPreview.style.height = "auto";
	};
	
	function onFotosLoad (reader) {
		var img = document.createElement('img');
		img.style.width = "100px";
		img.style.maxHeight = "100px";
		img.src = reader.result;
		fotosBlock.appendChild(img);
	}
	
})();