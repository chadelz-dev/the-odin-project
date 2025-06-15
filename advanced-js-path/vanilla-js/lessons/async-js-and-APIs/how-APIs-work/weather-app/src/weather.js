export async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    console.log('Raw weather JSON:', data);
    if (!data.current) throw new Error('No current weather data available');
    const temperature = data.current.temperature_2m;
    const windSpeed = data.current.wind_speed_10m;
    console.log('Extracted weather data:', { temperature, windSpeed });
    return { temperature, windSpeed };
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    return null;
  }
}

export async function fetchCities(query) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    console.log('Raw city JSON:', data);
    return data.results || [];
  } catch (error) {
    console.error('Error fetching cities:', error.message);
    return [];
  }
}
