'use strict';

var ADDRESS_COUNT = 8;
var USER_ID_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TIMES_CHECK_IN = ['12:00', '13:00', '14:00'];
var TIMES_CHECK_OUT = ['12:00', '13:00', '14:00'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_TYPE_NAMES = {
  'flat': 'квартира',
  'house': 'дом',
  'bungalo': 'бунгало'
};
var ESCAPE_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;
var pinsMap = document.querySelector('.tokyo__pin-map');
var pinActive = document.querySelector('.pin--active');
var dialogWindow = document.querySelector('.dialog');
var dialogClose = dialogWindow.querySelector('.dialog__close');

// Возврат случайного значения
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Возврат случайного эллемента из массива
var getRandomArrayItem = function (array) {
  return array[getRandomInt(0, array.length - 1)];
};

// Возврат уникального эллемента из массива
var getRandomUniqueItem = function (array) {
  return array.splice(getRandomInt(0, array.length - 1), 1);
};

// Генерация описания квартирных удобств
var createFeatures = function () {
  var someFeatures = OFFER_FEATURES.slice(0);
  var positions = [];
  var rand = getRandomInt(0, OFFER_FEATURES.length - 1);
  for (var i = 0; i <= rand; i++) {
    positions[i] = getRandomUniqueItem(someFeatures)[0];
  }
  return positions;
};

// Создание объявления
var createAdvert = function () {
  var locationX = getRandomInt(300, 900);
  var locationY = getRandomInt(100, 500);
  var poster = {
    'author': {
      'avatar': 'img/avatars/user' + getRandomUniqueItem(USER_ID_NUMBERS) + '.png'
    },

    'offer': {
      'title': getRandomUniqueItem(TITLES),
      'address': locationX + ', ' + locationY,
      'price': getRandomInt(1000, 1000000),
      'type': getRandomArrayItem(OFFER_TYPES),
      'rooms': getRandomInt(1, 5),
      'guests': getRandomInt(1, 15),
      'checkin': getRandomArrayItem(TIMES_CHECK_IN),
      'checkout': getRandomArrayItem(TIMES_CHECK_OUT),
      'features': createFeatures(),
      'description': '',
      'photos': []
    },

    'location': {
      'x': locationX,
      'y': locationY
    }
  };
  return poster;
};

// Генерация списка предложений
var createAdvertsList = function (avdertsCount) {
  var advertsList = [];
  for (var i = 0; i < avdertsCount; i++) {
    advertsList.push(createAdvert());
  }
  dialogWindow.style.display = 'none';
  return advertsList;
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
/* var eventCheck = {
  enterCode: 13,
  escCode: 27,
  cliced: 'click',
  isEnterPresses: function (evt) {
    return evt && evt.keyCode === this.enterCode;
  },
  isEscapePressed: function (evt) {
    return evt && evt.keyCode === this.escCode;
  },
  isClicked = function (evt) {
   return evt.type = this.clicked;
  }
}

То есть, в функцию передается событие evt
Например, onSelectTime. Тогда будет выглядеть как
onCloseDialog(evt) {
  if (evt.isEnterPressed || evt.isClicked) {
    ...
  }
};
Но оно так не работает
*/

// Событие есть и нажат esc
var isEscapePressed = function (evt) {
  return evt && evt.keyCode === ESCAPE_KEY_CODE;
};
// Событие есть и нажат enter
var isEnterPressed = function (evt) {
  return evt && evt.keyCode === ENTER_KEY_CODE;
};
// По клику мышки
var isClicked = function (evt) {
  return evt.type === 'click';
};

// Закрытие окна с абьявлением
var onCloseDialog = function (evt) {
  if (isEnterPressed(evt) || isClicked(evt)) {
    if (pinActive) {
      pinActive.classList.remove('pin--active');
    }
    dialogWindow.style.display = 'none';
    document.removeEventListener('keydown', onCloseDialogEsc);
  }
};

// Закрытие окна диалога при нажатии esc
var onCloseDialogEsc = function (evt) {
  if (isEscapePressed(evt)) {
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

// Нанесение пинов на карту
var renderPins = function (adverts) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(createPin(adverts[i]));
  }
  pinsMap.appendChild(fragment);
};

// Объявление и все пины созданы,  нанесены  на карту
var listOfAdverts = createAdvertsList(ADDRESS_COUNT);
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
  if (isEnterPressed(evt) || isClicked(evt)) {
   // Создание блока переменных в зависимости от того, куда ткнул пользователь мышкой
    var currentPin = '';
    var currentSrc = '';
    var currentTarget = evt.target;
    if (evt.target.className === 'rounded') {
      currentPin = currentTarget.offsetParent;
      currentSrc = currentTarget.getAttribute('src');
    } else if (currentTarget.className === 'pin' || currentTarget.className === 'pin pin--active') {
      currentPin = currentTarget;
      currentSrc = currentTarget.children[0].getAttribute('src');
    }
    /* Если до этого у другого элемента существовал класс pin--active,
    * то у этого элемента класс нужно убрать
    */
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
  var typeOfAdvert = formInner.querySelector('#type');
  var priceForAdvert = formInner.querySelector('#price');
  var roomNumber = formInner.querySelector('#room_number');
  var capacity = formInner.querySelector('#capacity');
  var title = formInner.querySelector('#title');
  var submitButton = formInner.querySelector('.form__submit');
  var address = formInner.querySelector('#address');

  /* Цена за ночь
  *  Обязательное поле
  * Числовое поле
  * Минимальное значение — 1000 по умолчанию
  * Максимальное значение — 1000000
  */
  priceForAdvert.setAttribute('required', 'required');
  priceForAdvert.setAttribute('min', 1000);
  priceForAdvert.setAttribute('max', 1000000);
  /* Заголовок объявления
  * Обязательное полей
  * Минимальная длина — 30 символов
  * Макcимальная длина — 100 символов
  */
  title.setAttribute('required', 'required');
  title.setAttribute('minLength', 30);
  title.setAttribute('maxLength', 100);

  var clearForm = function () {
    var description = formInner.querySelector('#description');
    var formFeatures = document.getElementById('features');
    var tagsInput = formFeatures.getElementsByTagName('input');

    title.value = '';
    typeOfAdvert.value = 'flat';
    priceForAdvert.value = '';
    roomNumber.value = '1';
    capacity.value = '3';
    description.value = '';
    address.value = '';
    timeCheckIn.value = '12';
    timeCheckOut.value = '12';
    for (var i = 0; i < tagsInput.length; i++) {
      tagsInput[i].checked = false;
    }
  };

// При изменении «времени заезда» и «время выезда» автоматически выставляется точно таким же — например, если время заезда указано «после 14», то время выезда будет равно «до 14»
  var onSelectTime = function (evt) {
    if (evt.srcElement.id === 'time') {
      timeCheckOut.value = timeCheckIn.value;
    } else if (evt.srcElement.id === 'timeout') {
      timeCheckIn.value = timeCheckOut.value;
    }
  };

  //  Изменение стоимости предложения взависимости от типа
  var onChangeAdvertPrice = function () {
    switch (typeOfAdvert.value) {
      case 'flat':
        priceForAdvert.max = 1000;
        priceForAdvert.min = 0;
        break;
      case 'hut':
        priceForAdvert.max = 10000;
        priceForAdvert.min = 1001;
        break;
      case 'palace':
        priceForAdvert.max = 1000000;
        priceForAdvert.min = 10001;
        break;
    }
  };
  var onCheangePriceAdvert = function () {
    if (priceForAdvert.value <= 1000) {
      typeOfAdvert.value = 'flat';
    } else if (priceForAdvert.value <= 10000 && priceForAdvert.value > 1000) {
      typeOfAdvert.value = 'hut';
    } else if (priceForAdvert.value <= 1000000 && priceForAdvert.value > 10000) {
      typeOfAdvert.value = 'palace';
    } else {
      priceForAdvert.style.border = '1px solid #d9d9d3';
    }
  };

  // Количество комнат связано с количеством гостей: 2 или 100 комнат — «для 3 гостей»; 1 комната — «не для гостей»
  var onSelectRoom = function (evt) {
    if (evt.srcElement.id === 'room_number') {
      capacity.value = (roomNumber.value === '1') ? 1 : 3;
    } else if (evt.srcElement.id === 'capacity') {
      roomNumber.value = (capacity.value === '1') ? 1 : 2;
    }
  };

  var checkFieldValid = function (checkedField) {
    if (!checkedField.validity.valid) {
      checkedField.style.boxShadow = 'none';
      checkedField.style.border = '2px solid red';
      return false;
    } else {
      checkedField.style.border = '1px solid #d9d9d3';
      return true;
    }
  };

  var formValidation = function (evt) {
    evt.preventDefault();
    if (isClicked(evt)) {
      var validTitle = checkFieldValid(title);
      var validPrice = checkFieldValid(priceForAdvert);
      if (validPrice && validTitle) {
        clearForm();
      }
    }
  };

  timeCheckIn.addEventListener('change', onSelectTime);
  timeCheckOut.addEventListener('change', onSelectTime);
  typeOfAdvert.addEventListener('change', onChangeAdvertPrice);
  priceForAdvert.addEventListener('change', onCheangePriceAdvert);
  roomNumber.addEventListener('change', onSelectRoom);
  capacity.addEventListener('change', onSelectRoom);
  submitButton.addEventListener('click', formValidation);

};

workWithForm();

/* Проверка правильности введенных данных

При отправке формы нужно проверить правильно ли заполнены поля и если какие-то поля заполнены неверно, то нужно выделить неверные поля красной рамкой
После отправки формы все значения должны сбрасываться на те, что были по-умолчанию */
