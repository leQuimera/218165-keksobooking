'use strict';

// form.js — модуль, который работает с формой объявления
(function () {
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
  var PRICE_MIN = 0;
  var PRICE_FLAT_MIN = 1000;
  var PRICE_PALACE_MIN = 10000;
  var ADVERT_TYPE = 'flat';
  var ROOM_CAPACITY = 1;
  var START_TIME = 12;
  advertPrice.setAttribute('required', 'required');
  advertPrice.setAttribute('min', PRICE_FLAT_MIN);
  advertPrice.setAttribute('max', PRICE_MAX);
  title.setAttribute('required', 'required');
  title.setAttribute('minLength', TITLE_MINLENGTH);
  title.setAttribute('maxLength', TITLE_MAXLENGTH);
  roomCapacity.value = 1;
  address.readOnly = true;

  var resetForm = function () {
    var description = formInner.querySelector('#description');
    var formFeatures = document.getElementById('features');
    var tagsInput = formFeatures.getElementsByTagName('input');
    title.value = '';
    advertType.value = ADVERT_TYPE;
    advertPrice.value = '';
    advertPrice.max = PRICE_MAX;
    advertPrice.min = PRICE_MIN;
    roomNumber.value = ROOM_CAPACITY;
    roomCapacity.value = ROOM_CAPACITY;
    description.value = '';
    address.value = '';
    timeCheckIn.value = START_TIME;
    timeCheckOut.value = START_TIME;
    for (var i = 0; i < tagsInput.length; i++) {
      tagsInput[i].checked = false;
    }
  };

  var timeInToTimeoutChange = function (fieldFirst, valueSecond) {
    fieldFirst.value = valueSecond;
  };

  var advertTypeChange = function (fieldFirst, valueSecond) {
    switch (valueSecond) {
      case 'hut':
        fieldFirst.min = PRICE_MIN;
        break;
      case 'flat':
        fieldFirst.min = PRICE_FLAT_MIN;
        break;
      case 'palace':
        fieldFirst.min = PRICE_PALACE_MIN;
        break;
    }
  };

  var roomAndCapacityChange = function (fieldFirst, valueSecond) {
    fieldFirst.value = (valueSecond === '1') ? '1' : '2';
  };

  var checkFieldValid = function (checkedField) {
    checkedField.style.border = (checkedField.validity.valid) ? '1px solid #d9d9d3' : '2px solid red';
    return checkedField.validity.valid;
  };

  var onSubmitButtonClick = function (evt) {
    var validTitle = checkFieldValid(title);
    var validPrice = checkFieldValid(advertPrice);
    if (validTitle && validPrice) {
      evt.preventDefault();
      resetForm();
    }
  };

  window.utilsSet.hideCard();
  window.synchronizeFields(timeCheckOut, timeCheckIn, timeInToTimeoutChange);
  window.synchronizeFields(timeCheckIn, timeCheckOut, timeInToTimeoutChange);
  window.synchronizeFields(roomCapacity, roomNumber, roomAndCapacityChange);
  window.synchronizeFields(roomNumber, roomCapacity, roomAndCapacityChange);
  window.synchronizeFields(advertType, advertPrice, advertTypeChange);
  submitButton.addEventListener('click', onSubmitButtonClick);
})();
