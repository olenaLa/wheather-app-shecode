// 1
let now = new Date();
let currentDate = document.querySelector("#current-date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
let minutes = addZero(now.getMinutes());
let hours = addZero(now.getHours());
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

// week 5 - API

function displayCity(response) {
  celsiusTemperature = response.data.main.temp;
  let searchCity = document.querySelector("#search-city");
  let searchTemp = document.querySelector("#search-temperature");
  let searchDescription = document.querySelector("#description");
  let searchHumidity = document.querySelector("#humidity");
  let searchPressure = document.querySelector("#pressure");
  let searchWind = document.querySelector("#wind");
  let searchIcon = document.querySelector("#icon");
  searchCity.innerHTML = response.data.name;
  searchTemp.innerHTML = Math.round(celsiusTemperature);
  searchDescription.innerHTML = response.data.weather[0].description;
  searchHumidity.innerHTML = response.data.main.humidity;
  searchPressure.innerHTML = response.data.main.pressure;
  searchWind.innerHTML = Math.round(response.data.wind.speed);
  searchIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showSearchValues(city) {
  let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayCity);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  showSearchValues(searchInput.value);
}

function displayWeather(response) {
  let currentLoc = document.querySelector("#current-city");
  let currentT = document.querySelector("#current-temp");
  currentLoc.innerHTML = `${response.data.name} `;

  currentT.innerHTML = Math.round(response.data.main.temp) + `${"°C"}`;
}
function showCurrentCity(position) {
  let key = "b2d9fa1f2b35557e4615dd5fab218834";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentCity);
}
let currentLocationButton = document.querySelector("button");
currentLocationButton.addEventListener("click", getCurrentPosition);

function displaFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#search-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#search-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displaFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
showSearchValues("Kyiv");
