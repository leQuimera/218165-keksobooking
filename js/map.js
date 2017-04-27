'use strict';

(function () {
  var START_PIN_NUMBERS = 3;
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';
  var startData = [];

  var onLoad = function (loadedData) {
    var copyData = loadedData.slice();
    for (var i = 0; i < START_PIN_NUMBERS; i++) {
      startData.push(window.utilsSet.getRandomUniqueItem(copyData)[0]);
    }
    window.renderPins(startData);
    window.getFiltredAdverts(loadedData);
  };
  window.load(URL, onLoad);
})();
