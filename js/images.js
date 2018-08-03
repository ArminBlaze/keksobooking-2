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
	
	
	avatarInput.addEventListener('change', onAvatarInputChange);
	fotosInput.addEventListener('change', onFotosInputChange);
	window.form.noticeForm.addEventListener('reset', onFormReset);
	
	
	function onAvatarInputChange (e) {
//		console.log("onAvatarInputChange");
		var files = avatarInput.files;
		if(files.length === 0) return;
		
		var filteredFiles = testFilesType(files);
		
		if(filteredFiles.length > 0) {
			generatePreviews(filteredFiles, onAvatarLoad);
		}
	};
	
	function onFotosInputChange (e) {
//		console.log("onFotosInputChange");
		var files = fotosInput.files;
		if(files.length === 0) return;
		
		var filteredFiles = testFilesType(files);
		
		if(filteredFiles.length > 0) {
			deletePreviews();
			generateEmptyDivs(filteredFiles.length);
			generatePreviews(filteredFiles, onFotosLoad);
		}
	};
	
	function generatePreviews (files, onLoad) {
		files.forEach(function(item, i, arr){
			var reader = new FileReader();
			
			reader.addEventListener('load', function() {
				onLoad(reader, i, arr.length);
			});
			
			reader.readAsDataURL(item);
		});
	};
	
	function onAvatarLoad (reader) {
		avatarPreview.src = reader.result;
		avatarPreview.style.height = "auto";
	};
	
	function onFotosLoad (reader, i, length) {
		var img = document.createElement('img');
		img.style.width = "100px";
		img.style.maxHeight = "100px";
		img.src = reader.result;
		img.setAttribute('data-number', i);
		drawOrderedPreview(img, i, length)
		
		generateEvent(fotosInput);
	};
	
	function drawOrderedPreview (img, i, length) {
//		fotosBlock.appendChild(img);
		fotosBlock.querySelector('[data-number="' + i + '"]').appendChild(img);
		
	};
	
	function generateEmptyDivs (length) {
		console.log("fragment");
		var fragment = document.createDocumentFragment();
		for(var i = 0; i < length; i++) {
			var div = document.createElement('div');
			div.setAttribute('data-number', i);
			fragment.appendChild(div);
		}
		console.log(fragment);
		fotosBlock.appendChild(fragment);
	}
	
	function generateEvent (elem) {
//		var event = new CustomEvent('card-closed', {bubbles: true});	//Edge > 11 IE
		var event = document.createEvent("Event"); //IE 9+
		event.initEvent("image-added", true, true); //IE 9+
		elem.dispatchEvent(event);
	}
	
	
	function testFilesType (files) {
//		console.log(files);
		
		files = [].slice.call(files);
		
		var newFiles = files.filter(function(item) {
			var fileName = item.name.toLowerCase(); //имя файла
//			console.log(fileName);
			var fileExt = fileName.split('.').pop();	//расширение добавленного в инпут файла
//			console.log(fileExt);

			var matches = FILE_TYPES.some(function(item) { //есть ли расширение есть среди разрешенных
//				console.log(fileExt, item);
				return fileExt === item;
			});
//			console.log(matches);
			return matches;
		});
		
		
//		console.log(newFiles);
		return newFiles;
	};
	
	function deleteAvatar () {
		avatarPreview.src = DEFAULT_AVATAR;
	}
	
	function deletePreviews	() {
		var divs = fotosBlock.querySelectorAll('div[data-number]');
		divs = [].slice.call(divs);
		divs.forEach(function(item) {
			item.parentNode.removeChild(item);
		});
	};
	
	
	function onFormReset (e) {
		console.log('форма сброшена');
		deleteAvatar();
		deletePreviews();
	};
	
})();