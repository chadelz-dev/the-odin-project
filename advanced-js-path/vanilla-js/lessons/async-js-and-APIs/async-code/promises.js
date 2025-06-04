// weather data using promises
const weatherBtn = document.getElementById('weatherBtn');
const weatherOutput = document.getElementById('weatherOutput');

// returns a promise that resolves with the weather data
function fetchWeatherData(location) {
  return new Promise((resolve, reject) => {
    // simulate async API call
    setTimeout(() => {
      if (location === 'farmA') {
        resolve({ temp: 22, condition: 'Sunny', humidity: 50 }); // success
      } else {
        reject(new Error('Invalid farm location')); // failure
      }
    }, 1000);
  });
}

// handle weather button click with Promise
weatherBtn.addEventListener('click', () => {
  weatherOutput.textContent = 'Fetching Weather Data...';

  fetchWeatherData('farmA')
    .then((data) => {
      // handle successful result
      weatherOutput.textContent = `Weather: ${data.temp}°C, ${data.condition}`;
      return data.temp; // pass to next .then
    })
    .then((temp) => {
      // chain to process temperature
      weatherOutput.textContent += ` | Irrigation: ${temp > 20 ? 'on' : 'off'}`;
    })
    .catch((error) => {
      // handle errors
      weatherOutput.textContent = `Error: ${error.message}`;
    })
    .finally(() => {
      //cleanup
      console.log('Weather fetch complete');
    });
});

// ////////////////////////////////////////////////////////////////////////////

// fetching multiple sensor data with Promise.all
const multiSensorBtn = document.getElementById('multiSensorBtn');
const multiSensorOutput = document.getElementById('multiSensorOutput');

// Simulate fetching soil data
function fetchSoilData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ moisture: 42 }), 1000); // Mock soil data
  });
}

// Simulate fetching temperature data
function fetchTempData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve({ temp: 22 }); // Success
      } else {
        reject(new Error('Temperature sensor offline')); // Random failure
      }
    }, 1500);
  });
}

// Handle multiple sensors
multiSensorBtn.addEventListener('click', () => {
  multiSensorOutput.textContent = 'Fetching sensor data...';
  Promise.all([fetchSoilData(), fetchTempData()])
    .then(([soil, temp]) => {
      // Handle all results
      multiSensorOutput.textContent = `Soil: ${soil.moisture}% | Temp: ${temp.temp}°C`;
    })
    .catch((error) => {
      // Handle errors
      multiSensorOutput.textContent = `Error: ${error.message}`;
    });
});

// ////////////////////////////////////////////////////////////////////////////

// event loop demo with promises and callbacks
const eventLoopBtn = document.getElementById('eventLoopBtn');
const eventLoopOutput = document.getElementById('eventLoopOutput');

function eventLoopDemo() {
  eventLoopOutput.textContent += 'Start\n'; // 1: synchronous code
  setTimeout(() => (eventLoopOutput.textContent += 'Timeout\n'), 0); // 3: callback queue

  Promise.resolve('Promise').then(
    (data) => (eventLoopOutput.textContent += `${data}\n`) // 2: microstack
  );

  eventLoopOutput.textContent += 'End\n'; // 1 synchronous
}

eventLoopBtn.addEventListener('click', () => {
  eventLoopOutput.textContent = ''; // clear output
  eventLoopDemo();
});
