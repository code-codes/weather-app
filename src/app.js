function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

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
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response) {
    //console.log(response)
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML =
                forecastHTML +
                `
      <div class="col-2">
        <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon
                }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
                    forecastDay.temp.max
                )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                )}° </span>
        </div>
      </div>
  `;
        }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "838bec9abd11558913af515ee10158b6";
    let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast)
}

function displayTemperature(response) {
    //console.log(response)
    let invalidMsgElement = document.querySelector("#invalidmsg")
    let temperatureElement = document.querySelector("#temperatureValue");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    invalidMsgElement.innerHTML = "";

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

function search(city) {
    let apiKey = "838bec9abd11558913af515ee10158b6";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature).catch((error) => {
        console.log(error)
        let invalidMsgElement = document.querySelector("#invalidmsg");
        invalidMsgElement.innerHTML = "Sorry, Couldnt find your search";
    });;
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#search-input-text");
    search(cityInputElement.value);
    cityInputElement.value = ""
}


let form = document.querySelector(".search-form")
form.addEventListener("submit", handleSubmit)

let celsiusTemperature = null;
search("New York");


function tofahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperatureValue");

    celcius.classList.remove("active");
    fahrenheit.classList.add("active");
    console.log(celsiusTemperature)
    let fahrenheiTemperature = ((celsiusTemperature * 9) / 5) + 32;
    console.log(fahrenheiTemperature)
    temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function tocelcius(event) {
    event.preventDefault();
    celcius.classList.add("active");
    fahrenheit.classList.remove("active");
    let temperatureElement = document.querySelector("#temperatureValue");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let celcius = document.querySelector("#celcius")
celcius.addEventListener("click", tocelcius);

let fahrenheit = document.querySelector("#fahrenheit")
fahrenheit.addEventListener("click", tofahrenheit);