import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  calendar: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    parseDate = Date.parse(selectedDates[0]);
    if (parseDate <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    Notiflix.Notify.success('get ready');
    refs.startBtn.disabled = false;
  },
};
flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', timeForTimer);

let isActiv = false;

function timeForTimer() {
  if (isActiv) {
    return;
  }
  isActiv = true;

  const selectedTime = Date.parse(refs.calendar.value);
  refs.calendar.disabled = true;
  const timerInterval = setInterval(() => {
    const currentTime = Date.now();
    const distanceTime = selectedTime - currentTime;
    const resultTimer = convertMs(distanceTime);
    const { days, hours, minutes, seconds } = resultTimer;
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;

    console.log(resultTimer);

    if (
      days === '00' &&
      hours === '00' &&
      minutes === '00' &&
      seconds === '00'
    ) {
      clearInterval(timerInterval);
      refs.startBtn.disabled = true;
      refs.calendar.disabled = false;
      isActiv = false;
    }
  }, 1000);
  const confirmInterval = setTimeout(() => {
    Notiflix.Confirm.show(
      'The timer has started',
      'If you made a mistake with the date, press STOP!',
      'Сontinue',
      'STOP',
      function okCb() {},
      function cancelCb() {
        clearInterval(timerInterval);
        refs.startBtn.disabled = true;
        refs.calendar.disabled = false;
        isActiv = false;
        return;
      },
      {
        width: '320px',
        borderRadius: '8px',
        // etc...
      }
    );
  }, 500);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
