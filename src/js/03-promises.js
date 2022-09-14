import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// знаходимо посилання на форму
const formRef = document.querySelector('.form');

// вішаємо слухача на форму
formRef.addEventListener('submit', onSubmitDataForm);

// фунція при сабміт
function onSubmitDataForm(e) {
  e.preventDefault();

  // данні які вводить користувач
  let delay = Number(e.target.delay.value);
  const step = Number(e.target.step.value);
  let amount = Number(e.target.amount.value);

  // console.log('deley name =>', e.target.delay);
  // console.log('deley value =>', e.target.delay.value);

  // console.log('step name =>', e.target.step);
  // console.log('step value =>', e.target.step.value);

  // console.log('amount name =>', e.target.amount);
  // console.log('amount value =>', e.target.amount.value);

  // запускаєм цикл по данним
  for (let index = 1; index <= amount; index += 1) {
    createPromise(index, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
    delay += step;
  }
}

// cтворення промісу та нового об'єкту який передає проміс
function createPromise(position, delay) {
  const obj = { position, delay };
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(obj);
    } else {
      reject(obj);
    }
  });
}
