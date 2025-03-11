const convertToCelsius = function(fTemp) {
  let finalTemp = Math.round(((fTemp - 32) * (5/9)) * 10) / 10;
  return finalTemp;
};

const convertToFahrenheit = function(cTemp) {
  let finalTemp = Math.round((cTemp * 9 / 5 + 32) * 10) / 10;
  return finalTemp;
};

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
