// Описаний в документації імпорт бібліотеки
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = parseInt(form.elements.delay.value);
  const state = form.elements.state.value;
  //
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  //
  promise
    .then(delay => {
      iziToast.success({
        title: 'Succes',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
  form.reset();
});
