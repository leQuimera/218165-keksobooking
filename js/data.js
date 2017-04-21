'use strict';


// data.js — модуль, который создает данные

window.dataSet = (function () {
  var USER_ID_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];
  var TIMES_CHECK_IN = ['12:00', '13:00', '14:00'];
  var TIMES_CHECK_OUT = ['12:00', '13:00', '14:00'];
  var ADDRESS_COUNT = 8;

  // Генерация описания квартирных удобств
  var createFeatures = function () {
    var someFeatures = OFFER_FEATURES.slice(0);
    var positions = [];
    var rand = window.utilsSet.getRandomInt(0, OFFER_FEATURES.length - 1);
    for (var i = 0; i <= rand; i++) {
      positions[i] = window.utilsSet.getRandomUniqueItem(someFeatures)[0];
    }
    return positions;
  };

  // Создание объявления
  var createAdvert = function () {
    var locationX = window.utilsSet.getRandomInt(300, 900);
    var locationY = window.utilsSet.getRandomInt(100, 500);

    return {
      'author': {
        'avatar': 'img/avatars/user' + window.utilsSet.getRandomUniqueItem(USER_ID_NUMBERS) + '.png'
      },

      'offer': {
        'title': window.utilsSet.getRandomUniqueItem(TITLES),
        'address': locationX + ', ' + locationY,
        'price': window.utilsSet.getRandomInt(1000, 1000000),
        'type': window.utilsSet.getRandomArrayItem(OFFER_TYPES),
        'rooms': window.utilsSet.getRandomInt(1, 5),
        'guests': window.utilsSet.getRandomInt(1, 15),
        'checkin': window.utilsSet.getRandomArrayItem(TIMES_CHECK_IN),
        'checkout': window.utilsSet.getRandomArrayItem(TIMES_CHECK_OUT),
        'features': createFeatures(),
        'description': '',
        'photos': []
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  };

  return function () {
    var advertsList = [];
    for (var i = 0; i < ADDRESS_COUNT; i++) {
      advertsList.push(createAdvert());
    }
    return advertsList;
  };
})();
