cityName = "Paris";
apiKey = "dee9a420d2a7b5a314d3260f8ca83eea";
apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);

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
