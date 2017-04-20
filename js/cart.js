'use strict';

window.cartSet = (function () {
  var OFFER_TYPE_NAMES = {
    'flat': 'квартира',
    'house': 'дом',
    'bungalo': 'бунгало'
  };
  var dialogWindow = document.querySelector('.dialog');
  var pinActive = document.querySelector('.pin--active');

  // Закрытие окна диалога при нажатии esc
  var onCloseDialogEsc = function (evt) {
    if (window.eventCheck.isEscapePressed(evt)) {
      if (pinActive) {
        pinActive.classList.remove('pin--active');
        pinActive = '';
      }
      dialogWindow.style.display = 'none';
    }
  };

  return {
    // Закрытие окна с абьявлением
    onCloseDialog: function (evt) {
      if (window.eventCheck.isEnterPressed(evt) || window.eventCheck.isClicked(evt)) {
        if (pinActive) {
          pinActive.classList.remove('pin--active');
        }
        dialogWindow.style.display = 'none';
        document.removeEventListener('keydown', onCloseDialogEsc);
      }
    },

    // Вывод данных о квартире на карту
    createDialog: function (advertItem) {
      var lodgeTemplate = document.querySelector('#lodge-template').content;
      var lodgeItem = lodgeTemplate.cloneNode(true);
      var lodgeTitle = lodgeItem.querySelector('.lodge__title');
      var lodgeAddress = lodgeItem.querySelector('.lodge__address');
      var lodgePrice = lodgeItem.querySelector('.lodge__price');
      var lodgeType = lodgeItem.querySelector('.lodge__type');
      var lodgeRooms = lodgeItem.querySelector('.lodge__rooms-and-guests');
      var lodgeCheckin = lodgeItem.querySelector('.lodge__checkin-time');
      var dialog = document.querySelector('.dialog');
      var dialogPanel = document.querySelector('.dialog__panel');

      lodgeTitle.textContent = advertItem.offer.title;
      lodgeAddress.textContent = advertItem.offer.address;
      lodgePrice.innerHTML = advertItem.offer.price + ' ' + '&#8381;/ночь';
      lodgeType.textContent = OFFER_TYPE_NAMES[advertItem.offer.type];
      lodgeRooms.textContent = 'Для ' + advertItem.offer.guests + ' гостей в ' + advertItem.offer.rooms + ' комнатах';
      lodgeCheckin.textContent = 'Заезд после' + advertItem.offer.checkin + ', выезд до ' + advertItem.offer.checkout;

      for (var i = 0; i < advertItem.offer.features.length; i++) {
        var span = document.createElement('span');
        span.className = 'feature__image feature__image--' + advertItem.offer.features[i];
        lodgeItem.querySelector('.lodge__features').appendChild(span);
      }

      lodgeItem.querySelector('.lodge__description').textContent = advertItem.offer.description;
      document.querySelector('.dialog__title img').src = advertItem.author.avatar;

      dialog.replaceChild(lodgeItem, dialogPanel);
      document.addEventListener('keydown', onCloseDialogEsc);
    }
  };
})();
