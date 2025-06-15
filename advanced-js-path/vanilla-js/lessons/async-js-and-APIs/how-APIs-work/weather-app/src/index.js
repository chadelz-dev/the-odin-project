import { getElement } from './utils.js';
import { fetchWeather, fetchCities } from './weather.js';
import { displayWeather, displaySuggestions } from './display.js';
import './styles.css';

// Select DOM elements
const cityInput = getElement('#cityInput');
const getWeatherBtn = getElement('#getWeatherBtn');
const weatherDisplay = getElement('#weatherDisplay');
const suggestionsDiv = getElement('#suggestions');

// Test log to confirm index.js loads
console.log('index.js loaded');

// Event listener for input typing (autocomplete)
cityInput.addEventListener('input', async () => {
  const query = cityInput.value.trim();
  console.log('User input:', query);
  if (query.length < 2) {
    suggestionsDiv.innerHTML = '';
    return;
  }
  const cities = await fetchCities(query);
  console.log('Cities from geocoding:', cities);
  displaySuggestions(
    cities,
    suggestionsDiv,
    cityInput,
    fetchWeather,
    displayWeather,
    weatherDisplay
  );
});

// Event listener for button click (fetch weather)
getWeatherBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  console.log('Button clicked with city:', city);
  if (!city) {
    displayWeather(null, weatherDisplay);
    return;
  }
  const cities = await fetchCities(city);
  console.log('Cities for weather fetch:', cities);
  if (cities.length > 0) {
    const { latitude, longitude } = cities[0];
    console.log('Selected coordinates:', { latitude, longitude });
    const data = await fetchWeather(latitude, longitude);
    console.log('Weather data:', data);
    displayWeather(data, weatherDisplay);
  } else {
    displayWeather(null, weatherDisplay);
  }
});
