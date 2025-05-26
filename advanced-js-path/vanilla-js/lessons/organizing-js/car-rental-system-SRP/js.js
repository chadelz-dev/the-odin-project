// Logger class for UI logging
class RentalLogger {
  static log(message) {
    const logElement = document.getElementById('rentalLog');
    logElement.textContent += `[Rental System] ${message}\n`; // Append to UI log
  }
}

// Car class for logic
class RentalCar {
  constructor(make, model, fuelLevel = 100) {
    this.make = make;
    this.model = model;
    this.fuelLevel = fuelLevel; // Percentage, 0-100
  }

  // Check if car can start
  start() {
    if (this.fuelLevel > 0) {
      RentalLogger.log(`The car ${this.make} ${this.model} started.`);
      return true;
    }
    RentalLogger.log(
      `The car ${this.make} ${this.model} failed to start: no fuel.`
    );
    return false;
  }

  // Simulate fuel consumption
  consumeFuel(amount) {
    this.fuelLevel = Math.max(0, this.fuelLevel - amount);
  }
}

// UI controller
function rentalController() {
  const car1 = new RentalCar('Toyota', 'Land Cruiser', 50);
  const car2 = new RentalCar('Honda', 'Civic', 0);

  const car1Button = document.getElementById('car1Start');
  const car2Button = document.getElementById('car2Start');
  const car1Status = document.getElementById('car1Status');
  const car2Status = document.getElementById('car2Status');

  car1Button.addEventListener('click', () => {
    car1.start();
    car1.consumeFuel(10); // Simulate fuel use
    car1Status.textContent = `Toyota Land Cruiser: Fuel ${car1.fuelLevel}%`;
  });

  car2Button.addEventListener('click', () => {
    car2.start();
    car2Status.textContent = `Honda Civic: Fuel ${car2.fuelLevel}%`;
  });
}

rentalController();
