// unique variable names: sensorBtn, displaySensorData, sensorOutput
const sensorBtn = document.getElementById('sensorBtn');
const sensorOutput = document.getElementById('sensorOutput');

// simulate fetching soil moisture data from a sensor (async with setTimeout)
function fetchSoilMoisture(callback) {
  setTimeout(() => {
    const moistureLevel = 42; // mock data
    callback(null, moistureLevel); // success: pass null error, data
  }, 1000);
}

// callback function to display data
function displaySensorData(error, data) {
  if (error) {
    sensorOutput.textContent = `Error: ${error.message}`;
    return;
  }
  sensorOutput.textContent = `Soil Moisture: ${data}`;
}

// event listener with callback
sensorBtn.addEventListener('click', () => {
  sensorOutput.textContent = 'Fetching...';
  fetchSoilMoisture(displaySensorData); // pass callback to handle result
});
