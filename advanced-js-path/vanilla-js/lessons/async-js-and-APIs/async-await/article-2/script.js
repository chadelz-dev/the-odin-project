function doubleAfterDelay(value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value * 2), 2000);
  });
}

async function calculateSumAsync(inputValue) {
  const doubledTen = await doubleAfterDelay(10);
  const doubledTwenty = await doubleAfterDelay(20);
  const doubledThirty = await doubleAfterDelay(30);
  return inputValue + doubledTen + doubledTwenty + doubledThirty;
}

function calculateSumWithPromises(inputValue) {
  return new Promise((resolve) => {
    doubleAfterDelay(10).then((first) => {
      doubleAfterDelay(20).then((second) => {
        doubleAfterDelay(30).then((third) => {
          resolve(inputValue + first + second + third);
        });
      });
    });
  });
}

// UI
document
  .getElementById('calculate-async')
  .addEventListener('click', async () => {
    const asyncDiv = document.getElementById('async-result');
    asyncDiv.textContent = 'Calculating with async/await...';

    try {
      const sum = await calculateSumAsync(10);
      asyncDiv.textContent = `Sum: ${sum}`;
    } catch (error) {
      asyncDiv.textContent = 'Error calculating sum';
    }
  });

document.getElementById('calculate-promise').addEventListener('click', () => {
  const promiseDiv = document.getElementById('promise-result');
  promiseDiv.textContent = 'Calculating with promises...';

  calculateSumWithPromises(10)
    .then((sum) => {
      promiseDiv.textContent = `Sum: ${sum}`;
    })
    .catch((error) => {
      promiseDiv.textContent = 'Error calculating sum';
    });
});
