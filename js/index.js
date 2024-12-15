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
const contact = document.querySelector("#Cont");
const louding = document.querySelector("#louding")

contact.addEventListener("click", () => {
    home.innerHTML= `<div class="container px-100 py-4">
  <div class="bg-second mb-5 mt-2 text-white py-3 px-4 rounded-5">home <i class="fa-solid fa-right-long mx-2"></i> Contact</div>
  <div class="row gy-4">
    <div class="col-lg-5">
      <div class="inner shadow-sm rounded-5 ps-3 pb-3 bg-second flex-wrap d-flex align-content-end">
       <div class="d-flex w-100 align-items-baseline">
         <i class="fa-solid fa-location-dot text-three me-3"></i>
         <p class="mt-0">Company Name INC. <br>
           2803 Avenue Street, Los Angeles</p>
       </div>
       <div>
        <span class="me-3"><i class="fa-solid fa-phone-volume text-three me-2"></i>+1 800 314 235</span>
         <span><i class="fa-solid fa-envelope text-three me-2"></i>contact@companyname.com</span>
        </div>
      </div>
    </div>
    <div class="col-lg-6 offset-lg-1">
      <div class="sign-up">
        <h2 class="text-white me-3">Contact us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur inventore ducimus, facilis, numquam id soluta omnis eius recusandae nesciunt vero repellat harum cum. Nisi facilis odit hic, ipsum sed!</p>
        <form>
          <div class="row gx-3 gy-3">
           <div class="col-lg-6"><input type="text" class="w-100 bg-one rounded-5 py-2 px-4 text-white" placeholder="Your Name..."></div>
           <div class="col-lg-6"><input type="text" class="w-100 bg-one rounded-5 py-2 px-4 text-white" placeholder="Your Email..."></div>
           <div class="col-lg-6"><input type="text" class="w-100 bg-one rounded-5 py-2 px-4 text-white" placeholder="Company Name..."></div>
           <div class="col-lg-6"><input type="text" class="w-100 bg-one rounded-5 py-2 px-4 text-white" placeholder="Website..."></div>
           <div><textarea class="w-100 bg-one rounded-5 py-2 px-4 text-white" placeholder="Massage..."></textarea></div>
          </div>
          <button class="bg-three border-0 py-2 px-4 text-white rounded-5 shadow-sm ms-auto d-block mt-2">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>`
    home.id = "contact"
})

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
    louding.classList.remove("d-none");
    let req = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=36f8b24dc0d54e2baa6135358241312&q=${c}&days=3`);
    let response = await req.json();
    weather = response
    currentDay(); 
    secodDay();
    thirdDay()
    louding.classList.add("d-none");
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


