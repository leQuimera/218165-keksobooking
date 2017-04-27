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

  return function (currentArray, step) {
    listOfAdverts = currentArray;
    var fragment = document.createDocumentFragment();
    var allPins = pinsMap.querySelectorAll('.pin:not(.pin__main)');
    if (allPins.length !== 0) {
      for (var i = 0; i < allPins.length; i++) {
        pinsMap.removeChild(allPins[i]);
      }
    }
    var stepCount = (step) ? 3 : listOfAdverts.length;
    for (var j = 0; j < stepCount; j++) {
      fragment.appendChild(createPin(listOfAdverts[j]));
    }

    var onPinClickKey = function (evt) {
      window.showCard(evt, listOfAdverts);
    };

    pinsMap.appendChild(fragment);
    dialogWindow.style.display = 'none';
    pinsMap.addEventListener('click', onPinClickKey);
    pinsMap.addEventListener('keydown', onPinClickKey);
  };
})();
