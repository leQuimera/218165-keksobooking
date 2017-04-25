'use strict';

// card.js — модуль для отрисовки элемента на карточке

window.cardSet = (function () {
  var OFFER_TYPE_NAMES = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var dialogWindow = document.querySelector('.dialog');
  var dialogClose = document.querySelector('.dialog__close');
  var pinActive;

  // Закрытие окна диалога
  var onDialogCose = function (evt) {
    if (window.utilsSet.isEscapePressed(evt) || window.utilsSet.isClicked(evt)) {
      pinActive = document.querySelector('.pin--active');
      if (pinActive !== null) {
        pinActive.classList.remove('pin--active');
        pinActive = '';
      }
      dialogWindow.style.display = 'none';
      document.removeEventListener('keydown', onDialogCose);
      dialogClose.removeEventListener('click', onDialogCose);
    }
  };

  var createLodgePhotos = function (lodgePhotos, photos) {
    photos.forEach(function (currentPhoto) {
      var imgNode = new Image(50, 40);
      imgNode.setAttribute('src', currentPhoto);
      imgNode.setAttribute('alt', 'Lodge photo');
      lodgePhotos.appendChild(imgNode);
    });
  };

  return function (advertItem) {
    // Вывод данных о квартире на карту
    var lodgeTemplate = document.querySelector('#lodge-template').content;
    var lodgeItem = lodgeTemplate.cloneNode(true);
    var lodgeTitle = lodgeItem.querySelector('.lodge__title');
    var lodgeAddress = lodgeItem.querySelector('.lodge__address');
    var lodgePrice = lodgeItem.querySelector('.lodge__price');
    var lodgeType = lodgeItem.querySelector('.lodge__type');
    var lodgeRooms = lodgeItem.querySelector('.lodge__rooms-and-guests');
    var lodgeCheckin = lodgeItem.querySelector('.lodge__checkin-time');
    var lodgeGallery = lodgeItem.querySelector('.lodge__photos');
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

    createLodgePhotos(lodgeGallery, advertItem.offer.photos);

    document.querySelector('.dialog__title img').src = advertItem.author.avatar;

    dialog.replaceChild(lodgeItem, dialogPanel);
    dialogWindow.style.display = 'block';
    document.addEventListener('keydown', onDialogCose);
    dialogClose.addEventListener('click', onDialogCose);
  };
})();
