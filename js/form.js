'use strict';

window.formSet = (function () {
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

})();
