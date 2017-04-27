'use strict';

window.showCard = (function () {

  var pinWidth = null;
  var pinHeight = null;

  var searchAdvert = function (adverts, currentX, currentY) {
    for (var i = 0; i < adverts.length; i++) {
      var pinX = adverts[i].location.x - pinWidth / 2;
      var pinY = adverts[i].location.y - pinHeight;
      if (pinX === currentX && pinY === currentY) {
        break;
      }
    }
    return i;
  };

  return function (evt, listOfAdverts) {
    if (window.utilsSet.isEnterPressed(evt) || window.utilsSet.isClicked(evt)) {
      var currentPin = '';
      var currentX = '';
      var currentY = '';
      var checkedPin = evt.target;
      if (evt.target.classList.contains('rounded')) {
        currentPin = checkedPin.offsetParent;
        currentX = checkedPin.parentNode.style.left;
        currentY = checkedPin.parentNode.style.top;
      } else if (checkedPin.classList.contains('pin')) {
        currentPin = checkedPin;
        currentX = checkedPin.style.left;
        currentY = checkedPin.style.top;
      }
      if (currentPin && !currentPin.classList.contains('pin__main')) {
        window.utilsSet.removeActive('pin--active');
        currentPin.classList.add('pin--active');
        pinHeight = pinHeight || parseInt(getComputedStyle(currentPin).height.slice(0, -2), 10);
        pinWidth = pinWidth || parseInt(getComputedStyle(currentPin).width.slice(0, -2), 10);
        currentX = parseInt(currentX.slice(0, -2), 10);
        currentY = parseInt(currentY.slice(0, -2), 10);
        var pinNumber = searchAdvert(listOfAdverts, currentX, currentY);
        window.setCard(listOfAdverts[pinNumber]);
      }
    }
  };
})();
