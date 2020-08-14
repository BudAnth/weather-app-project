// display current time as h3

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

// define global variables for use in multiple functions

let currentTempCelsius = null;
let temperature = null;
let apiKey = "8c1527d5b6b661420a7bcaa7170c7301";

// display city, temp, conditions when the user has submitted their city

function displayData(response) {
  console.log(response);

  temperature = Math.round(response.data.main.temp);
  let name = response.data.name;
  let description = response.data.weather[0].description;

  let windspeed = Math.round(2.23694 * response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let sunrise = new Date(1000 * response.data.sys.sunrise);
  let sunriseHour = sunrise.getHours();
  if (sunriseHour < 10) {
    sunriseHour = `0${sunriseHour}`;
  }
  let sunriseMinute = sunrise.getMinutes();
  if (sunriseMinute < 10) {
    sunriseMinute = `0${sunriseMinute}`;
  }
  let sunset = new Date(1000 * response.data.sys.sunset);
  let sunsetHour = sunset.getHours();
  if (sunsetHour < 10) {
    sunsetHour = `0${sunsetHour}`;
  }
  let sunsetMinute = sunset.getMinutes();
  if (sunsetMinute < 10) {
    sunsetMinute = `0${sunsetMinute}`;
  }
  let iconType = response.data.weather[0].icon;

  currentTempCelsius = response.data.main.temp;

  let currentName = document.querySelector("h2");
  let currentTemperature = document.querySelector(".temp-number");
  let currentDescription = document.querySelector("#description");
  let currentWindspeed = document.querySelector("#windspeed");
  let currentHumidity = document.querySelector("#humidity");
  let currentSunrise = document.querySelector("#sunrise");
  let currentSunset = document.querySelector("#sunset");
  let currentIcon = document.querySelector("#current-icon");

  currentName.innerHTML = `${name}`;
  currentTemperature.innerHTML = `${temperature}°`;
  currentDescription.innerHTML = `Description: <span class="tt">  ${description} </span>`;
  currentWindspeed.innerHTML = `Windspeed:   ${windspeed} mph`;
  currentHumidity.innerHTML = `Humidity:   ${humidity} %`;
  currentSunrise.innerHTML = `Sunrise:   ${sunriseHour}:${sunriseMinute}`;
  currentSunset.innerHTML = `Sunset:   ${sunsetHour}:${sunsetMinute}`;
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconType}@2x.png`
  );
}

// format the time for use in the forecast

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// display the forecast and icons

function displayForecast(response) {
  console.log(response);

  let precipitation = Math.round(response.data.list[0].pop * 100);
  let currentPrecip = document.querySelector("#precipitation");
  currentPrecip.innerHTML = `Chance of precipitation: ${precipitation} %`;

  let currentForecast = document.querySelector("#forecast");
  let forecast = null;
  currentForecast.innerHTML = null;

  for (let index = 0; index < 5; index++) {
    let forecast = response.data.list[index];

    currentForecast.innerHTML += `        <div class="col-1 thisWeek">
          ${formatHours(forecast.dt * 1000)}
          <br />
          <span class="thisWeekEmoji">
            <img            src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png"
            alt="">
          </span>
          <br />
          ${Math.round(forecast.main.temp_max)}°
        </div>`;
  }

  let jacket = document.querySelector("#jacket");
  let country = response.data.city.country;

  // make a comment about the need for a jacket

  if (precipitation > 50) {
    jacket.innerHTML = "Take a jacket. It's likely to rain.";
  } else {
    if (country === "GB") {
      jacket.innerHTML = "This is Britain. Always take a jacket.";
    } else {
      jacket.innerHTML = "";
    }
  }
}

// grab the data from the city the user has entered

function changeCity(city) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(displayData);

  apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(displayForecast);
}

// accept user city input

function submitForm(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");
  changeCity(cityInput.value);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", submitForm);

// celsius / fahrenheit toggle

function changeToFahrenheit(event) {
  event.preventDefault();
  toCelsius.classList.remove("active");
  toFahrenheit.classList.add("active");
  let currentTempInF = Math.round((currentTempCelsius * 9) / 5 + 32);
  let tempInF = document.querySelector(".temp-number");
  tempInF.innerHTML = `${currentTempInF}°`;
}

let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", changeToFahrenheit);

function changeToCelsius(event) {
  event.preventDefault();
  toFahrenheit.classList.remove("active");
  toCelsius.classList.add("active");
  let tempInC = document.querySelector(".temp-number");
  let currentTempInC = Math.round(currentTempCelsius);
  tempInC.innerHTML = `${currentTempInC}°`;
}

let toCelsius = document.querySelector("#celsius");
toCelsius.addEventListener("click", changeToCelsius);

// get current location

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayData);

  url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${url}&appid=${apiKey}`).then(displayForecast);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocButton = document.querySelector("#change-loc");
currentLocButton.addEventListener("click", getLocation);

// changeCity("London");

getLocation();
