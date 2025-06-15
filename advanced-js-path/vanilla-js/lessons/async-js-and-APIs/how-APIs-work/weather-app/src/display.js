export function displayWeather(data, weatherDisplay) {
  if (data) {
    weatherDisplay.innerHTML = `
      <p>Temperature: ${data.temperature} °C</p>
      <p>Wind Speed: ${data.windSpeed} km/h</p>
    `;
  } else {
    weatherDisplay.innerHTML = '<p>Error fetching weather data.</p>';
  }
}

export function displaySuggestions(
  cities,
  suggestionsDiv,
  cityInput,
  fetchWeather,
  displayWeather,
  weatherDisplay
) {
  suggestionsDiv.innerHTML = '';
  if (cities.length === 0) return;

  cities.forEach((city) => {
    const suggestion = document.createElement('div');
    suggestion.className = 'suggestion';
    suggestion.textContent = `${city.name}, ${city.country}`;
    suggestion.addEventListener('click', () => {
      cityInput.value = city.name;
      suggestionsDiv.innerHTML = '';
      fetchWeather(city.latitude, city.longitude).then(
        (data) => displayWeather(data, weatherDisplay) // Use passed parameter
      );
    });
    suggestionsDiv.appendChild(suggestion);
  });
}
