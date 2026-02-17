const API_KEY = "c0ef75261a97cb8945e927fb43a01d09";

const getWeather = () => {
  const city = document.getElementById("cityInput").value.trim();
  const msg = document.getElementById("msg");
  const weatherRow = document.getElementById("weatherRow");
  const loader = document.getElementById("loader");

  if (!city) {
    msg.innerText = "Type a city first.";
    weatherRow.innerHTML = "";
    return;
  }

  msg.innerText = "";
  weatherRow.innerHTML = "";
  loader.style.display = "flex";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      loader.style.display = "none";

      if (+data.cod !== 200) { // Ensure cod is a number
        msg.innerText = data.message || "City not found";
        msg.style.color = "red";
        return;
      }

      msg.innerText = "";
      msg.style.color = "black";

      // Display all weather objects dynamically
      let weatherHTML = (data.weather || []).map(w => `
        <div>
          <h5>${w.main} - ${w.description}</h5>
          <img src="https://openweathermap.org/img/wn/${w.icon}@2x.png" alt="${w.main}">
        </div>
      `).join("");

      const cardHTML = `
        <div class="col-md-6 col-lg-4">
          <div class="card">
            <h4>${data.name}, ${data.sys.country}</h4>
            ${weatherHTML}
            <div class="weather-info">
              <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
              <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
              <p><strong>Min/Max:</strong> ${data.main.temp_min}°C / ${data.main.temp_max}°C</p>
              <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
              <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
              <p><strong>Wind:</strong> ${data.wind.speed} m/s, ${data.wind.deg}°</p>
              <p><strong>Clouds:</strong> ${data.clouds.all}%</p>
              <p><strong>Visibility:</strong> ${data.visibility} m</p>
            </div>
          </div>
        </div>
      `;

      weatherRow.innerHTML = cardHTML;
    })
    .catch(err => {
      loader.style.display = "none";
      msg.innerText = "Error fetching weather data";
      msg.style.color = "red";
      console.error(err);
    });
};
