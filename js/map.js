'use strict';


var pinsMap = document.querySelector('.tokyo__pin-map');
var pinActive = document.querySelector('.pin--active');
var dialogWindow = document.querySelector('.dialog');
var dialogClose = dialogWindow.querySelector('.dialog__close');

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


// Нанесение пинов на карту
var renderPins = function (adverts) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(createPin(adverts[i]));
  }
  pinsMap.appendChild(fragment);
  dialogWindow.style.display = 'none';
};

// Объявление и все пины созданы,  нанесены  на карту
var listOfAdverts = window.dataSet();
renderPins(listOfAdverts);

// Поиск номера нужного объявления по данным фотографии
var searchAdvert = function (currentSrc) {
  for (var i = 0; i < listOfAdverts.length; i++) {
    if (listOfAdverts[i].author.avatar === currentSrc) {
      break;
    }
  }
  return i;
};

// Показать объявление, если на пин кликнули или нажали по enter
var onShowDialog = function (evt) {
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
    var pinNumber = searchAdvert(currentSrc);
    window.cartSet.createDialog(listOfAdverts[pinNumber]);
    dialogWindow.style.display = 'block';
  }
};

pinsMap.addEventListener('click', onShowDialog);
dialogClose.addEventListener('click', window.cartSet.onCloseDialog);
pinsMap.addEventListener('keydown', onShowDialog);
dialogClose.addEventListener('keydown', window.cartSet.onCloseDialog);

// Работа с полями
