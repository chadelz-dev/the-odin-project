// Unique variables: xhrButton, fetchButton, xhrRequest, fetchRates, comparisonDisplay
const xhrButton = document.getElementById('xhr-button');
const fetchButton = document.getElementById('fetch-button');
const comparisonDisplay = document.getElementById('comparison-display');

function makeXhrRequest() {
  let xhrRequest;
  if (window.XMLHttpRequest) {
    xhrRequest = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    // Fixed: Changed ActiveXhrRequest to ActiveXObject
    try {
      xhrRequest = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
      try {
        xhrRequest = new ActiveXObject('Microsoft.XMLHTTP');
      } catch (e) {
        comparisonDisplay.textContent = 'Error: XMLHttpRequest not supported';
        return;
      }
    }
  }
  xhrRequest.open(
    'GET',
    'https://api.exchangerate-api.com/v4/latest/USD',
    true
  );
  xhrRequest.onreadystatechange = function () {
    if (xhrRequest.readyState === 4) {
      if (xhrRequest.status === 200) {
        const data = JSON.parse(xhrRequest.responseText);
        comparisonDisplay.textContent = `XMLHttpRequest: USD to EUR = ${data.rates.EUR.toFixed(
          2
        )}`;
      } else {
        comparisonDisplay.textContent = 'XMLHttpRequest: Failed to fetch data';
      }
    }
  };
  xhrRequest.send(null);
}

function fetchRates() {
  // Renamed from loadRates for consistency
  fetch('https://api.exchangerate-api.com/v4/latest/USD', { mode: 'cors' })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network error');
      }
      return response.json();
    })
    .then((data) => {
      const rate = data.rates.EUR;
      comparisonDisplay.textContent = `Fetch: USD to EUR = ${rate.toFixed(2)}`;
    })
    .catch((error) => {
      comparisonDisplay.textContent = `Fetch: Error - ${error.message}`;
    });
}

xhrButton.addEventListener('click', makeXhrRequest);
fetchButton.addEventListener('click', fetchRates);
