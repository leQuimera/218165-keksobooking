'use strict';

var feature = [];                                   // Собрка фишек для квартиры !!!!! Перенести в функцию генерации объявы
var adresCount = 8;
var userIdNumbers = ['01', '02', '03', '04', '05', '06', '07', '08'];
var timeSet = ['12:00', '13:00', '14:00'];
var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var offerType = ['flat', 'house', 'bungalo'];
var offerTypeName = {
  'flat': 'квартира',
  'house': 'дом',
  'bungalo': 'бунгало'
};
var offerFeature = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var lodgeTemplate = document.querySelector('#lodge-template').content; // Блок для объявлений
var dialog = document.querySelector('.dialog');              //  Где лежит по коду
var dialogPanel = document.querySelector('.dialog__panel');  // Тело сообщения

// Возврат случайного значения
var randomize = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// Возврат случайного эллемента из массива
var getRandomArrayItem = function (array) {
  return array[randomize(0, array.length - 1)];
};
// Возврат уникального эллемента из массива
var getRandomUniqueItem = function (array) {
  var removed = array.splice(randomize(0, array.length - 1), 1);
  return removed;
};
// Генерация описания квартирных удобств
var createFeatures = function (advertNumber) {
  var someFeature = offerFeature.slice();
  // var counter = randomize(0, offerFeature.length - 1);
  for (var i = 0; i < randomize(0, offerFeature.length - 1); i++) {
    feature[i] = someFeature[i];
  }
  return someFeature;
};

// Создание массива объявлений
var createAdvert = function (advertNumber) {
  var poster = {
    'author': {
      'avatar': 'img/avatars/user' + getRandomUniqueItem(userIdNumbers) + '.png'
    },

    'offer': {
      'title': getRandomUniqueItem(titles),
      'address': randomize(300, 900) + ', ' + randomize(100, 500),
      'price': randomize(1000, 1000000),
      'type': getRandomArrayItem(offerType),
      'rooms': randomize(1, 5),
      'guests': randomize(1, 15),
      'checkin': getRandomArrayItem(timeSet),
      'checkout': getRandomArrayItem(timeSet),
      'features': createFeatures(advertNumber),
      'description': '',
      'photos': []
    },

    'location': {
      'x': randomize(300, 900),
      'y': randomize(100, 500)
    }
  };
  return poster;
};

// Генерация списка предложений
var createAdvertsList = function (avdertsCount) {
  var advertsList = [];

  for (var i = 0; i < avdertsCount; i++) {
    advertsList.push(createAdvert(i));
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

// Генерация объявления
var createAdvertPost = function (advertItem) {
  var lodgeItem = lodgeTemplate.cloneNode(true);
  var lodgeTitle = lodgeItem.querySelector('.lodge__title');
  var lodgeAddress = lodgeItem.querySelector('.lodge__address');
  var lodgePrice = lodgeItem.querySelector('.lodge__price');
  var lodgeType = lodgeItem.querySelector('.lodge__type');
  var lodgeRooms = lodgeItem.querySelector('.lodge__rooms-and-guests');
  var lodgeCheckin = lodgeItem.querySelector('.lodge__checkin-time');

  lodgeTitle.textContent = advertItem.offer.title;
  lodgeAddress.textContent = advertItem.offer.address;
  lodgePrice.innerHTML = advertItem.offer.price + ' ' + '&#8381;/ночь';
  lodgeType.textContent = offerTypeName[advertItem.offer.type];
  lodgeRooms.textContent = 'Для ' + advertItem.offer.guests + ' гостей в ' + advertItem.offer.rooms + ' комнатах';
  lodgeCheckin.textContent = 'Заезд после' + advertItem.offer.checkin + ', выезд до ' + advertItem.offer.checkout;

  for (var i = 0; i < advertItem.offer.features.length; i++) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + advertItem.offer.features[i];
    lodgeItem.querySelector('.lodge__features').appendChild(span);
  }

  lodgeItem.querySelector('.lodge__description').textContent = advertItem.offer.description;
  document.querySelector('.dialog__title img').src = advertItem.author.avatar;

  return lodgeItem;
};

// Вывод данных о квартире на карту
var createDialog = function (lodgeItem) {
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

var listOfAdverts = createAdvertsList(adresCount);
renderPins(listOfAdverts);
createDialog(createAdvertPost(listOfAdverts[listOfAdverts.length - 1]));
