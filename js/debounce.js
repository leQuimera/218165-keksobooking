'use strict';

// Модуль, убирает эффет "мерцания" при многократном обращении к пину

(function () {
  var DEBOUNCE_TIME = 500; // ms

  var lastTimeout;
  window.debounce = function (funс) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(funс, DEBOUNCE_TIME);
  };
})();
