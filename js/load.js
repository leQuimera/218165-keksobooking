'use strict';

window.load = (function (url, onLoad) {

  var onError = function (errorMessage) {
    var errorBlock = document.createElement('div');
    errorBlock.style = 'z-index: 100; margin: 0px auto; padding: 20px 0px; border: 1px solid #ff2c02; text-align: center; background-color: #ffaa99; color: #000; position: fixed; left: 300px; top: 100px; width: 400px; font-size: 30px; line-height: 42px; box-shadow: 6px 6px 6px #000; border-radius: 4px;';
    errorBlock.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
  };

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    switch (xhr.status) {
      case 200:
        onLoad(xhr.response);
        break;
      case 400:
        onError('Неверный запрос');
        break;
      case 401:
        onError('Пользователь не авторизован');
        break;
      case 404:
        onError('Ничего не найдено');
        break;
      default:
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
    }
  });
  xhr.addEventListener('error', function () {
    onError('Ошибка соединения');
  });
  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.timeout = 10000; // 10s

  xhr.open('GET', url);
  xhr.send();

});
