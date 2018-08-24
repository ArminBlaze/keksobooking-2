  var overlay;
  var showed = false;

  createIndicator();

  document.addEventListener('backend-loadstart', initializeProgress);
  document.addEventListener('backend-loadend', progressDone);

  function createIndicator () {
    overlay = document.createElement('div');
    overlay.classList.add('loading-overlay');

    overlay.style.cssText = '\
    top: 0;\
    left: 0;\
    width: 100%;\
    height: 100%;\
    position: fixed;\
    opacity: 1;\
    z-index: 1001;\
    transition: opacity 300ms ease-in;\
    background: rgba(0, 0, 0, 0.3);\
    background-image: url(img/loading.svg);\
    background-repeat: no-repeat;\
    background-position: center center;\
    ';
  };


  function initializeProgress(e) {
//    console.log("I hear document loadstart");
    showIndicator();
  };

  function progressDone(e) {
//    console.log("I hear document loadend");
    hideIndicator();
  };

  function showIndicator () {
    if(showed) return;
    document.body.appendChild(overlay);
    showed = true;
  };

  function hideIndicator () {
    if(!showed) return;
    overlay.parentNode.removeChild(overlay);
    showed = false;
  }

  export default {
    overlay: overlay
  }
