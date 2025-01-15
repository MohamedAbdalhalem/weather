const days = document.querySelectorAll(".day");
const date = document.querySelector("#date");
const city = document.querySelector("#city");
const wind = document.querySelector("#vis_km");
const dir = document.querySelector("#wind_dir");
const temperature = document.querySelector("#temperature");
const suns = document.querySelectorAll(".sun");
const skys = document.querySelectorAll(".sky");
const temperatureAm = document.querySelectorAll(".temperature-am");
const temperaturePm = document.querySelectorAll(".temperature-pm");
const findLocation = document.querySelector("#location");
const forms = document.querySelectorAll("form");
const home = document.querySelector(".home");





for (var i = 0; i < forms.length; i++){
    forms[i].addEventListener("submit", (e) => {
        e.preventDefault()
    })
}
findLocation.addEventListener("keyup", () => {
    if (findLocation.value.length > 2) {
        getWeather(findLocation.value)
    }
})

let weather = {};
async function getWeather(c) {
    let req = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=36f8b24dc0d54e2baa6135358241312&q=${c}&days=3`);
    let response = await req.json();
    weather = response
    currentDay(); 
    secodDay();
    thirdDay()
   
}

function getDayFromDate(dateString) {
    const date = new Date(dateString);
    const days = ["sunday","monday","tuesday","wednesday","thursday","friiday","saterday"]
    const dayIndex = date.getDay();
    return days[dayIndex];
}

function formatDateFull(mon) {
    const date = new Date(mon);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  }

function currentDay() {
    days[0].innerHTML = getDayFromDate(weather.location.localtime);
    date.innerHTML = formatDateFull(weather.location.localtime)
    city.innerHTML = weather.location.name;
    temperature.innerHTML = weather.current.temp_c +"°C";
    suns[0].src = "https:" + weather.current.condition.icon;
    skys[0].innerHTML = weather.current.condition.text;
    wind.innerHTML = `${weather.current.vis_km}km/h`;
    dir.innerHTML = weather.current.wind_dir
}

function secodDay() {
    days[1].innerHTML = getDayFromDate(weather.forecast.forecastday[1].date);
    suns[1].src = "https:" + weather.forecast.forecastday[1].day.condition.icon;
    temperatureAm[0].innerHTML = weather.forecast.forecastday[1].day.maxtemp_c + "°C";
    temperaturePm[0].innerHTML = weather.forecast.forecastday[1].day.mintemp_c + "°C";
    skys[1].innerHTML = weather.forecast.forecastday[1].day.condition.text;
}

function thirdDay() {
    days[2].innerHTML = getDayFromDate(weather.forecast.forecastday[2].date);
    suns[2].src = "https:" + weather.forecast.forecastday[2].day.condition.icon;
    temperatureAm[1].innerHTML = weather.forecast.forecastday[2].day.maxtemp_c + "°C";
    temperaturePm[1].innerHTML = weather.forecast.forecastday[2].day.mintemp_c + "°C";
    skys[2].innerHTML = weather.forecast.forecastday[2].day.condition.text;
}

getWeather("cairo")


