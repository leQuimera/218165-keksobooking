'use strict';
/* data.js
 * Гененрирует список карточек заданного вида.
 * На входе не ждет ничего, содержит внутри все рандомные функции, необходимые для генерации
 * На выходе выдает массив, элеметами которого являются карточки, представленные в виде объекта.
 *
 * pin.js
 * Создает пины для массива карточек.
 * Показывает пины на карте.
 * Ловит события для пинов: клик мышкой, нажатие по enter. Соответствующе реагирует.
 * На входе ждет список карточек.
 * На выходе ыдает изображение пинов на карте в соответствии с координатами карточек.
 * Запускает ожидание события enter\click
 *
 * card.js
 * Отрисовывает карточку на карте.
 * На входе получает номер карточки.
 * Вызывается в модуле pin.js
 * На выходе выводит на карте карточку с информацией для указанного номера.
 * Запускает ожидание события click\enter по кнопке закрытия карточки.
 *
 * form.js
 * Модуль, работающий с формой создания нового объявления.
 * На входе ничего не ждет, работает автономно.
 * Отслеживает валидность полей.
 * Устанавливает взаимосвязи между полями формы.
 *
 * utils.js
 * Файл вспомогательных функций.
 * На выходе:
 * 1. isEnterPressed - Функция проверки события нажатия esc.
 * 2. isEscapePressed - Функция проверки события нажатия enter
 * 3. isClicked - Функция проверки события нажатия click
 * Каждая функция на входе получает событие, вовращает true\false соответственно
 * Функции возврата случайного значения/элемента массива
 *
 * load.js
 * Модуль загрузки данных
 * Обрабатывает возможные ошибки - ответы сервера.
 * На входе - url и функция, выполняющаяся в случае успеха.
 *
 * synchronize-fields.js
 * Базовый модуль для синхонизации полей.
 * Пример работы callback
 *
 * filter.js
 * по данным, указываемым пользователем в фильтере под картой, выбираются подходящие значения
 */

var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';
var onLoad = function (loadedData) {
  window.pinSet(loadedData, true);
  window.filters(loadedData);
};
window.load(URL, onLoad);

// Модуль перетаскивание main-пина
var pinHandle = document.querySelector('.pin__main');
var addressField = document.querySelector('#address');
var currentCoords = null;
pinHandle.setAttribute('draggable', true);
var onPinMouseDown = function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  currentCoords = startCoords;
  document.addEventListener('mousemove', onPinMouseMove);
  document.addEventListener('mouseup', onPinMouseUp);
};
pinHandle.addEventListener('mousedown', onPinMouseDown);
var onPinMouseMove = function (evt) {
  evt.preventDefault();
  var PIN_PARAM = {
    MIN_X: 0,
    MIN_Y: 0,
    MAX_X: pinHandle.offsetParent.clientWidth - pinHandle.clientWidth,
    MAX_Y: pinHandle.offsetParent.clientHeight - pinHandle.clientHeight
  };
  var shift = {
    x: currentCoords.x - evt.clientX,
    y: currentCoords.y - evt.clientY
  };
  currentCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var newX = pinHandle.offsetLeft - shift.x;
  var newY = pinHandle.offsetTop - shift.y;
  if ((newX >= PIN_PARAM.MIN_X && newX <= PIN_PARAM.MAX_X) && (newY >= PIN_PARAM.MIN_Y && newY <= PIN_PARAM.MAX_Y)) {
    pinHandle.style.left = newX + 'px';
    pinHandle.style.top = newY + 'px';
  }
  addressField.value = 'x: ' + Math.floor(newX + pinHandle.clientWidth / 2) + 'px, y: ' + Math.floor(newY + pinHandle.clientHeight) + ' px';
};
var onPinMouseUp = function (evt) {
  evt.preventDefault();
  document.removeEventListener('mousemove', onPinMouseMove);
  document.removeEventListener('mouseup', onPinMouseUp);
};
