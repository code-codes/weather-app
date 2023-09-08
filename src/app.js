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
    console.log(`${day} ${hours}:${minutes}`)
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function getForecast(coordinates) {
    let apiKey = "838bec9abd11558913af515ee10158b6";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML =
                forecastHTML +
                `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
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


function displayTemperature(response) {
    console.log(response.data)
    let temperatureElement = document.querySelector("#temperatureValue");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    let celsiusTemperature = response.data.main.temp;

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

    //getForecast(response.data.coord);
}

function search(city) {
    let apiKey = "838bec9abd11558913af515ee10158b6";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#search-input-text");
    search(cityInputElement.value);
}


let form = document.querySelector(".search-form")
form.addEventListener("submit", handleSubmit)


search("New York");


// function tofahrenheit() {
//     let degree = document.querySelector(".temperatureValue")
//     degree.innerHTML = "66"
// }

// function tocelcius() {
//     let degree = document.querySelector(".temperatureValue")
//     degree.innerHTML = "16"
// }

// let celcius = document.querySelector("#celcius")
// celcius.addEventListener("click", tocelcius, false);

// let fahrenheit = document.querySelector("#fahrenheit")
// fahrenheit.addEventListener("click", tofahrenheit, false);




// let apikey = "838bec9abd11558913af515ee10158b6"
// let city = "London"
// let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`

// axios.get(`${apiurl}&appid=${apikey}`).then((response) => {
//     console.log(response)
//     let temperature = Math.round(response.data.main.temp)
//     let temperatureElement = document.querySelector(".temperatureValue")
//     temperatureElement.innerHTML = temperature
// })