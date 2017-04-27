'use strict';

// Вспомогательные функции
window.utilsSet = (function () {

  var ENTER_CODE = 13;
  var ESC_CODE = 27;
  var CLICKED = 'click';
  var pinActive = null;
  var dialogWindow = document.querySelector('.dialog');

  return {
    isEnterPressed: function (evt) {
      return evt && evt.keyCode === ENTER_CODE;
    },
    isEscapePressed: function (evt) {
      return evt && evt.keyCode === ESC_CODE;
    },
    isClicked: function (evt) {
      return evt.type === CLICKED;
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomArrayItem: function (array) {
      return array[window.utilsSet.getRandomInt(0, array.length - 1)];
    },
    getRandomUniqueItem: function (array) {
      return array.splice(window.utilsSet.getRandomInt(0, array.length - 1), 1);
    },
    removeActive: function (itClass) {
      pinActive = document.querySelector('.' + itClass);
      if (pinActive !== null) {
        pinActive.classList.remove(itClass);
      }
    },
    hideCard: function () {
      dialogWindow.style.display = 'none';
    },
    displayCard: function () {
      dialogWindow.style.display = 'block';
    }
  };
})();
