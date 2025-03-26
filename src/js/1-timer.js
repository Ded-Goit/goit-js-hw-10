// Documented library import
import flatpickr from 'flatpickr';
// Additional style import
import 'flatpickr/dist/flatpickr.min.css';
// Documented library import
import iziToast from 'izitoast';
// Additional style import
import 'izitoast/dist/css/iziToast.min.css';
//Getting references to DOM elements:
const dateInput = document.querySelector('#datetime-picker'); //Gets the date input field.
const startButton = document.querySelector('[data-start]'); //Gets the "Start" button using the data-start attribute.
const daysSpan = document.querySelector('[data-days]'); //Gets the element to display the remaining time (days).
const hoursSpan = document.querySelector('[data-hours]'); //Gets an element to display the remaining time (hours).
const minutesSpan = document.querySelector('[data-minutes]'); //Gets an element to display the remaining time (minutes).
const secondsSpan = document.querySelector('[data-seconds]'); ////Gets an element to display the remaining time (seconds).
let userSelectedDate = null; //stores the date selected by the user.
let timerInterval = null; //interval identifier for the timer.
//flatpickr settings:
const options = {
  enableTime: true, //enables time selection.
  time_24hr: true, //24-hour time format.
  defaultDate: new Date(), //defaults to the current date.
  minuteIncrement: 1, //increments the time by 1 minute.
  /**onClose(selectedDates) – called when the calendar is closed:
   * Checks if the date is in the future.
   * If not – shows an error message (iziToast.error()).
   * If yes – saves the date in userSelectedDate and activates the "Start" button. */
  onClose(selectedDates) {
    //console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};
flatpickr(dateInput, options); //Initialize flatpickr with the passed settings.
//To calculate the values, use the ready-made function convertMs, where ms is the difference between the final and current date in milliseconds.
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
//console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
/**AddLeadingZero function – adds a leading zero if the number is less than 10, adds a "0" at the beginning*/
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
//updateTimerDisplay function – updates the timer HTML, inserts the remaining time into the corresponding HTML elements:
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

//The startTimer function starts the timer:
function startTimer() {
  startButton.disabled = true; //Disables the "Start" button
  dateInput.disabled = true; //Disables the date selection field
  //Starts setInterval, which every second
  timerInterval = setInterval(() => {
    const now = new Date(); //Gets the current time
    const timeLeft = userSelectedDate - now; //Calculates the remaining time
    showTimeMessage(); // change the message text

    if (timeLeft <= 0) {
      clearInterval(timerInterval); //If the timer has expired – stops it
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 }); //Updates the timer display
      dateInput.disabled = false;
      resetTimeMessage(); //deletes the text after completion
      return;
    }
    updateTimerDisplay(convertMs(timeLeft));
  }, 1000);
}
startButton.addEventListener('click', startTimer); // event listener starts timer when clicked.
//Add showTimeMessage function, which will show message when timer is started
const timeMessage = document.querySelector('#time-message'); //Gets element to insert message.
function showTimeMessage() {
  timeMessage.textContent = 'Now you can clearly see how quickly time flies.'; //inserts new text
}
//Add hideTimeMessage function, which will hide message when timer is over
function resetTimeMessage() {
  timeMessage.style.display = 'none'; //hides element through styling
}
