// let celsiusTemperature = Math.round(temperature);
// let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);
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

// 2
// function showSearchValues(event) {
//   event.preventDefault();
//   let searchForm = document.querySelector("#search-input");
//   console.log(searchForm.value);
//   searchForm.addEventListener("keydown", function (e) {
//     if (e.code === "Enter") {
//       // let searchCity = document.querySelector("#current-city");
//       // searchCity.innerHTML = `${searchForm.value}`;
//     }
//   });
// }
// week 5 - API
function showSearchValues(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let searchCity = document.querySelector("#search-city");
  searchCity.innerHTML = `${searchInput.value}`;
  console.log(searchInput.value);
  let city = searchInput.value;
  let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayCity);
  function displayCity(response) {
    console.log(response);
    let temperature = Math.round(response.data.main.temp);
    let searchTemp = document.querySelector("#search-temperature");
    let searchDescription = document.querySelector("#description");
    let searchHumidity = document.querySelector("#humidity");
    let searchPressure = document.querySelector("#pressure");
    let searchWind = document.querySelector("#wind");
    let searchIcon = document.querySelector("#icon");
    searchTemp.innerHTML = `${temperature} °C`;
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
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showSearchValues);

// bonus

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);

  console.log(`It is ${temperature} degrees`);
  let currentLoc = document.querySelector("#current-city");
  let currentT = document.querySelector("#current-temp");
  currentLoc.innerHTML = `${response.data.name} `;

  currentT.innerHTML = `${temperature} °C`;
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
