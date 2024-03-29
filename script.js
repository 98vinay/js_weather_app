const cityElement = document.querySelector(".weather__city");
const dateElement = document.querySelector(".weather__date");
const monthElement = document.querySelector(".weather__month");
const forecastElement = document.querySelector(".weather__forecast");
const temperatureElement = document.querySelector(".weather__temperature");
const iconElement = document.querySelector(".weather__icon");
const minTemperatureElement = document.querySelector(".weather__temp__min");
const maxTemperatureElement = document.querySelector(".weather__temp__max");
const realFeelElement = document.querySelector(".weather__realfeel__val");
const humidityElement = document.querySelector(".weather__humidity__val");
const windElement = document.querySelector(".weather__wind__val");
const pressureElement = document.querySelector(".weather__pressure__val");
const searchForm = document.querySelector(".weather__search");
const searchInput = document.querySelector(".weather__searchform");
const celsiusButton = document.querySelector(".weather_unit_celsius");
const fahrenheitButton = document.querySelector(".weather_unit_farenheit");

let currentUnits = "metric";
let currentSearch = "orlando";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchInput.value;
  getWeather(currentSearch);
  searchInput.value = "";
});

celsiusButton.addEventListener("click", () => {
  if (currentUnits !== "metric") {
    currentUnits = "metric";
    getWeather(currentSearch, currentUnits);
  }
});

fahrenheitButton.addEventListener("click", () => {
  if (currentUnits !== "imperial") {
    currentUnits = "imperial";
    getWeather(currentSearch, currentUnits);
  }
});

function convertTimeStamp(timestamp) {
  const date = new Date(timestamp * 1000);
  return [date.toLocaleString("default", { month: "short" }), date.getDate()];
}

function convertCountryCode(country) {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country);
}

function getWeather(query = "Orlando", units = "metric") {
  const API_KEY = "YOUR_API_KEY";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=${units}`
  )
    .then((res) => res.json())
    .then((data) => {
      const { name, sys, dt, weather, main, wind } = data;
      cityElement.innerHTML = `${name}, ${convertCountryCode(sys.country)}`;
      monthElement.innerHTML = convertTimeStamp(dt)[0];
      dateElement.innerHTML = convertTimeStamp(dt)[1];
      forecastElement.innerHTML = `<p>${weather[0].main}`;
      temperatureElement.innerHTML = `${main.temp.toFixed()}&#176`;
      iconElement.innerHTML = `   <img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
      minTemperatureElement.innerHTML = ` ${main.temp_min.toFixed()}&#176`;
      maxTemperatureElement.innerHTML = `${main.temp_max.toFixed()}&#176`;
      realFeelElement.innerHTML = `${main.feels_like.toFixed()}&#176`;
      humidityElement.innerHTML = `${main.humidity}%`;
      windElement.innerHTML = `${wind.speed} ${
        units === "imperial" ? "mph" : "m/s"
      }`;
      pressureElement.innerHTML = `${main.pressure} hPa`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

window.addEventListener("load", getWeather());
