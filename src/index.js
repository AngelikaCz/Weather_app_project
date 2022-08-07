function displayWeather(data) {
  let displayedTemperature = document.querySelector("#temperature");
  displayedTemperature.innerHTML = Math.round(data.data.main.temp);
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
  displayedIcon.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${data.data.weather[0].description}@2x.png`
  );
}

function getDate(timestamp) {
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
