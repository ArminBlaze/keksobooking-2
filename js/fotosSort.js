import fotos from './fotos';

var fotosBlock = fotos.fotosBlock;
var fotosDropzone = fotos.fotosDropzone;
var fotosInput = fotos.fotosInput;
var fotosPreview = fotos.fotosInput;

//	fotosInput.addEventListener('change', onFotosInputChange);
//	fotosBlock.addEventListener('image-added', onImagesAdded);

//	function onImagesAdded (e) {
//		console.log("onImagesAdded");
//	}

//	function onImagesAdded (e) {
//		console.log('добавили картинки');
//
//		var files = fotos.filteredFiles;
//		if(files.length === 0) return;
//
////		var images = fotosBlock.querySelectorAll('img');
////		images = [].slice.call(images);
////		images.forEach(function(item){
////			if(!item.classList.contains('form__foto')) {
////				item.classList.add('form__foto');
////				item.setAttribute('draggable', 'true');
////			}
////		});
//	};


var draggedItem = null;

fotosBlock.addEventListener('dragstart', function(e) {
//		console.log(e.target.tagName);
  if(e.target.tagName.toLowerCase() !== 'img') {
    return;
  }

  draggedItem = e.target;
  //перетаскиваем как текст, значение - alt картинки
  e.dataTransfer.setData('text/plain', draggedItem.getAttribute('data-number'));
  e.dataTransfer.setData('parent', 'fotosBlock');
  fotosBlock.style.outline = "2px dashed #ff6d51";
});

document.addEventListener('dragenter', function(e) {
  if(!draggedItem) return;
  if(e.target.tagName.toLowerCase() !== "img") return;
  e.target.style.outline = "2px solid #ff6d51";
});

document.addEventListener('dragleave', function(e) {
  if(e.target.tagName.toLowerCase() !== "img") return;
  e.target.style.outline = "";
});

document.addEventListener('dragover', function (e) {
  e.preventDefault();
  return false;
});

fotosBlock.addEventListener('drop', function(e) {
  e.target.style.outline = "";
  e.preventDefault();

  if(!checkCell(e.target)) return;

//		console.log(e.dataTransfer.getData('parent'));
  if(e.dataTransfer.getData('parent') === 'fotosBlock') {
    //определяем позицию таргета и draggedItem
    var targetPos = calculatePositionInParent(e.target);
    var dragPos = calculatePositionInParent(draggedItem);
//			console.log(targetPos, dragPos);

    if(targetPos < dragPos) { //таргет до нашего - ставим наш до таргета
      e.target.parentNode.parentNode.insertBefore(draggedItem.parentNode, e.target.parentNode);
    }
    else { //если после - ставим наш после таргета
      e.target.parentNode.parentNode.insertBefore(draggedItem.parentNode, e.target.parentNode.nextSibling);
    }
  }

  draggedItem = null;
//		sortFilesInInput();
});

function sortFilesInInput () {
  var divs = fotosBlock.querySelectorAll('.previews__wrap');
  divs = [].slice.call(divs);
//		console.log(divs);
//		console.log(fotosInput.files);

  var files = fotos.filteredFiles;
  var sortedFiles = [];
//		files = [].slice.call(files);

  divs.forEach(function(item, i){
    var pos = item.getAttribute('data-number');
//			console.log(pos);
    sortedFiles[i] = files[pos];
  });

//		console.log(sortedFiles);

  return(sortedFiles);

//		fotosInput.files = sortedFiles;

//		console.log(fotosInput.files);
//		console.log(fotosInput.files[0]);
}

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
  if(!target.classList.contains('previews__img')) return false;
//		if(target.childNodes.length > 0) return false;

  return true;
}

export default {
  sortFilesInInput: sortFilesInInput
};
