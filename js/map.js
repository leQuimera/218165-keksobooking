'use strict';

var ADDRESS_COUNT = 8;
var USER_ID_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TIMES_CHECK_IN = ['12:00', '13:00', '14:00'];
var TIMES_CHECK_OUT = ['12:00', '13:00', '14:00'];
var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_TYPE_NAMES = {
  'flat': 'квартира',
  'house': 'дом',
  'bungalo': 'бунгало'
};

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
  var removed = array.splice(getRandomInt(0, array.length - 1), 1);
  return removed[0];
};

// Генерация описания квартирных удобств
var createFeatures = function () {
  var someFeatures = OFFER_FEATURES.slice(0);
  var positions = [];
  var rand = getRandomInt(0, OFFER_FEATURES.length - 1);
  for (var i = 0; i <= rand; i++) {
    positions[i] = getRandomUniqueItem(someFeatures);
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

  return pin;
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
};

// Нанесение пинов на карту
var renderPins = function (adverts) {
  var pin = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(createPin(adverts[i]));
  }
  pin.appendChild(fragment);
};

var listOfAdverts = createAdvertsList(ADDRESS_COUNT);
renderPins(listOfAdverts);
createDialog(listOfAdverts[0]);
