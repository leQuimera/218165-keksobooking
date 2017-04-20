'use strict';

var OFFER_TYPE_NAMES = {
  'flat': 'квартира',
  'house': 'дом',
  'bungalo': 'бунгало'
};
var pinsMap = document.querySelector('.tokyo__pin-map');
var pinActive = document.querySelector('.pin--active');
var dialogWindow = document.querySelector('.dialog');
var dialogClose = dialogWindow.querySelector('.dialog__close');

// Закрытие окна с абьявлением
var onCloseDialog = function (evt) {
  if (window.eventCheck.isEnterPressed(evt) || window.eventCheck.isClicked(evt)) {
    if (pinActive) {
      pinActive.classList.remove('pin--active');
    }
    dialogWindow.style.display = 'none';
    document.removeEventListener('keydown', onCloseDialogEsc);
  }
};

// Закрытие окна диалога при нажатии esc
var onCloseDialogEsc = function (evt) {
  if (window.eventCheck.isEscapePressed(evt)) {
    if (pinActive) {
      pinActive.classList.remove('pin--active');
      pinActive = '';
    }
    dialogWindow.style.display = 'none';
  }
};

// Вывод данных о квартире на карту
var createDialog = function (advertItem) {
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var lodgeItem = lodgeTemplate.cloneNode(true);
  var lodgeTitle = lodgeItem.querySelector('.lodge__title');
  var lodgeAddress = lodgeItem.querySelector('.lodge__address');
  var lodgePrice = lodgeItem.querySelector('.lodge__price');
  var lodgeType = lodgeItem.querySelector('.lodge__type');
  var lodgeRooms = lodgeItem.querySelector('.lodge__rooms-and-guests');
  var lodgeCheckin = lodgeItem.querySelector('.lodge__checkin-time');
  var dialog = document.querySelector('.dialog');
  var dialogPanel = document.querySelector('.dialog__panel');

  lodgeTitle.textContent = advertItem.offer.title;
  lodgeAddress.textContent = advertItem.offer.address;
  lodgePrice.innerHTML = advertItem.offer.price + ' ' + '&#8381;/ночь';
  lodgeType.textContent = OFFER_TYPE_NAMES[advertItem.offer.type];
  lodgeRooms.textContent = 'Для ' + advertItem.offer.guests + ' гостей в ' + advertItem.offer.rooms + ' комнатах';
  lodgeCheckin.textContent = 'Заезд после' + advertItem.offer.checkin + ', выезд до ' + advertItem.offer.checkout;

  for (var i = 0; i < advertItem.offer.features.length; i++) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + advertItem.offer.features[i];
    lodgeItem.querySelector('.lodge__features').appendChild(span);
  }

  lodgeItem.querySelector('.lodge__description').textContent = advertItem.offer.description;
  document.querySelector('.dialog__title img').src = advertItem.author.avatar;

  dialog.replaceChild(lodgeItem, dialogPanel);
  document.addEventListener('keydown', onCloseDialogEsc);
};

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
    createDialog(listOfAdverts[pinNumber]);
    dialogWindow.style.display = 'block';
  }
};

pinsMap.addEventListener('click', onShowDialog);
dialogClose.addEventListener('click', onCloseDialog);
pinsMap.addEventListener('keydown', onShowDialog);
dialogClose.addEventListener('keydown', onCloseDialog);

// Работа с полями
var workWithForm = function () {
  var formInner = document.querySelector('.notice__form');
  var timeCheckIn = formInner.querySelector('#time');
  var timeCheckOut = formInner.querySelector('#timeout');
  var advertType = formInner.querySelector('#type');
  var advertPrice = formInner.querySelector('#price');
  var roomNumber = formInner.querySelector('#room_number');
  var roomCapacity = formInner.querySelector('#capacity');
  var title = formInner.querySelector('#title');
  var submitButton = formInner.querySelector('.form__submit');
  var address = formInner.querySelector('#address');

  var TITLE_MAXLENGTH = 100;
  var TITLE_MINLENGTH = 30;
  var PRICE_MAX = 1000000;
  var PRICE_MIN = 1000;
  var PRICE_HUT_MIN = 0;
  var PRICE_HUT_MAX = 1000;
  var PRICE_FLAT_MIN = 1001;
  var PRICE_FLAT_MAX = 10000;
  var PRICE_PALACE_MIN = 10001;
  var PRICE_PALACE_MAX = 1000000;

  advertPrice.setAttribute('required', 'required');
  advertPrice.setAttribute('min', PRICE_MIN);
  advertPrice.setAttribute('max', PRICE_MAX);
  title.setAttribute('required', 'required');
  title.setAttribute('minLength', TITLE_MINLENGTH);
  title.setAttribute('maxLength', TITLE_MAXLENGTH);
  roomCapacity.value = 1;

  var clearForm = function () {
    var description = formInner.querySelector('#description');
    var formFeatures = document.getElementById('features');
    var tagsInput = formFeatures.getElementsByTagName('input');

    title.value = '';
    advertType.value = 'flat';
    advertPrice.value = '';
    advertPrice.max = PRICE_MAX;
    advertPrice.min = PRICE_MIN;
    roomNumber.value = 1;
    roomCapacity.value = 1;
    description.value = '';
    address.value = '';
    timeCheckIn.value = 12;
    timeCheckOut.value = 12;
    for (var i = 0; i < tagsInput.length; i++) {
      tagsInput[i].checked = false;
    }
  };

  // При изменении «времени заезда» и «время выезда» автоматически выставляется точно таким же — например, если время заезда указано «после 14», то время выезда будет равно «до 14»
  var onTimeInToTimeoutChange = function (evt) {
    if (evt.srcElement.id === 'time') {
      timeCheckOut.value = timeCheckIn.value;
    } else if (evt.srcElement.id === 'timeout') {
      timeCheckIn.value = timeCheckOut.value;
    }
  };

  //  Изменение стоимости предложения взависимости от типа
  var onAdvertTypeChange = function () {
    switch (advertType.value) {
      case 'hut':
        advertPrice.max = PRICE_HUT_MAX;
        advertPrice.min = PRICE_HUT_MIN;
        break;
      case 'flat':
        advertPrice.max = PRICE_FLAT_MAX;
        advertPrice.min = PRICE_FLAT_MIN;
        break;
      case 'palace':
        advertPrice.max = PRICE_PALACE_MAX;
        advertPrice.min = PRICE_PALACE_MIN;
        break;
    }
  };

  var onPriceChange = function () {
    if (advertPrice.value <= PRICE_HUT_MAX) {
      advertType.value = 'hut';
    } else if (advertPrice.value <= PRICE_FLAT_MAX && advertPrice.value > PRICE_FLAT_MIN) {
      advertType.value = 'flat';
    } else if (advertPrice.value <= PRICE_PALACE_MAX && advertPrice.value > PRICE_PALACE_MIN) {
      advertType.value = 'palace';
    } else {
      advertPrice.style.border = '1px solid #d9d9d3';
    }
  };

  // Установление взаимосвязей между количеством комнат и вместимостью
  var onRoomAndCapacityChange = function (evt) {
    if (evt.srcElement.id === 'room_number') {
      roomCapacity.value = (roomNumber.value === '1') ? '1' : '3';
    } else if (evt.srcElement.id === 'capacity') {
      roomNumber.value = (roomCapacity.value === '1') ? '1' : '2';
    }
  };

  var checkFieldValid = function (checkedField) {
    if (checkedField.validity.valid) {
      checkedField.style.border = '1px solid #d9d9d3';
      return true;
    } else {
      checkedField.style.boxShadow = 'none';
      checkedField.style.border = '2px solid red';
      return false;
    }
  };

  var onSubmitButtonClick = function (evt) {
    var validTitle = checkFieldValid(title);
    var validPrice = checkFieldValid(advertPrice);
    if (validTitle && validPrice) {
      evt.preventDefault();
      clearForm();
    }
  };

  timeCheckIn.addEventListener('change', onTimeInToTimeoutChange);
  timeCheckOut.addEventListener('change', onTimeInToTimeoutChange);
  advertType.addEventListener('change', onAdvertTypeChange);
  advertPrice.addEventListener('change', onPriceChange);
  roomNumber.addEventListener('change', onRoomAndCapacityChange);
  roomCapacity.addEventListener('change', onRoomAndCapacityChange);
  submitButton.addEventListener('click', onSubmitButtonClick);

};

workWithForm();
