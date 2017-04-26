'use strict';

// Вспомогательные функции

window.utilsSet = (function () {
  var enterCode = 13;
  var escCode = 27;
  var clicked = 'click';

  return {
    isEnterPressed: function (evt) {
      return evt && evt.keyCode === enterCode;
    },
    isEscapePressed: function (evt) {
      return evt && evt.keyCode === escCode;
    },
    isClicked: function (evt) {
      return evt.type === clicked;
    },
    // Возврат случайного значения
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    // Возврат случайного эллемента из массива
    getRandomArrayItem: function (array) {
      return array[window.utilsSet.getRandomInt(0, array.length - 1)];
    },
    // Возврат уникального эллемента из массива
    getRandomUniqueItem: function (array) {
      return array.splice(window.utilsSet.getRandomInt(0, array.length - 1), 1);
    },
    isActiveSet: function (itClass) {
      var pinActive = document.querySelector(itClass);
      if (pinActive !== null) {
        pinActive.classList.remove('pin--active');
      }
    }
  };
})();
