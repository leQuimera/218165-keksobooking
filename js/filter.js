'use strict';

// Модуль работы с фильтрами.  Показывает на карте пины, подходящие случаю

window.filters = function () {
  var offerType = null;
  var offerPrice = null;
  var offerRooms = null;
  var offerGuests = null;
  var offerFeatures = null;
  var listAd = [];
  var PRICE_MID_MIN = 10000;
  var PRICE_MID_MAX = 50000;
  var mapFilters = document.querySelector('.tokyo__filters');
  var houseType = mapFilters.querySelector('#housing_type');
  var housePrice = mapFilters.querySelector('#housing_price');
  var houseRooms = mapFilters.querySelector('#housing_room-number');
  var houseGuests = mapFilters.querySelector('#housing_guests-number');
  var houseFeatures = mapFilters.querySelector('#housing_features');
  var houseFeaturesList = houseFeatures.querySelectorAll('input[name=feature]');

  // Step1 Получаем уже отфильтрованные данные при помощи нужной функции
  var getFilteredData = function (curArray, field, fieldValue, callback) {
    return curArray.filter(function (it) {
      return callback(it, field, fieldValue);
    });
  };
  // Step3 Если значение не любое, то сравниваем результат
  var isEqual = function (it, field, fieldValue) {
    if (field === 'guests' || field === 'rooms') {
      return it.offer[field] === parseInt(fieldValue, 10);
    } else {
      return it.offer[field] === fieldValue;
    }
  };
  // Step2  Перебор по диапазону цен
  var isSuitablePrice = function (it, field, fieldValue) {
    switch (fieldValue) {
      case 'middle':
        return it.offer[field] > PRICE_MID_MIN && it.offer[field] <= PRICE_MID_MAX;
      case 'low':
        return it.offer[field] <= PRICE_MID_MIN;
      case 'high':
        return it.offer[field] > PRICE_MID_MAX;
      default:
        return false;
    }
  };
  // Step2 отсеивает те, где есть значение "любое"
  var isSuitableValue = function (it, field, fieldValue) {
    if (fieldValue === 'any') {
      return true;
    } else {
      return isEqual(it, field, fieldValue);
    }
  };
  var resetPins = function () {
    var currentPinArray = listAd.slice();
    if (offerType !== null) {
      currentPinArray = getFilteredData(currentPinArray, 'type', offerType, isSuitableValue);
    }
    if (offerPrice !== null) {
      currentPinArray = getFilteredData(currentPinArray, 'price', offerPrice, isSuitablePrice);
    }
    if (offerRooms !== null) {
      currentPinArray = getFilteredData(currentPinArray, 'rooms', offerRooms, isSuitableValue);
    }
    if (offerGuests) {
      currentPinArray = getFilteredData(currentPinArray, 'guests', offerGuests, isSuitableValue);
    }
    if (offerFeatures && offerFeatures.length > 0) {
      offerFeatures.forEach(function (item, index, array) {
        currentPinArray = currentPinArray.filter(function (it) {
          return it.offer.features.indexOf(item) !== -1;
        });
      });
    }
    window.pinSet(currentPinArray);
  };

  return function (listOfAdverts) {
    listAd = listOfAdverts;
    houseType.addEventListener('change', function (evt) {
      offerType = evt.currentTarget.value;
      window.debounce(resetPins);
    });

    housePrice.addEventListener('change', function (evt) {
      offerPrice = evt.currentTarget.value;
      window.debounce(resetPins);
    });

    houseRooms.addEventListener('change', function (evt) {
      offerRooms = evt.currentTarget.value;
      window.debounce(resetPins);
    });

    houseGuests.addEventListener('change', function (evt) {
      offerGuests = evt.currentTarget.value;
      window.debounce(resetPins);
    });

    houseFeatures.addEventListener('change', function (evt) {
      offerFeatures = [].filter.call(houseFeaturesList, function (it) {
        return it.checked === true;
      })
      .map(function (it) {
        return it.value;
      });
      window.debounce(resetPins);
    });
  };
}();
