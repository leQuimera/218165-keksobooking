'use strict';

// pin.js — модуль для отрисовки пина и взаимодействия с ним

window.pinSet = (function () {
  var listOfAdverts = [];
  var pinsMap = document.querySelector('.tokyo__pin-map');
  var pinActive = document.querySelector('.pin--active');
  var dialogWindow = document.querySelector('.dialog');
  var PIN_WIDTH = 56;
  var PIN_HEIGHT = 75;

  // Создание пина для объявления
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

  // Удалить пин с карты
  var deletePin = function (pin) {
    pinsMap.removeChild(pin);
  };

  // Поиск номера нужного объявления по данным фотографии
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

  // Показать объявление, если на пин кликнули или нажали по enter
  var onShowDialog = function (evt) {
    if (window.utilsSet.isEnterPressed(evt) || window.utilsSet.isClicked(evt)) {
      // Создание блока переменных в зависимости от того, куда ткнул пользователь мышкой
      var currentPin = '';
      var currentX = '';
      var currentY = '';
      var checkedPin = evt.target;
      if (evt.target.className === 'rounded') {
        currentPin = checkedPin.offsetParent;
        currentX = checkedPin.parentNode.style.left;
        currentY = checkedPin.parentNode.style.top;
      } else if (checkedPin.className === 'pin' || checkedPin.className === 'pin pin--active') {
        currentPin = checkedPin;
        currentX = checkedPin.style.left;
        currentY = checkedPin.style.top;
      }
      // Если до этого у другого элемента существовал класс pin--active, то у этого элемента класс нужно убрать
      if (currentPin && !currentPin.classList.contains('pin__main')) {
        window.utilsSet.isActiveSet(pinActive);
        currentPin.classList.add('pin--active');
        pinActive = currentPin;
        // Создание окна диалога для выбранного пина
        currentX = parseInt(currentX.slice(0, -2), 10);
        currentY = parseInt(currentY.slice(0, -2), 10);
        var pinNumber = searchAdvert(currentX, currentY);
        window.cardSet(listOfAdverts[pinNumber]);
      }
    }
  };

  return function (currentArray) {
    // Нанесение пинов на карту
    listOfAdverts = currentArray;
    var fragment = document.createDocumentFragment();
    var allPins = pinsMap.querySelectorAll('.pin:not(.pin__main)');
    if (allPins.length !== 0) {
      allPins.forEach(function (item) {
        deletePin(item);
      });
    }
    for (var i = 0; i < listOfAdverts.length; i++) {
      fragment.appendChild(createPin(listOfAdverts[i]));
    }
    pinsMap.appendChild(fragment);
    dialogWindow.style.display = 'none';
    pinsMap.addEventListener('click', onShowDialog);
    pinsMap.addEventListener('keydown', onShowDialog);
  };
})();
