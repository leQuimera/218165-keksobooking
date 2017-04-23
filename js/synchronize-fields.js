'use strict';

(function () {
  window.synchronizeFields = function (firstItem, secondItem, callback) {
    firstItem.addEventListener('change', function (evt) {
      if (typeof syncFunc === 'function') {
        var currentValue = event.target.value;
        callback(secondItem, currentValue);
      }
    });
  };
})();
