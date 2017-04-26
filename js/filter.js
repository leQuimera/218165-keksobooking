'use strict';

// Модуль работы с фильтрами.  Показывает на карте пины, подходящие случаю

window.filters = function () {

  var listAd = [];
  var filteredArray = [];

  var PRICE_MID_MIN = 10000;
  var PRICE_MID_MAX = 50000;

  var mapFilters = document.querySelector('.tokyo__filters');
  var houseType = mapFilters.querySelector('#housing_type');
  var housePrice = mapFilters.querySelector('#housing_price');
  var houseRooms = mapFilters.querySelector('#housing_room-number');
  var houseGuests = mapFilters.querySelector('#housing_guests-number');
  var houseFeatures = mapFilters.querySelector('#housing_features');
  var houseFeaturesList = houseFeatures.querySelectorAll('input[name=feature]');


  // Получаем данные из фильтра
  var getValueFromFilter = function (elem) {
    return elem.options[elem.selectedIndex].value;
  };

  // Получаем уже отфильтрованные данные при помощи нужной функции
  var getFilteredData = function (curArray, field, fieldValue, callback) {
    return curArray.filter(function (it) {
      return callback(it, field, fieldValue);
    });
  };

  // Фильтр, если значения полей идентичны
  var isEqual = function (it, field, fieldValue) {
    if (field === 'guests' || field === 'rooms') {
      return it.offer[field] === +fieldValue;
    } else {
      return it.offer[field] === fieldValue;
    }
  };

  // Если чекбокс выбран
  var isChecked = function (it, field, fieldValue) {
    return it.offer[field].indexOf(fieldValue) !== -1;
  };

  // Перебор по диапазону цен
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

  // Пробег по чекбоксам
  var isSuitableValue = function (it, field, fieldValue) {
    if (fieldValue === 'any') {
      return true;
    } else {
      return isEqual(it, field, fieldValue);
    }
  };

  var resetPins = function () {
    var currentPinArray = listAd.slice();
    filteredArray = getFilteredData(currentPinArray, 'type', getValueFromFilter(houseType), isSuitableValue);
    filteredArray = getFilteredData(filteredArray, 'price', getValueFromFilter(housePrice), isSuitablePrice);
    filteredArray = getFilteredData(filteredArray, 'rooms', getValueFromFilter(houseRooms), isSuitableValue);
    filteredArray = getFilteredData(filteredArray, 'guests', getValueFromFilter(houseGuests), isSuitableValue);
    filteredArray = [].reduce.call(houseFeaturesList, function (previousValue, currentItem) {
      if (currentItem.checked) {
        var value = currentItem.getAttribute('value');
        return getFilteredData(previousValue, 'features', value, isChecked);
      } else {
        return previousValue;
      }
    }, filteredArray);

    window.pinSet(filteredArray);
  };

  return function (listOfAdverts) {
    listAd = listOfAdverts;
    houseType.addEventListener('change', function (evt) {
      window.debounce(resetPins);
    });

    housePrice.addEventListener('change', function (evt) {
      window.debounce(resetPins);
    });

    houseRooms.addEventListener('change', function (evt) {
      window.debounce(resetPins);
    });

    houseGuests.addEventListener('change', function (evt) {
      window.debounce(resetPins);
    });

    houseFeatures.addEventListener('change', function (evt) {
      window.debounce(resetPins);
    });
  };
}();
