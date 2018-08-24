import fotos from './fotos';

var fotosBlock = fotos.fotosBlock;
var fotosDropzone = fotos.fotosDropzone;
var fotosInput = fotos.fotosInput;

var avatarBlock = fotos.avatarBlock;
var avatarDropzone = fotos.avatarDropzone;
var avatarInput = fotos.avatarInput;
var avatarPreview = fotos.avatarPreview;


//отменяем поведение по умолчанию и останавливаем всплытие выше необходимого
//	['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
//		fotosDropzone.addEventListener(eventName, preventDefaults, false);
//		avatarDropzone.addEventListener(eventName, preventDefaults, false);
//	});

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function(eventName) {
  fotosDropzone.addEventListener(eventName, preventDefaults, false);
  avatarDropzone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults (e) {
  e.preventDefault()
//		e.stopPropagation()
};


// подсветка границы по dragenter и dragover
['dragenter', 'dragover'].forEach(function(eventName) {
  fotosDropzone.addEventListener(eventName, highlight, false);
  avatarDropzone.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(function(eventName) {
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
  var dt = e.dataTransfer;
  var files = dt.files;

  fotos.handleFotos(files);
};

function handleAvatarDrop(e) {
  var dt = e.dataTransfer;
  var file = dt.files[0];

  fotos.handleAvatar(file);
};


/////////////////////////////


var draggedItem = null;

document.addEventListener('dragenter', function(e) {
  if(!e.dataTransfer) return;
  if (!containsFiles(e)) return;

  fotosDropzone.classList.add('glowing');
  avatarDropzone.classList.add('glowing');
});


['dragend', 'drop'].forEach(function(eventName) {
  document.addEventListener(eventName, unglow, false);
});

function unglow (e) {
  if(fotosDropzone.classList.contains('glowing')) fotosDropzone.classList.remove('glowing');
  if(avatarDropzone.classList.contains('glowing')) avatarDropzone.classList.remove('glowing');
}


function containsFiles(event) {
  if (event.dataTransfer.types) {
    for (var i=0; i<event.dataTransfer.types.length; i++) {
      if (event.dataTransfer.types[i] == "Files") {
          return true;
      }
    }
  }
  return false;
}
