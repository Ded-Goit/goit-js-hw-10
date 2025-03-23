//Оголошуємо функцію createPixel(), яка створюватиме новий піксель.   //Випадкове розташування та розмір
function createPixel() {
  const pixel = document.createElement('div'); //створює новий <div>, який буде представляти піксель.
  pixel.classList.add('pixel'); //додає клас pixel, щоб застосувати стилі CSS.
  document.body.appendChild(pixel); //додає створений піксель до сторінки (в <body>)
  const startX = Math.random() * window.innerWidth;
  //Math.random() повертає випадкове число від 0 до 1.
  //Math.random() * window.innerWidth — отримує випадкову X-координату в межах ширини вікна.
  const duration = Math.random() * 3 + 1; // генерує випадковий час падіння від 1 до 4 секунд.
  const size = Math.random() * 10 + 6; // генерує випадковий розмір пікселя від 6px до 16px.
  pixel.style.width = `${size}px`; //Встановлює ширину кожного пікселя.
  pixel.style.height = `${size}px`; //Встановлює висоту кожного пікселя.
  pixel.style.left = `${startX}px`; //Розташовує піксель у випадковій точці по горизонталі.
  // Випадковий відтінок сірого
  /* const grayShade = Math.random() * 255;
  pixel.style.backgroundColor = `rgb(${grayShade}, ${grayShade}, ${grayShade})`;*/
  // Випадковий відтінок зеленого
  pixel.style.backgroundColor = `rgb(${Math.random() * 50}, ${
    150 + Math.random() * 105
  }, ${Math.random() * 50})`;

  //Використовує animate(), щоб створити ефект падіння.
  pixel.animate(
    [
      { transform: `translateY(0px)`, opacity: 1 }, //початок: піксель знаходиться вгорі, повністю видно.
      { transform: `translateY(${window.innerHeight}px)`, opacity: 0 }, //кінець: піксель опустився до низу і зник.
    ],
    {
      duration: duration * 1000, //час анімації в мілісекундах.
      easing: 'linear', //рівномірне падіння без прискорення/уповільнення.
    }
  );
  // Видалення пікселя після анімації
  setTimeout(() => pixel.remove(), duration * 1000); //setTimeout() чекає duration * 1000 мілісекунд (час падіння) і видаляє піксель після завершення анімації.
}
//Створення пікселів у циклі
function generatePixels() {
  setInterval(createPixel, 10); //запускає createPixel() кожні 10 мілісекунд, щоб створювати нові пікселі.
}

generatePixels(); //Викликає generatePixels(), щоб запустити ефект.

//Як змінити ефект?
//Прискорити або сповільнити падіння
//Змінити Math.random() * 5 + 2 на Math.random() * 3 + 1 (1-4 сек).
//Додати кольори
//pixel.style.backgroundColor = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
//Змінити форму
//Додати border-radius: 50%; для круглих пікселів.

/**Цей код створює ефект спадаючих пікселів, використовуючи:
 * Випадкові координати, розмір і швидкість.
 * animate() для плавного падіння.
 * setInterval() для безперервного створення нових пікселів.
 * setTimeout() для очищення екрану.*/
