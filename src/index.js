function getForecast(coords) {
  let apiKey = "dee9a420d2a7b5a314d3260f8ca83eea";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayForecast);
}

function displayWeather(data) {
  let displayedTemperature = document.querySelector("#temperature");
  celsiusTemp = data.data.main.temp;
  displayedTemperature.innerHTML = Math.round(celsiusTemp);
  let displayedHumidity = document.querySelector("#humidity");
  displayedHumidity.innerHTML = data.data.main.humidity;
  let displayedWind = document.querySelector("#wind");
  displayedWind.innerHTML = Math.round(data.data.wind.speed);
  let displayedDescription = document.querySelector("#description");
  displayedDescription.innerHTML = data.data.weather[0].description;
  let displayedDate = document.querySelector("#date");
  displayedDate.innerHTML = getDate(data.data.dt * 1000);
  let displayedIcon = document.querySelector("#icon");
  displayedIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`
  );
  displayedIcon.setAttribute("alt", data.data.weather[0].description);

  getForecast(data.data.coord);
}

https: function getDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function lookForCity(city) {
  apiKey = "dee9a420d2a7b5a314d3260f8ca83eea";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let clickedButton = document.querySelector("#search_button");
clickedButton.addEventListener("click", searchCity);

function searchCity(event) {
  event.preventDefault();
  let insertedCity = document.querySelector("#city-name");
  lookForCity(insertedCity.value);
  let displayedCity = document.querySelector("#city");
  displayedCity.innerHTML = insertedCity.value;
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#temperature");
  let fahrenheitCalculation = celsiusTemp * 1.8 + 32;
  fahrenheitTemp.innerHTML = Math.round(fahrenheitCalculation);
  toCelsius.classList.remove("notactive");
  toFahrenheit.classList.add("notactive");
}

function showCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector("#temperature");
  celsiusTemperature.innerHTML = Math.round(celsiusTemp);
  toCelsius.classList.add("notactive");
  toFahrenheit.classList.remove("notactive");
}

function formatForecastDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = days[date.getDay()];

  return day;
}

function displayForecast(reply) {
  let forecastShown = document.querySelector("#forecast");

  let forecast = reply.data.daily;

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <span>${formatForecastDays(forecastDay.dt)}</span>
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=${forecastDay.weather[0].description}
                width="50px;"
              />
              <div class="forecast-temp">
                ${Math.round(
                  forecastDay.temp.max
                )}° <span class="min-forecast"> ${Math.round(
          forecastDay.temp.min
        )}°</span>
              </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastShown.innerHTML = forecastHTML;
}

let celsiusTemp = null;

let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", showFahrenheit);

let toCelsius = document.querySelector("#celsius");
toCelsius.addEventListener("click", showCelsius);

lookForCity("Warsaw");
