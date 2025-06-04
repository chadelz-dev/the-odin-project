// Delaying a message with a promise
async function showDelayedMessage() {
  let delayedPromise = new Promise((resolve) => {
    setTimeout(() => resolve('done!'), 1000);
  });
  return await delayedPromise;
}

// Fetching multiple quotes with timeout using AbortController
async function fetchMultipleQuotes() {
  // create abort controller to cancel fetches
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // abort after a 5s timeout

  try {
    // creates an array of promises for fetching quotes
    const quotePromises = [
      fetch('https://dummyjson.com/quotes/random', {
        signal: controller.signal, // attaches abort signal to fetch
      }),
      fetch('https://dummyjson.com/quotes/random', {
        signal: controller.signal,
      }),
    ];

    // awaits all fetches concurrently
    const responses = await Promise.all(quotePromises);
    clearTimeout(timeoutId); // clear time out if fetch completes in time

    // parses JSON responses
    const quoteResults = await Promise.all(
      // map over responses and call .json() on each response
      responses.map(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch quote'); // checks for HTTP errors
        return res.json(); // parses JSON response
      })
    );

    // return a formatted string of the quotes
    return quoteResults.map((q) => `"${q.quote}" - ${q.author}`).join('<br>');
  } catch (error) {
    throw new Error(`Quote fetch error: ${error.message}`); // propagates errors
  }
}

// doubling a number
class NumberDoubler {
  constructor(num) {
    this.num = num;
  }
  then(resolve) {
    setTimeout(() => resolve(this.num * 2), 1000);
  }
}

async function doubleNumber() {
  return await new NumberDoubler(5);
}

// UI Interactions
// event listener for showing a delayed message
document.getElementById('show-message').addEventListener('click', async () => {
  const messageDiv = document.getElementById('message-result');
  messageDiv.textContent = 'Waiting...';
  try {
    const message = await showDelayedMessage();
    messageDiv.textContent = message;
  } catch (error) {
    messageDiv.textContent = 'Error showing message';
  }
});

// Event listener for fetching quotes
document.getElementById('fetch-quotes').addEventListener('click', async () => {
  const quotesDiv = document.getElementById('quotes-result');
  quotesDiv.innerHTML = 'Fetching quotes...';

  try {
    const quotes = await fetchMultipleQuotes();
    quotesDiv.innerHTML = quotes;
  } catch (error) {
    quotesDiv.innerHTML = `Error: ${error.message}`;
  }
});

// event listener for doubling a number
document.getElementById('double-number').addEventListener('click', async () => {
  const doubleDiv = document.getElementById('double-result');
  doubleDiv.textContent = 'Calculating...';
  try {
    const result = await doubleNumber();
    doubleDiv.textContent = `Doubled: ${result}`;
  } catch (error) {
    doubleDiv.textContent = 'Error doubling number';
  }
});
