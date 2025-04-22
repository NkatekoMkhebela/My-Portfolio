const locationEl = document.getElementById("location");
const weatherEl = document.getElementById("weather");

function fetchWeather(lat, lon) {
  const apiKey = '569ac866cf1b69aaa306fbd2b3cb984b';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const temp = data.main.temp;
      const city = data.name;
      const description = data.weather[0].description;

      locationEl.textContent = `📍 ${city}`;
      weatherEl.textContent = `🌤️ ${temp}°C, ${description}`;
    })
    .catch(() => {
      weatherEl.textContent = "Weather unavailable.";
    });
}

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      () => {
        locationEl.textContent = "Location blocked.";
        weatherEl.textContent = "N/A";
      }
    );
  } else {
    locationEl.textContent = "Geolocation not supported.";
    weatherEl.textContent = "N/A";
  }
}

if (locationEl && weatherEl) getLocation();

