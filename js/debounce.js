'use strict';

// Модуль, убирает эффет "мерцания" при многократном обращении к пину

(function () {
  var DEBOUNCE_TIME = 500; // ms

  var lastTimeout = null;
  window.debounce = function (callback) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_TIME);
  };
})();
