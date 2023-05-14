import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', getInputValue);

function getInputValue(e) {
  e.preventDefault();
  const result = {};
  const formData = new FormData(form);
  formData.forEach((value, name) => {
    result[name] = value;
  });
  const { delay, step, amount } = result;
  let steps = Number(delay);
  for (let i = 0; i < amount; i += 1) {
    steps += Number(step);
    createPromise(amount, steps)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
