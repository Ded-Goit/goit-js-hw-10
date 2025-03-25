// Описаний в документації імпорт бібліотеки
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
//Отримуємо дані з форми
const form = document.querySelector('.form'); //Находим HTML-элемент формы и сохраняем его в переменной form.
//Добавляем обработчик события submit на форму.
form.addEventListener('submit', event => {
  event.preventDefault(); //отменяем стандартное поведение формы (перезагрузку страницы).
  const delay = parseInt(form.elements.delay.value); //получаем значение из поля ввода с именем delay, преобразуя в целое число
  const state = form.elements.state.value; //получаем значение из выпадающего списка state, которое может быть fulfilled (успех) или rejected (ошибка).
  // Створюємо проміс
  /**setTimeout откладывает выполнение на указанное время delay.
   * В зависимости от значения state:
   * Если fulfilled, вызывается resolve(delay), что означает успешное выполнение промиса.
   * Если rejected, вызывается reject(delay), что означает ошибку. */
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  //Обробляємо результат промісу
  /**Если промис успешно выполнился (resolve), то вызывается .then().
   * Внутри then() используется iziToast.success(),
   * который показывает всплывающее уведомление с зеленым цветом и сообщением о том,
   *  что промис выполнен за delay миллисекунд. */
  promise
    .then(delay => {
      iziToast.success({
        title: 'Succes',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    /**Если промис завершился с ошибкой (reject), вызывается .catch().
     * Внутри catch() используется iziToast.error(),
     * который показывает всплывающее уведомление с красным цветом и текстом о том,
     * что промис отклонен через delay миллисекунд. */
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
  form.reset(); //очищаем все поля формы после отправки.
});
