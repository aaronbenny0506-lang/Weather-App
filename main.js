const apiKey = "YOUR_OPENWEATHER_API_KEY"; // Replace with your actual key from openweathermap.org
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');
const errorMsg = document.getElementById('error-message');

const locationEl = document.getElementById('location');
const tempEl = document.getElementById('temperature');
const descEl = document.getElementById('description');
const iconEl = document.getElementById('weather-icon');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind-speed');

async function checkWeather(city) {
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // Inject content updates dynamically into UI nodes
    locationEl.textContent = `${data.name}, ${data.sys.country}`;
    tempEl.textContent = `${Math.round(data.main.temp)}°C`;
    descEl.textContent = data.weather[0].description;
    humidityEl.textContent = `${data.main.humidity}%`;
    windEl.textContent = `${data.wind.speed} m/s`;
    
    // Set weather icon condition status indicator
    const iconCode = data.weather[0].icon;
    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Toggle layouts to hide error context and present weather metrics
    errorMsg.style.display = 'none';
    weatherDisplay.style.display = 'block';

  } catch (error) {
    weatherDisplay.style.display = 'none';
    errorMsg.style.display = 'block';
  }
}

searchBtn.addEventListener('click', () => {
  checkWeather(cityInput.value.trim());
});

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkWeather(cityInput.value.trim());
  }
});