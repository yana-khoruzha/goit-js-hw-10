import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      iziToast.error({
        messageColor: 'white',
        color: '#EF4040',
        displayMode: 'once',
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);


const startBtn = document.querySelector('[data-start]');
const fieldValue = document.querySelectorAll('.field');
const input = document.querySelector('#datetime-picker');
const daysField = fieldValue[0].firstElementChild;
const hoursField = fieldValue[1].firstElementChild;
const minutesField = fieldValue[2].firstElementChild;
const secondsField = fieldValue[3].firstElementChild;

let userSelectedDate;
let countDownInterval;


startBtn.addEventListener('click', () => {
  if (userSelectedDate) {
    startBtn.disabled = true;
    input.disabled = true;
    startTimer();
  }
});

function startTimer() {
    countDownInterval = setInterval(updateTimer, 1000, userSelectedDate);
}

function updateTimer(endDate) {
  const initial = Date.now();
  const diff = endDate - initial;
  const { days, hours, minutes, seconds } = convertMs(diff);
  console.log(days, hours, minutes, seconds);

  if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
    daysField.textContent = addLeadingZero(days);
    hoursField.textContent = addLeadingZero(hours);
    minutesField.textContent = addLeadingZero(minutes);
    secondsField.textContent = addLeadingZero(seconds);
  }
  
  if (diff <= 0) {
    stopTimer();
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function stopTimer() {
  if (countDownInterval) {
    clearInterval(countDownInterval);

    daysField.textContent = '00';
    hoursField.textContent = '00';
    minutesField.textContent = '00';
    secondsField.textContent = '00';

    countDownInterval = null;
  }
  startBtn.disabled = false;
  input.disabled = false;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}