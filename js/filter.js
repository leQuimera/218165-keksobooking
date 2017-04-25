'use strict';

// Модуль работы с фильтрами.  Показывает на карте пины, подходящие случаю

window.filters = function () {

  var offerType;
  var offerPriceMin;
  var offerPriceMax;
  var offerRooms;
  var offerGuests;
  var offerFeatures;

  var PRICE_HUT_MIN = 0;
  var PRICE_HUT_MAX = 1000;
  var PRICE_FLAT_MIN = 1000;
  var PRICE_FLAT_MAX = 10000;
  var PRICE_PALACE_MIN = 10000;
  var PRICE_PALACE_MAX = 1000000;

  var mapFilters = document.querySelector('.tokyo__filters');
  var houseType = mapFilters.querySelector('#housing_type');
  var housePrice = mapFilters.querySelector('#housing_price');
  var houseRooms = mapFilters.querySelector('#housing_room-number');
  var houseGuests = mapFilters.querySelector('#housing_guests-number');
  var houseFeatures = mapFilters.querySelector('#housing_features');
  var houseFeaturesList = houseFeatures.querySelectorAll('input[name=feature]');

  var resetPins = function (listOfAdverts) {
    var currentPinArray = listOfAdverts.slice();

    if (offerType) {
      if (offerType !== 'any') {
        currentPinArray = currentPinArray.filter(function (it) {
          return it.offer.type === offerType;
        });
      }
    }
    if (offerPriceMax) {
      currentPinArray = currentPinArray.filter(function (it) {
        return (it.offer.price >= offerPriceMin) && (it.offer.price <= offerPriceMax);
      });
    }
    if (offerRooms) {
      if (offerRooms !== 'any') {
        currentPinArray = currentPinArray.filter(function (it) {
          return it.offer.rooms === +offerRooms;
        });
      }
    }
    if (offerGuests) {
      if (offerGuests !== 'any') {
        currentPinArray = currentPinArray.filter(function (it) {
          return it.offer.guests === +offerGuests;
        });
      }
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
    houseType.addEventListener('change', function (evt) {
      offerType = evt.currentTarget.value;
      window.debounce(resetPins, listOfAdverts);
    });

    housePrice.addEventListener('change', function (evt) {
      var offerPrice = evt.currentTarget.value;
      switch (offerPrice) {
        case 'bungalo':
          offerPriceMax = PRICE_HUT_MAX;
          offerPriceMin = PRICE_HUT_MIN;
          break;
        case 'flat':
          offerPriceMax = PRICE_FLAT_MAX;
          offerPriceMin = PRICE_FLAT_MIN;
          break;
        default:
          offerPriceMax = PRICE_PALACE_MAX;
          offerPriceMin = PRICE_PALACE_MIN;
          break;
      }
      window.debounce(resetPins, listOfAdverts);
    });

    houseRooms.addEventListener('change', function (evt) {
      offerRooms = evt.currentTarget.value;
      window.debounce(resetPins, listOfAdverts);
    });

    houseGuests.addEventListener('change', function (evt) {
      offerGuests = evt.currentTarget.value;
      window.debounce(resetPins, listOfAdverts);
    });

    houseFeatures.addEventListener('change', function (evt) {
      offerFeatures = [].filter.call(houseFeaturesList, function (it) {
        return it.checked === true;
      })
      .map(function (it) {
        return it.value;
      });
      window.debounce(resetPins, listOfAdverts);
    });
  };
}();
