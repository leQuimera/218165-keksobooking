'use strict';

window.eventCheck = (function () {
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
    }
  };
})();
