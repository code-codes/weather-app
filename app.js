let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = days[now.getDay()]
let dy = document.querySelector(".day")
dy.innerHTML = day
let tme = document.querySelector(".time")
tme.innerHTML = `${hours}:${minutes}`

let search = (event) => {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input-text")
    let city = document.querySelector(".city")
    let cityname = searchInput.value
    city.innerHTML = cityname

    let apikey = "838bec9abd11558913af515ee10158b6"
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric`

    axios.get(`${apiurl}&appid=${apikey}`).then((response) => {
        console.log(response)
        let temperature = Math.round(response.data.main.temp)
        let temperatureElement = document.querySelector(".temperatureValue")
        temperatureElement.innerHTML = temperature
        let description = document.querySelector(".description")
        description.innerHTML = response.data.weather[0].description

    })
}

let form = document.querySelector(".search-form")
form.addEventListener("submit", search)


function tofahrenheit() {
    let degree = document.querySelector(".temperatureValue")
    degree.innerHTML = "66"
}

function tocelcius() {
    let degree = document.querySelector(".temperatureValue")
    degree.innerHTML = "16"
}

let celcius = document.querySelector("#celcius")
celcius.addEventListener("click", tocelcius, false);

let fahrenheit = document.querySelector("#fahrenheit")
fahrenheit.addEventListener("click", tofahrenheit, false);




// let apikey = "838bec9abd11558913af515ee10158b6"
// let city = "London"
// let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`

// axios.get(`${apiurl}&appid=${apikey}`).then((response) => {
//     console.log(response)
//     let temperature = Math.round(response.data.main.temp)
//     let temperatureElement = document.querySelector(".temperatureValue")
//     temperatureElement.innerHTML = temperature
// })