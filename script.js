// REPLACE 'YOUR_OPENWEATHER_API_KEY_HERE' WITH YOUR ACTUAL API KEY FROM OPENWEATHER
const API_KEY = '478c6b41d51efdde9760977352062a45'; 

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherCard = document.getElementById('weather-card');
const errorMsg = document.getElementById('error-msg');

const locationEl = document.getElementById('location');
const weatherIconEl = document.getElementById('weather-icon');
const tempEl = document.getElementById('temperature');
const descEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind-speed');

// Event listener for the search button click
searchBtn.addEventListener('click', () => {
    getWeather(cityInput.value.trim());
});

// Event listener to allow pressing 'Enter' in the input field
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getWeather(cityInput.value.trim());
    }
});

async function getWeather(city) {
    if (!city) {
        showError('Please enter a city name.');
        return;
    }

    // Using units=metric gives Celsius. For Fahrenheit, change to units=imperial
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling.');
            } else if (response.status === 401) {
                throw new Error('Invalid API Key. Please update your script.js file.');
            } else {
                throw new Error('Something went wrong. Try again later.');
            }
        }

        const data = await response.json();
        displayWeather(data);
        
    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {
    // Hide error messages if any exist
    errorMsg.classList.add('hidden');
    
    // Populate data into HTML elements
    locationEl.textContent = `${data.name}, ${data.sys.country}`;
    tempEl.textContent = `${Math.round(data.main.temp)}°C`;
    descEl.textContent = data.weather[0].description;
    humidityEl.textContent = `${data.main.humidity}%`;
    windEl.textContent = `${data.wind.speed} m/s`;
    
    // Fetch the correct weather icon from OpenWeather assets
    const iconCode = data.weather[0].icon;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // Reveal the weather card
    weatherCard.classList.remove('hidden');
}

function showError(message) {
    weatherCard.classList.add('hidden');
    errorMsg.textContent = message;
    errorMsg.classList.remove('hidden');
}
