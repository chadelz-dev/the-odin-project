// In-memory array to store all Jedis
let allJedis = [
  {
    jediName: 'Luke Skywalker',
    age: 53,
    alias: 'Farmboy',
    forcePowers: ['Telekinesis', 'Mind Trick', 'Force Leap'],
  },
  {
    jediName: 'Ahsoka Tano',
    age: 45,
    alias: 'Snips',
    forcePowers: ['Dual Lightsaber Combat', 'Force Push', 'Enhanced Agility'],
  },
];

// Initialize app
function initJediApp() {
  // Simulated JSON for order info
  const jediOrderJson = `{
    "orderName": "Jedi Order",
    "homePlanet": "Coruscant",
    "founded": -232,
    "temple": "Jedi Temple",
    "isActive": false
  }`;

  const jediOrderData = JSON.parse(jediOrderJson); // Parse JSON
  populateOrderHeader(jediOrderData); // Fill header
  renderJediCards(); // Render initial Jedis
  setupJediForm(); // Set up form
}

// Populate header
function populateOrderHeader(orderObj) {
  const header = document.querySelector('header');
  const orderTitle = document.createElement('h1');
  orderTitle.textContent = orderObj.orderName;
  header.appendChild(orderTitle);

  const orderDetails = document.createElement('p');
  orderDetails.textContent = `Home Planet: ${orderObj.homePlanet} // Founded: ${orderObj.founded}`;
  header.appendChild(orderDetails);
}

// Render all Jedi cards
function renderJediCards() {
  const jediOutput = document.getElementById('jediOutput');
  jediOutput.innerHTML = ''; // Clear existing cards

  for (const jedi of allJedis) {
    const jediCard = document.createElement('article');
    const jediNameEl = document.createElement('h2');
    const jediAliasEl = document.createElement('p');
    const jediAgeEl = document.createElement('p');
    const jediPowersLabel = document.createElement('p');
    const jediPowersList = document.createElement('ul');

    jediNameEl.textContent = jedi.jediName;
    jediAliasEl.textContent = `Alias: ${jedi.alias}`;
    jediAgeEl.textContent = `Age: ${jedi.age}`;
    jediPowersLabel.textContent = 'Force Powers:';

    for (const power of jedi.forcePowers) {
      const powerItem = document.createElement('li');
      powerItem.textContent = power;
      jediPowersList.appendChild(powerItem);
    }

    jediCard.appendChild(jediNameEl);
    jediCard.appendChild(jediAliasEl);
    jediCard.appendChild(jediAgeEl);
    jediCard.appendChild(jediPowersLabel);
    jediCard.appendChild(jediPowersList);
    jediOutput.appendChild(jediCard);
  }
}

// Handle form submission
function setupJediForm() {
  const jediForm = document.getElementById('jediForm');
  jediForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newJedi = {
      jediName: document.getElementById('jediNameInput').value,
      age: Number(document.getElementById('jediAgeInput').value),
      alias: document.getElementById('jediAliasInput').value,
      forcePowers: document
        .getElementById('jediPowersInput')
        .value.split(',')
        .map((power) => power.trim()),
    };

    const newJediJson = JSON.stringify(newJedi); // Serialize
    const parsedJedi = JSON.parse(newJediJson); // Parse back

    allJedis.push(parsedJedi); // Add to array
    renderJediCards(); // Re-render list

    jediForm.reset(); // Clear form
  });
}

// Start app
initJediApp();
