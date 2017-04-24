'use strict';

(function () {
  window.synchronizeFields = function (firstItem, secondItem, callback) {
    firstItem.addEventListener('change', function (evt) {
      if (typeof callback === 'function') {
        var currentValue = evt.target.value;
        callback(secondItem, currentValue);
      }
    });
  };
})();
