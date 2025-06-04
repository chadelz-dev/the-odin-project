// setup variables
const baseCurrencySelect = document.getElementById('base-currency-select');
const targetCurrencySelect = document.getElementById('target-currency-select');
const exchangeRateDisplay = document.getElementById('exchange-rate-display');

// fetch and populate currency dropdowns with codes
function loadCurrencies() {
  const url = 'https://api.exchangerate-api.com/v4/latest/USD';

  fetch(url, { mode: 'cors' })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch currencies');
      }
      return response.json();
    })
    .then((data) => {
      // extract currency codes from rates object
      const codes = Object.keys(data.rates).sort(); // sort alphabetically

      // populate dropdowns
      codes.forEach((code) => {
        const option1 = document.createElement('option');
        option1.value = code;
        option1.textContent = code; // display only the code (eg: USD)
        baseCurrencySelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = code;
        option2.textContent = code; // display only the code (eg: USD)
        targetCurrencySelect.appendChild(option2);
      });
    })
    .catch((error) => {
      exchangeRateDisplay.textContent = `Error loading currencies: ${error}`;
    });
}

function fetchExchangeRate(base, target) {
  const url = `https://api.exchangerate-api.com/v4/latest/${base}`;

  fetch(url, { mode: 'cors' })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate');
      }
      return response.json();
    })
    .then((data) => {
      const rate = data.rates[target];
      if (!rate) {
        throw new Error(`Target Currency ${target} not supported`);
      }
      // display formatted exchange rate with codes only
      exchangeRateDisplay.textContent = `1 ${base} = ${rate.toFixed(
        2
      )} ${target}`;
    })
    .catch((error) => {
      exchangeRateDisplay.textContent = `Error: ${error.message}`;
    });
}

// populate dropdowns on page load
loadCurrencies();

// fetch rate when currencies are selected
baseCurrencySelect.addEventListener('change', () => {
  const base = baseCurrencySelect.value;
  const target = targetCurrencySelect.value;

  if (base && target) {
    fetchExchangeRate(base, target);
  }
});

targetCurrencySelect.addEventListener('change', () => {
  const base = baseCurrencySelect.value;
  const target = targetCurrencySelect.value;

  if (base && target) {
    fetchExchangeRate(base, target);
  }
});
