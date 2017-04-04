'use strict';

var posterss = [];                                  // объявления
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
var offerFeature = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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
// Заполнение объявления
var advertCreate = function (advertNumber) {
  var someFeature = offerFeature.slice();
  var counter = randomize(0, offerFeature.length - 1);
  for (var i = 0; i < counter; i++) {
    feature[i] = someFeature[i];
  }
};

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
    'features': feature,
    'description': '',
    'photos': []
  },

  'location': {
    'x': randomize(300, 900),
    'y': randomize(100, 500)
  }
};

