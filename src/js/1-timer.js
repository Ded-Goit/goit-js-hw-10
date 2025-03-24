// Описаний в документації імпорт бібліотеки
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний в документації імпорт бібліотеки
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
//Отримання посилань на елементи DOM:
const dateInput = document.querySelector('#datetime-picker'); //Отримує поле вводу дати.
const startButton = document.querySelector('[data-start]'); //Отримує кнопку "Старт" за допомогою атрибута data-start.
const daysSpan = document.querySelector('[data-days]'); //Отримує елемент для відображення залишкового часу (дні).
const hoursSpan = document.querySelector('[data-hours]'); //Отримує елемент для відображення залишкового часу (години).
const minutesSpan = document.querySelector('[data-minutes]'); //Отримує елемент для відображення залишкового часу (хвилини).
const secondsSpan = document.querySelector('[data-seconds]'); //Отримує елемент для відображення залишкового часу (секунди).

let userSelectedDate = null; //зберігає вибрану користувачем дату.
let timerInterval = null; //ідентифікатор інтервалу для таймера.
//Налаштування flatpickr:
const options = {
  enableTime: true, //увімкнення вибору часу.
  time_24hr: true, //формат часу 24 години.
  defaultDate: new Date(), //поточна дата встановлюється за замовчуванням.
  minuteIncrement: 1, //збільшення часу на 1 хвилину.
  /**onClose(selectedDates) – викликається при закритті календаря:
   * Перевіряє, чи дата в майбутньому.
   * Якщо ні – показує повідомлення про помилку (iziToast.error()).
   * Якщо так – зберігає дату у userSelectedDate і активує кнопку "Старт". */
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
flatpickr(dateInput, options); //Ініціалізація flatpickr з переданими налаштуваннями.
//Для підрахунку значень використовуй готову функцію convertMs, де ms — різниця між кінцевою і поточною датою в мілісекундах.
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
/**Функція addLeadingZero – додає ведучий нуль, якщо число менше 10, додає на початку "0" */
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
//Функція updateTimerDisplay – оновлює HTML таймера, вставляє залишковий час у відповідні HTML-елементи:
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

//Функція startTimer – запускає таймер:
function startTimer() {
  startButton.disabled = true; //Деактивує кнопку "Старт"
  dateInput.disabled = true; //Деактивує поле вибору дати
  //Запускає setInterval, який кожну секунду
  timerInterval = setInterval(() => {
    const now = new Date(); //Отримує поточний час
    const timeLeft = userSelectedDate - now; //Обчислює залишковий час
    showTimeMessage(); // змінюємо техт повідомлення

    if (timeLeft <= 0) {
      clearInterval(timerInterval); //Якщо таймер закінчився – зупиняє його
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 }); //Оновлює відображення таймера
      dateInput.disabled = false;
      resetTimeMessage(); //видаляємо текст після завершення
      return;
    }
    updateTimerDisplay(convertMs(timeLeft));
  }, 1000);
}
startButton.addEventListener('click', startTimer); // слухач події запускає таймер при кліку.
//Додаємо функцію showTimeMessage, яка буде показувати повідомлення, коли таймер запущений
const timeMessage = document.querySelector('#time-message'); //Отримує елемент для вставки повідомлення.
function showTimeMessage() {
  timeMessage.textContent = 'Now you can clearly see how quickly time flies.'; // вставляє новий техт
}
//Додаємо функцію hideTimeMessage, яка буде ховати повідомлення, коли таймер закінчився
function resetTimeMessage() {
  timeMessage.style.display = 'none'; //ховає елемент через стилізацію
}
