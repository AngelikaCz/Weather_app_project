cityName = "Paris";
apiKey = "dee9a420d2a7b5a314d3260f8ca83eea";
apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

axios.get(apiUrl).then(displayWeather);

function displayWeather(data) {
  console.log(data.data);
}
