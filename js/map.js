'use strict';

var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

var onLoad = function (loadedData) {
  window.pinSet(loadedData, true);
  window.filters(loadedData);
};
window.load(URL, onLoad);
window.pinMoveSet();
