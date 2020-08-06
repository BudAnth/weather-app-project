// display date as h3

let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = [
  "Jan",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let minutes = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
];

let currentTime = `${days[now.getDay()]} ${now.getDate()} ${
  months[now.getMonth()]
}, ${now.getHours()}:${minutes[now.getMinutes()]}`;

let h3 = document.querySelector("h3");
h3.innerHTML = `${currentTime}`;

// display city and temp when the user has submitted their city

function displayData(response) {
  console.log(response);
  let cityInput = document.querySelector("#city-input");

  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let windspeed = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let sunrise = new Date(1000 * response.data.sys.sunrise);
  let sunriseHour = sunrise.getHours();
  let sunriseMinute = sunrise.getMinutes();
  let sunset = new Date(1000 * response.data.sys.sunset);
  let sunsetHour = sunset.getHours();
  let sunsetMinute = sunset.getMinutes();
  let iconType = response.data.weather[0].icon;

  let currentTemperature = document.querySelector(".temp-number");
  let currentDescription = document.querySelector("#description");
  let currentWindspeed = document.querySelector("#windspeed");
  let currentHumidity = document.querySelector("#humidity");
  let currentSunrise = document.querySelector("#sunrise");
  let currentSunset = document.querySelector("#sunset");
  let currentIcon = document.querySelector("#current-icon");

  currentTemperature.innerHTML = `${temperature}°`;
  currentDescription.innerHTML = `${description}`;
  currentWindspeed.innerHTML = `${windspeed} km/h`;
  currentHumidity.innerHTML = `${humidity} %`;
  currentSunrise.innerHTML = `${sunriseHour}:${sunriseMinute}`;
  currentSunset.innerHTML = `${sunsetHour}:${sunsetMinute}`;
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconType}@2x.png`
  );

  let date = new Date(sunrise);
  console.log(days[date.getDay()]);
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${cityInput.value}`;
  let apiKey = "8c1527d5b6b661420a7bcaa7170c7301";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;

  axios.get(`${apiURL}&appid=${apiKey}`).then(displayData);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", changeCity);

// celsius / fahrenheit toggle

function changeToFahrenheit(event) {
  event.preventDefault();
  let currentTemp = Math.round(response.data.main.temp);
  let currentTempInF = (currentTemp * 9) / 5 + 32;
  let tempInF = document.querySelector(".temp-number");
  tempInF.innerHTML = `${currentTempInF}`;
}

let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", changeToFahrenheit);

function changeToCelsius(event) {
  event.preventDefault();
  let tempInC = document.querySelector(".temp-number");
  tempInC.innerHTML = "15°";
}

let toCelsius = document.querySelector("#celsius");
toCelsius.addEventListener("click", changeToCelsius);

// get current location

function showWeather(response) {
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  h2.innerHTML = `${response.data.name}`;
  let tempInF = document.querySelector(".temp-number");
  tempInF.innerHTML = `${temperature}°`;
}

function retrievePosition(position) {
  let apiKey = "8c1527d5b6b661420a7bcaa7170c7301";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocButton = document.querySelector("button");
currentLocButton.addEventListener("click", getLocation);
