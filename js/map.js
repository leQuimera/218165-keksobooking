'use strict';

(function () {
  var START_PIN_NUMBERS = 3;
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';
  var startData = [];
  var tokioMap = document.querySelector('.tokyo__pin-map');

  var onLoad = function (loadedData) {
    var copyData = loadedData.slice();
    for (var i = 0; i < START_PIN_NUMBERS; i++) {
      startData.push(window.utilsSet.getRandomUniqueItem(copyData)[0]);
    }

    var onPinClickKey = function (evt) {
      window.showCard(evt, loadedData);
    };

    tokioMap.addEventListener('click', onPinClickKey);
    tokioMap.addEventListener('keydown', onPinClickKey);
    window.renderPins(startData);
    window.getFiltredAdverts(loadedData);
  };

  window.load(URL, onLoad);
})();
