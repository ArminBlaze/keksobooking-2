'use strict';

;(function () { 
	var fotosBlock = window.form.noticeForm.querySelector('.form__photo-container');
	var fotosDropzone = fotosBlock.querySelector('.drop-zone');
	var fotosInput = fotosBlock.querySelector('#images');
	
//	fotosInput.addEventListener('change', onFotosInputChange); 
	fotosInput.addEventListener('image-added', onImagesAdded);
	
	function onImagesAdded (e) {
		console.log("onImagesAdded");
	}
	
	function onImagesAdded (e) {
		console.log('изменился инпут');
		
		var files = fotosInput.files;
		if(files.length === 0) return;
		
//		var images = fotosBlock.querySelectorAll('div[data-number]');
		var images = fotosBlock.querySelectorAll('img');
		images = [].slice.call(images);
		images.forEach(function(item){
			if(!item.classList.contains('form__foto')) {
				item.classList.add('form__foto');
				item.setAttribute('draggable', 'true');
			}
		});
	};
	
	
	var draggedItem = null;
	
	fotosBlock.addEventListener('dragstart', function(e) {
		console.log(e.target.tagName);
		if(e.target.tagName.toLowerCase() !== 'img') {
			return;
		}
		
		
		draggedItem = e.target;
		//перетаскиваем как текст, значение - alt картинки
		e.dataTransfer.setData('text/plain', draggedItem.getAttribute('data-number'));
		e.dataTransfer.setData('parent', 'fotosBlock');
		fotosBlock.style.outline = "2px dashed #ff6d51";
	});
	
	document.addEventListener('dragover', function (e) {
		e.preventDefault();
		return false;
	});
	
	fotosBlock.addEventListener('drop', function(e) {
		e.target.style.backgroundColor = '';
		e.preventDefault();
		
		if(!checkCell(e.target)) return;
		
		console.log(e.dataTransfer.getData('parent'));
		if(e.dataTransfer.getData('parent') === 'fotosBlock') {
			//определяем позицию таргета и draggedItem
			var targetPos = calculatePositionInParent(e.target);
			var dragPos = calculatePositionInParent(draggedItem);
			console.log(targetPos, dragPos);
			
			if(targetPos < dragPos) { //таргет до нашего - ставим наш до таргета
				e.target.parentNode.parentNode.insertBefore(draggedItem.parentNode, e.target.parentNode);
			}
			else { //если после - ставим наш после таргета
				e.target.parentNode.parentNode.insertBefore(draggedItem.parentNode, e.target.parentNode.nextSibling);
			}
			
			console.log(fotosInput.files);
			console.log(fotosInput.files[0]);
		}
		
		draggedItem = null;
	});
	
	function calculatePositionInParent (elem) {
		for(var i in elem.parentNode.parentNode.children) {
        if(elem.parentNode.parentNode.children[i] === elem.parentNode) return i;
    }
	}
	
	document.addEventListener('dragend', function(e) {
		fotosBlock.style.outline = "";
	});
	
	function checkCell (target) {
		if(!draggedItem) return false;
		if(!target.classList.contains('form__foto')) return false;
//		if(target.childNodes.length > 0) return false;
		
		return true;
	}
	
	
//	var shopElement = document.querySelector('.setup-artifacts-shop'); //магазин
//	var draggedItem = null;
//	
//	//элемент у которого есть свойство dropzone (инвентарь)
//	var artifactsElement = document.querySelector('.setup-artifacts');  
//	
//	//делегирование. При клике на любой Img элемент запускаем обработчик.
//	shopElement.addEventListener('dragstart', function(e) {
//		if(e.target.tagName.toLowerCase() !== 'img') {
//			return;
//		}
//		
//		draggedItem = e.target;
//		//перетаскиваем как текст, значение - alt картинки
//		e.dataTransfer.setData('text/plain', e.target.alt);
//		e.dataTransfer.setData('parent', 'shop');
//		artifactsElement.style.outline = "2px dashed red";
//	});
//	
//	artifactsElement.addEventListener('dragstart', function(e) {
//		if(e.target.tagName.toLowerCase() !== 'img') {
//			return;
//		}
//		
//		draggedItem = e.target;
//		//перетаскиваем как текст, значение - alt картинки
//		e.dataTransfer.setData('text/plain', e.target.alt);
//		e.dataTransfer.setData('parent', 'inventory');
//		artifactsElement.style.outline = "2px dashed green";
//	});
//	
//	
//	document.addEventListener('dragover', function (e) {
//		e.preventDefault();
//		return false;
//	});
//	
//	artifactsElement.addEventListener('drop', function(e) {
//		e.target.style.backgroundColor = '';
//		e.preventDefault();
//		
//		if(!checkCell(e.target)) return;
//		
//		console.log(e.dataTransfer.getData('parent'));
//		
//		if(e.dataTransfer.getData('parent') === 'shop') {
//			e.target.appendChild(draggedItem.cloneNode(true));
//		}
//		else if(e.dataTransfer.getData('parent') === 'inventory') {
//			e.target.appendChild(draggedItem);
//		}
//		
//		draggedItem = null;
//	});
//	
//	artifactsElement.addEventListener('dragenter', function(e) {
//		if(!checkCell(e.target)) return;
//		
//		e.target.style.backgroundColor = 'yellow';
//		e.preventDefault();
//	});
//	
//	artifactsElement.addEventListener('dragleave', function(e) {
//		e.target.style.backgroundColor = '';
//		e.preventDefault();
//	});
//	
//	document.addEventListener('dragend', function(e) {
//		artifactsElement.style.outline = "";
//	});
//	
//	function checkCell (target) {
//		if(!draggedItem) return false;
//		if(!target.classList.contains('setup-artifacts-cell')) return false;
//		if(target.childNodes.length > 0) return false;
//		
//		return true;
//	}
})();