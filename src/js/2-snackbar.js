// Library import described in the documentation
import iziToast from 'izitoast';
// Additional style import
import 'izitoast/dist/css/iziToast.min.css';
//Get data from the form
const form = document.querySelector('.form'); //Find the HTML element of the form and store it in the form variable.
//Add a submit event handler to the form.
form.addEventListener('submit', event => {
  event.preventDefault(); //we cancel the standard behavior of the form (reloading the page).
  const delay = parseInt(form.elements.delay.value); //we get the value from the input field with the name delay, converting it to an integer
  const state = form.elements.state.value; //we get the value from the state drop-down list, which can be fulfilled (success) or rejected (error).
  // Create a trade
  /**setTimeout delays execution for the specified delay time.
   * Depending on the value of state:
   * If fulfilled, resolve(delay) is called, which means successful fulfillment of the promise.
   * If rejected, reject(delay) is called, which means an error */
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  //Process the result of the promise
  /**If the promise is resolved, then .then() is called.
   * Inside then(), iziToast.success() is used,
   * which shows a green pop-up notification with a message that
   *  the promise was fulfilled in delay milliseconds. */
  promise
    .then(delay => {
      iziToast.success({
        title: 'Succes',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    /**If the promise is rejected, .catch() is called.
     * Inside catch(), iziToast.error() is used,
     * which shows a red pop-up notification with a message that
     * the promise was rejected in delay milliseconds. */
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
  form.reset(); //clear all form fields after submission.
});
