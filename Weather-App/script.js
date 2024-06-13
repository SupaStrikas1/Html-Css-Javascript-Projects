const cityinput = document.querySelector("#city");
const searchbtn = document.querySelector(".searchbtn");
const currentloc = document.querySelector(".currentloc");
const weatherdiv = document.querySelector(".weatherdata");
const forcastcardsdiv = document.querySelector(".forcastcards");

const API_KEY = "befbd74b68207fadf4ed4d3bfe5708dd";

const createWeatherCard = (cityName, weatherItem, index) => {

    const iconCode = weatherItem.weather[0].icon.replace('n', 'd');

    if (index === 0) {
        return `<div class="details">
            <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0].split("-").reverse().join("/")})</h2>
            <p>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Wind: ${weatherItem.wind.speed} M/S</p>
            <p>Humidity: ${weatherItem.main.humidity}%</p>
        </div>
        <div class="weathericon">
            <img src="https://openweathermap.org/img/wn/${iconCode}@4x.png" alt="weather icon">
            <p>${weatherItem.weather[0].description}</p>
        </div>`;
    } else {
        return `<li class="cards">
            <h3>(${weatherItem.dt_txt.split(" ")[0].split("-").reverse().join("/")})</h3>
            <img src="https://openweathermap.org/img/wn/${iconCode}@4x.png" alt="weather icon">
            <p class="txt">${weatherItem.weather[0].description}</p>
            <p>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Wind: ${weatherItem.wind.speed} M/S</p>
            <p>Humidity: ${weatherItem.main.humidity}%</p>
        </li>`;
    }
}

const getWeatherdetails = (cityName, latitude, longitude) => {
    const API_URL_coordinates = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(API_URL_coordinates)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const uniqueForecastDays = [];
            const fourDaysForecast = data.list.filter(forecast => {
                const forecastDate = new Date(forecast.dt_txt).getDate();
                if (!uniqueForecastDays.includes(forecastDate) && uniqueForecastDays.length <= 4) {
                    return uniqueForecastDays.push(forecastDate);
                }
            });

            cityinput.value = "";
            weatherdiv.innerHTML = "";
            forcastcardsdiv.innerHTML = "";

            fourDaysForecast.forEach((weatherItem, index) => {
                const html = createWeatherCard(cityName, weatherItem, index);
                if (index === 0) {
                    weatherdiv.insertAdjacentHTML("beforeend", html);
                } else {
                    forcastcardsdiv.insertAdjacentHTML("beforeend", html);
                }
            });
        })
        .catch(() => {
            alert("An error occurred while fetching the weather forecast.");
        });
}

const getCoordinates = () => {
    const cityName = cityinput.value.trim();
    if (cityName === "") return;

    const API_URL_cityName = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    fetch(API_URL_cityName)
        .then(response => response.json())
        .then(data => {
            if (!data.length) {
                return alert(`No coordinates found for ${cityName}`);
            }
            const { lat, lon, name } = data[0];
            getWeatherdetails(name, lat, lon);
        })
        .catch(() => {
            alert("Some error occurred while fetching the coordinates");
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentCoordinates);
    } else {
        console.log("not supported");
    }
}

function currentCoordinates(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const API_URL_currentloc = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
    fetch(API_URL_currentloc)
        .then(response => response.json())
        .then(data => {
            const { name } = data[0];
            getWeatherdetails(name, latitude, longitude);
    });

}

searchbtn.addEventListener("click", getCoordinates);
cityinput.addEventListener("keyup", e => e.key === "Enter" && getCoordinates());
currentloc.addEventListener("click", getLocation);