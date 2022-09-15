import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';

// получаем ссылку на кнопку и инпут
const btnStart = document.querySelector('button[data-start]');
const timePicker = document.querySelector('#datetime-picker');

//ссфлки на все наши спаны
const timerValueRef = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
// настройки библиотеки(опции)
const optoins = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDay = selectedDates[0];
    // console.log(selectedDay);
    // console.log(optoins.defaultDate.getTime());
    if (selectedDay < new Date()) {
      btnStart.disabled = true;
      Notify.failure('Please choose a date in the future');
      return;
    }
    btnStart.disabled = false;
  },
};
// віщаєм слухая на кнопку
btnStart.addEventListener('click', onClickTimerMarkUp);
// передаем ссылку на инпут и опк=ции гнастройки
flatpickr(timePicker, optoins);

//  вешаем слушатель событий на кнопку при клике
// btnStart.addEventListener('click', createTimer(selectedDates));
// изначально кнопка неактивна
btnDesable();

function btnDesable() {
  btnStart.disabled = true;
}

// функция которая выполняется при клике на кнопку

function onClickTimerMarkUp() {
  const date = new Date(timePicker.value);
  let timerId = setInterval(() => {
    const currentTime = Date.now();

    const deltaTime = date.getTime() - currentTime;

    countSecondsLeft(deltaTime);
    // console.log(days)

    console.log(deltaTime);

    if (deltaTime < 1000) {
      clearInterval(timerId);
      console.log('THIS IS ALL');
    }
  }, 1000);
}
// функція для запису значень в браузері
function countSecondsLeft(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  // console.log(`seconds = ${seconds}`);

  timerValueRef.days.textContent = days;
  timerValueRef.hours.textContent = hours;
  timerValueRef.minutes.textContent = minutes;
  timerValueRef.seconds.textContent = seconds;
}

//функция приводит к строке и добавляет  0б если число меньше 2-уч знаков
function pad(value) {
  return String(value).padStart(2, '0');
}
//функция для подчета значений
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
