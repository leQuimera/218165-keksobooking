'use strict';

// pin.js — модуль для отрисовки пина и взаимодействия с ним
window.pinSet = (function () {
  var listOfAdverts = [];
  var pinsMap = document.querySelector('.tokyo__pin-map');
  var dialogWindow = document.querySelector('.dialog');
  var PIN_WIDTH = 56;
  var PIN_HEIGHT = 75;

  var createPin = function (advert) {
    var pin = document.createElement('div');
    var img = document.createElement('img');
    pin.className = 'pin';
    pin.style.left = advert.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = advert.location.y - PIN_HEIGHT + 'px';
    img.className = 'rounded';
    img.width = 40;
    img.height = 40;
    img.src = advert.author.avatar;
    pin.appendChild(img);
    pin.setAttribute('tabindex', 0);
    return pin;
  };
  var searchAdvert = function (currentX, currentY) {
    for (var i = 0; i < listOfAdverts.length; i++) {
      var pinX = listOfAdverts[i].location.x - PIN_WIDTH / 2;
      var pinY = listOfAdverts[i].location.y - PIN_HEIGHT;
      if (pinX === currentX && pinY === currentY) {
        break;
      }
    }
    return i;
  };
  var onShowDialog = function (evt) {
    if (window.utilsSet.isEnterPressed(evt) || window.utilsSet.isClicked(evt)) {
      var currentPin = '';
      var currentX = '';
      var currentY = '';
      var checkedPin = evt.target;
      if (evt.target.classList.contains('rounded')) {
        currentPin = checkedPin.offsetParent;
        currentX = checkedPin.parentNode.style.left;
        currentY = checkedPin.parentNode.style.top;
      } else if (checkedPin.classList.contains('pin')) {
        currentPin = checkedPin;
        currentX = checkedPin.style.left;
        currentY = checkedPin.style.top;
      }
      if (currentPin && !currentPin.classList.contains('pin__main')) {
        window.utilsSet.isActiveSet('.pin--active');
        currentPin.classList.add('pin--active');
        currentX = parseInt(currentX.slice(0, -2), 10);
        currentY = parseInt(currentY.slice(0, -2), 10);
        var pinNumber = searchAdvert(currentX, currentY);
        window.cardSet(listOfAdverts[pinNumber]);
      }
    }
  };

  return function (currentArray, step) {
    listOfAdverts = currentArray;
    var fragment = document.createDocumentFragment();
    var allPins = pinsMap.querySelectorAll('.pin:not(.pin__main)');
    if (allPins.length !== 0) {
      pinsMap.innerHTML = '';
    }
    var stepCount = (step) ? 3 : listOfAdverts.length;
    for (var i = 0; i < stepCount; i++) {
      fragment.appendChild(createPin(listOfAdverts[i]));
    }
    pinsMap.appendChild(fragment);
    dialogWindow.style.display = 'none';
    pinsMap.addEventListener('click', onShowDialog);
    pinsMap.addEventListener('keydown', onShowDialog);
  };
})();
