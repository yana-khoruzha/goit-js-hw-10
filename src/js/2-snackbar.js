import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const form = document.querySelector('.form');

function createPromise(delay, state) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  return promise;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const state = form.elements['state'].value;
  const delay = form.elements['delay'].value;

  const promise = createPromise(delay, state);

  promise.then(() => {
      iziToast.success({
        title: 'OK',
        position: 'topRight',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    }).catch(() => {
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });

  form.reset();
});
