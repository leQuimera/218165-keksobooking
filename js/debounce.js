'use strict';

// Модуль, убирает эффет "мерцания" при многократном обращении к форме
(function () {

  var DEBOUNCE_TIME = 500;
  var lastTimeout = null;

  window.debounce = function (callback) {
    if (lastTimeout !== null) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_TIME);
  };
})();
