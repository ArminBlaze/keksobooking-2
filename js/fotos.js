import form from './form';

var avatarBlock = form.noticeForm.querySelector('.notice__photo');
var avatarDropzone = avatarBlock.querySelector('.drop-zone');
var avatarInput = avatarBlock.querySelector('#avatar');
var avatarPreview = avatarBlock.querySelector('.notice__preview img');

var fotosBlock = form.noticeForm.querySelector('.form__photo-container');
var fotosDropzone = fotosBlock.querySelector('.drop-zone');
var fotosInput = fotosBlock.querySelector('#images');
var fotosPreview = fotosBlock.querySelector('.previews');

var filesDone = 0;
var filesToDo = 0;
var progressBar = document.getElementById('progress-bar');

var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
var DEFAULT_AVATAR = 'img/muffin.png';


avatarInput.addEventListener('change', onAvatarInputChange);
fotosInput.addEventListener('change', onFotosInputChange);
form.noticeForm.addEventListener('reset', onFormReset);


function onAvatarInputChange (e) {
//		console.log("onAvatarInputChange");
  var file = avatarInput.files[0];
  if(file.length === 0) return;

  handleAvatar(file);
};

function handleAvatar (file) {
  var filteredFile = testFilesType(file);

  if(filteredFile.length > 0) {
    generatePreviews(filteredFile, onAvatarLoad);
  }
}

function onFotosInputChange (e) {
//		console.log("onFotosInputChange");
  var files = fotosInput.files;
  if(files.length === 0) return;

  handleFotos(files);
};

//обрабатываем файлы
function handleFotos (files) {
  var filteredFiles = testFilesType(files);
  fotos.filteredFiles = filteredFiles;

  if(filteredFiles.length > 0) {
    initializeProgress(filteredFiles.length);
    deletePreviews();
    generateImagesWrap(filteredFiles.length);
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

  img.src = reader.result;
  img.setAttribute('data-number', i);
  img.classList.add('previews__img');
  img.setAttribute('draggable', 'true');
  drawOrderedPreview(img, i, length);

//		window.util.generateEvent(fotosBlock, "image-added");
};

function drawOrderedPreview (img, i, length) {
//		fotosBlock.appendChild(img);
  fotosPreview.querySelector('[data-number="' + i + '"]').appendChild(img);
  progressDone();
};

function generateImagesWrap (length) {
//		console.log("fragment");
  var fragment = document.createDocumentFragment();
  for(var i = 0; i < length; i++) {
    var span = document.createElement('span');
    span.setAttribute('data-number', i);
    span.classList.add('previews__wrap');
    fragment.appendChild(span);
  }
//		console.log(fragment);
  fotosPreview.appendChild(fragment);
}


function testFilesType (files) {
  //если это коллекция, иначе это один файл
  if({}.toString.call(files) === "[object FileList]") {
    files = [].slice.call(files);
  }
  else {
    files = [].concat(files);
  }

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
  })


//		console.log(newFiles);
  return newFiles;
};

function deleteAvatar () {
  avatarPreview.src = DEFAULT_AVATAR;
};

function deletePreviews	() {
  var wrappers = fotosBlock.querySelectorAll('.previews__wrap');
  wrappers = [].slice.call(wrappers);
  wrappers.forEach(function(item) {
    item.parentNode.removeChild(item);
  });
};


function onFormReset (e) {
  console.log('форма сброшена');
  deleteAvatar();
  deletePreviews();
  initializeProgress(); //сбрасываем полосу загрузки в ноль
};

function initializeProgress(numfiles) {
  progressBar.value = 0
  filesDone = 0
  filesToDo = numfiles
};

function progressDone() {
  filesDone++
  progressBar.value = filesDone / filesToDo * 100
};

export default {
  avatarBlock: avatarBlock,
  avatarDropzone: avatarDropzone,
  avatarInput: avatarInput,
  avatarPreview: avatarPreview,
  fotosBlock: fotosBlock,
  fotosDropzone: fotosDropzone,
  fotosInput: fotosInput,
  fotosPreview: fotosPreview,
  testFilesType: testFilesType,
  deletePreviews: deletePreviews,
  generateImagesWrap: generateImagesWrap,
  generatePreviews: generatePreviews,
  onFotosLoad: onFotosLoad,
  handleFotos: handleFotos,
  handleAvatar: handleAvatar
};
