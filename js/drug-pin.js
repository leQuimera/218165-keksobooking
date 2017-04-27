'use strict';

// Модуль перетаскивание main-пина
(function () {

  var pinHandle = document.querySelector('.pin__main');
  var addressField = document.querySelector('#address');
  var currentCoords = null;

  pinHandle.setAttribute('draggable', true);

  var onPinMouseMove = function (evt) {
    evt.preventDefault();
    var PIN_PARAM = {
      MIN_X: 0,
      MIN_Y: 0,
      MAX_X: pinHandle.offsetParent.clientWidth - pinHandle.clientWidth,
      MAX_Y: pinHandle.offsetParent.clientHeight - pinHandle.clientHeight
    };
    var shift = {
      x: currentCoords.x - evt.clientX,
      y: currentCoords.y - evt.clientY
    };
    currentCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var newX = pinHandle.offsetLeft - shift.x;
    var newY = pinHandle.offsetTop - shift.y;
    if ((newX >= PIN_PARAM.MIN_X && newX <= PIN_PARAM.MAX_X) && (newY >= PIN_PARAM.MIN_Y && newY <= PIN_PARAM.MAX_Y)) {
      pinHandle.style.left = newX + 'px';
      pinHandle.style.top = newY + 'px';
    }
    addressField.value = 'x: ' + Math.floor(newX + pinHandle.clientWidth / 2) + 'px, y: ' + Math.floor(newY + pinHandle.clientHeight) + ' px';
  };

  var onPinMouseUp = function (evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', onPinMouseMove);
    document.removeEventListener('mouseup', onPinMouseUp);
  };

  var onPinMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    currentCoords = startCoords;
    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  };

  pinHandle.addEventListener('mousedown', onPinMouseDown);
})();
