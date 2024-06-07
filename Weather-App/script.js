const cityinput=document.querySelector("#city");
const searchbtn=document.querySelector(".searchbtn");
const currentloc=document.querySelector(".currentloc");
const weatherdiv=document.querySelector(".weatherdata");
const forcastcardsdiv=document.querySelector(".forcastcards");

const API_KEY= "a2d80ab4168fdab788009154c608c9267";

const createWeatherCard=(cityName,weatherItem,index)=>{
    if(index===0){
        return `<div class="details">
        <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
        <p>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</p>
        <p>Wind: ${weatherItem.wind.speed} M/S</p>
        <p>Humidity: ${weatherItem.main.humidity}%</p>
    </div>
    <div class="weathericon">
        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather icon">
        <p>${weatherItem.weather[0].description}</p>
    </div>`;
    } else{
        return `<li class="cards">
        <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather icon">
        <p class="txt">${weatherItem.weather[0].description}</p>
        <p>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</p>
        <p>Wind: ${weatherItem.wind.speed} M/S</p>
        <p>Humidity: ${weatherItem.main.humidity}%</p>
    </li>`;
    }
}

const getWeatherdetails=(cityName,latitude,longtitude)=>{
    const API_URL_coordinates=`api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longtitude}&appid=${API_KEY}`;

    fetch(API_URL_coordinates).then(response=>response.json()).then(data=>{

        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

        cityinput.value="";
        weatherdiv.innerHTML="";
        forcastcardsdiv.innerHTML="";

        fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weatherItem, index);
            if (index === 0) {
                weatherdiv.insertAdjacentHTML("beforeend", html);
            } else {
                forcastcardsdiv.insertAdjacentHTML("beforeend", html);
            }
        });        
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast.");
    });
}

const getCoordinates=()=>{
    const cityName=cityinput.value.trim();
    if(cityName==="") return;

    const API_URL_cityName=`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`;

    fetch(API_URL_cityName).then(response=>response.json()).then(data=>{
        if(!data.length) return alert(`No coordinates found for ${cityName}`);
        const {name,lat,lon}=data[0];
        getWeatherdetails(name,lat,lon);
    }).catch(()=>{
        alert("Some error occured while fetching the coordinates")
    });
}

//currentloc.addEventListener("click", getUserCoordinates);
searchbtn.addEventListener("click", getCoordinates);
cityinput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());