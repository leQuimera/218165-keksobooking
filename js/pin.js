'use strict';

// pin.js — модуль для отрисовки пина и взаимодействия с ним

window.pinSet = (function () {
  var pinsMap = document.querySelector('.tokyo__pin-map');
  var pinActive = document.querySelector('.pin--active');
  var dialogWindow = document.querySelector('.dialog');

  // Создание пина для объявления
  var createPin = function (advert) {
    var pin = document.createElement('div');
    var img = document.createElement('img');
    pin.className = 'pin';
    pin.style.left = advert.location.x - pin.offsetWidth / 2 + 'px';
    pin.style.top = advert.location.y - pin.offsetHeight + 'px';
    img.className = 'rounded';
    img.width = 40;
    img.height = 40;
    img.src = advert.author.avatar;
    pin.appendChild(img);
    pin.setAttribute('tabindex', 0);
    return pin;
  };

  // Поиск номера нужного объявления по данным фотографии
  var searchAdvert = function (currentSrc, listOfAdverts) {
    for (var i = 0; i < listOfAdverts.length; i++) {
      if (listOfAdverts[i].author.avatar === currentSrc) {
        break;
      }
    }
    return i;
  };

  // Показать объявление, если на пин кликнули или нажали по enter
  var onShowDialog = function (evt, listOfAdverts) {
    if (window.eventCheck.isEnterPressed(evt) || window.eventCheck.isClicked(evt)) {
      // Создание блока переменных в зависимости от того, куда ткнул пользователь мышкой
      var currentPin = '';
      var currentSrc = '';
      var chechedPin = evt.target;
      if (evt.target.className === 'rounded') {
        currentPin = chechedPin.offsetParent;
        currentSrc = chechedPin.getAttribute('src');
      } else if (chechedPin.className === 'pin' || chechedPin.className === 'pin pin--active') {
        currentPin = chechedPin;
        currentSrc = chechedPin.children[0].getAttribute('src');
      }
      // Если до этого у другого элемента существовал класс pin--active, то у этого элемента класс нужно убрать
      if (pinActive) {
        pinActive.classList.remove('pin--active');
      }
      currentPin.classList.add('pin--active');
      pinActive = currentPin;
      // Создание окна диалога для выбранного пина
      var pinNumber = searchAdvert(currentSrc, listOfAdverts);
      window.cartSet(listOfAdverts[pinNumber]);
    }
  };

  return function (listOfAdverts) {
    // Нанесение пинов на карту
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < listOfAdverts.length; i++) {
      fragment.appendChild(createPin(listOfAdverts[i]));
    }
    pinsMap.appendChild(fragment);
    dialogWindow.style.display = 'none';
    pinsMap.addEventListener('click', onShowDialog);
    pinsMap.addEventListener('keydown', onShowDialog);
  };
})();
