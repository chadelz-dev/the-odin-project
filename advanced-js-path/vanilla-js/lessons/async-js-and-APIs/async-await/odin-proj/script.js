const odinServer = {
  people: [
    { name: 'Odin', age: 100 },
    { name: 'Thor', age: 25 },
    { name: 'Freyja', age: 22 },
  ],
  getPeople() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.people), 2000); // simulate network delay
    });
  },
};

// 1. basic async function:
async function getPersonInfo(personName) {
  const peopleList = await odinServer.getPeople();
  return peopleList.find((person) => person.name === personName);
}

// 2. error handling with try/catch:
async function getPersonInfoWithError(personName) {
  try {
    const peopleList = await odinServer.getPeople();
    const person = peopleList.find((p) => p.name === personName);
    // if no person found, throw an error
    if (!person) throw new Error('Person not found');
    return person;
  } catch (error) {
    throw error;
  }
}

// 3. practical example fetching a radnom quote:
async function fetchRandomQuote() {
  try {
    // abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    // fetch quote from API
    const quoteResponse = await fetch('https://dummyjson.com/quotes/random', {
      signal: controller.signal,
    });

    // clear timeout for next fetch
    clearTimeout(timeoutId);

    // if quoteResponse.ok is false, throw an error
    if (!quoteResponse.ok) throw new Error('Failed to fetch quote');

    // otherwise parse the response as JSON
    const quoteData = await quoteResponse.json();
    // return the quote and author
    return `"${quoteData.quote}" - ${quoteData.author}`;
    // catch any errors thrown by fetch or JSON parsing
  } catch (error) {
    throw new Error(`Quote fetch error: ${error.message}`);
  }
}

// ui interactions:
document.getElementById('fetch-person').addEventListener('click', async () => {
  const resultDiv = document.getElementById('person-result');
  resultDiv.textContent = 'fetching...';

  try {
    const person = await getPersonInfo('Thor');
    resultDiv.textContent = `Name: ${person.name}, Age: ${person.age}`;
  } catch (error) {
    resultDiv.textContent = 'Error fetching person';
  }
});

document.getElementById('fetch-error').addEventListener('click', async () => {
  const errorDiv = document.getElementById('error-result');
  errorDiv.textContent = 'fetching...';

  try {
    await getPersonInfoWithError('Loki');
    errorDiv.textContent = 'Person found (unexpected)';
  } catch (error) {
    errorDiv.textContent = `Error: ${error.message}`;
  }
});

document.getElementById('fetch-quote').addEventListener('click', async () => {
  const quoteDiv = document.getElementById('quote-result');
  quoteDiv.textContent = 'fetching...';

  try {
    const quote = await fetchRandomQuote();
    quoteDiv.textContent = quote;
  } catch (error) {
    quoteDiv.textContent = `Error: ${error.message}`;
  }
});
