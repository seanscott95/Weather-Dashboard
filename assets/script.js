// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


// when you search for a city you get current forecast and 5 day forecast
// the city searched is added to the histroy and local storage
// when you click on a city in the search history you get the current forecast and 5 day forecast
// current forecast will consist of city name, the date, an icon, the temp, the uv index
// the icon must match the weather conditions
// the uv index must be coloured to favourable, moderate r severe
// the 5 day forecast must display the date, icon of weather, the temp, wind speed and humidty

// api key d314e3bf342100cced195fd2b14e5db1



// var url = "http://api.openweathermap.org/data/2.5/onecall?appid=d314e3bf342100cced195fd2b14e5db1&lat=30.00&lon=30.00" //lat=&lon=&appid=   &exclude

// variables for the current temp elements
var currentTownEl = document.querySelector(".currentTown");
var currentIcon = document.querySelector("#currentIcon")
var currentTempEl = document.querySelector(".currentTemp");
var currentHumidityEl = document.querySelector(".currentHumidity");
var currentWindEl = document.querySelector(".currentWind");
var currentUvEl = document.querySelector(".currentUv");
// variables for the five day forecast elements
var firstDayEl = document.querySelector(".firstDay");
var secondDayEl = document.querySelector(".secondDay");
var thirdDayEl = document.querySelector(".thirdDay");
var fourthDayEl = document.querySelector(".fourthDay");
var fifthDayEl = document.querySelector(".fifthDay");


var searchFormEl = document.querySelector(".mainForm");
var submitBtn = document.querySelector("#submit");

var apiWeather = "http://api.openweathermap.org/data/2.5/weather?";
var apiOneCall = "https://api.openweathermap.org/data/2.5/onecall?";
var lon = "";
var lat = "";

var cityInput = document.querySelector("#inputCity");
var cityInputVal = cityInput.value;
var apiKey = "bbc093470b839c994653daa51c632f1b";
var apiUnits = "metric";
var completeUrl = apiWeather + "q=" + cityInputVal + "&appid=" + apiKey + "&units=" + apiUnits;
console.log(cityInputVal);
console.log(completeUrl);


function getParams() {
    var searchParamsArr = completeUrl.split("&");
    console.log(searchParamsArr);
    var query = searchParamsArr[0].split("=").pop();
    console.log(query);
    requestData(cityInputVal);
}

function printResults(firstObj, secondObj) {
    console.log(firstObj);
    console.log(secondObj);

    if (firstObj.name) {
        currentTownEl.textContent += firstObj.name;
    } else {
        currentTownEl.textContent += "Name N/A";
    }
    if (secondObj.current.dt) {
        var newDateFormat = new Date(secondObj.current.dt*1000).toLocaleDateString("en-US");
        currentTownEl.textContent += newDateFormat;
    } else {
        currentTownEl.textContent += "Date N/A";
    }
    if (firstObj.weather[0].icon) {
        var srcUrl = "http://openweathermap.org/img/wn/" + firstObj.weather[0].icon + "@2x.png"
        currentIcon.src = srcUrl;
    } else {
        currentTownEl.textContent += "Icon N/A"
    }

    if (firstObj.main.temp) {
        currentTempEl.textContent = "Temp: " + firstObj.main.temp + "C";
    } else {
        currentTempEl.textContent += "N/A";
    }

    if (firstObj.main.humidity) {
        currentHumidityEl.textContent = "Humidity: " + firstObj.main.humidity + "%";
    } else {
        currentHumidityEl.textContent += "N/A";
    }
    if (firstObj.wind.speed) {
        currentWindEl.textContent = "Wind Speed: " + firstObj.wind.speed + "km/h";
    } else {
        currentWindEl.textContent += "N/A";
    }
    

    if (secondObj.daily[0].uvi) {
        currentUvEl.textContent += secondObj.daily[0].uvi;
    } else {
        currentUvEl.textContent += "N/A";
    }

    // fiveday forecast
   
    if (secondObj.daily[0]) {
        printFiveDayCard(secondObj.daily[0], firstDayEl);
    } else {
        firstDayEl.textContent += "N/A";
    }
    if (secondObj.daily[1]) {
        printFiveDayCard(secondObj.daily[1], secondDayEl);
    } else {
        secondDayEl.textContent += "N/A";
    }
    if (secondObj.daily[2]) {
        printFiveDayCard(secondObj.daily[2], thirdDayEl);
    } else {
        thirdDayEl.textContent += "N/A";
    }
    if (secondObj.daily[3]) {
        printFiveDayCard(secondObj.daily[3], fourthDayEl);
    } else {
        fourthDayEl.textContent += "N/A";
    }
    if (secondObj.daily[4]) {
        printFiveDayCard(secondObj.daily[4], fifthDayEl);
    } else {
        fifthDayEl.textContent += "N/A";
    }
}

 //display date     dt
    //display icon     weather.icon
    //display temp     temp.day
    //dsiplay windspeed    wind_speed
    //display humidity     humidity

function printFiveDayCard(dayData, dayElement) {
    var dateCard = document.createElement("div");
    var convertedDate = new Date(dayData.dt*1000).toLocaleDateString("en-US");
    dateCard.textContent = convertedDate;
    var iconCard = document.createElement("div");
    iconCard.src = dayData.weather.icon;
    var tempCard = document.createElement("div");
    tempCard.textContent = "Temp: " + dayData.temp.day + "C";
    var windCard = document.createElement("div");
    windCard.textContent = "Wind: " + dayData.wind_speed + "km/h";
    var humidityCard = document.createElement("div");
    humidityCard.textContent = "Humidity: " + dayData.humidity + "%";


    dayElement.append(dateCard, iconCard, tempCard, windCard, humidityCard);

    //crete element add info to element, add element to element
}

async function requestData(query) {
    
    var currentQueryUrl = apiWeather + "q=" + query + "&appid=" + apiKey + "&units=" + apiUnits;
    console.log(currentQueryUrl);
    const response = await fetch(currentQueryUrl);
    console.log(response.status)
    const data = await response.json();
    console.log(data);
    console.log(data.coord.lon);
    console.log(data.coord.lat);
    lon = data.coord.lon;
    lat = data.coord.lat;
    console.log(lon);
    console.log(lat);
    var newUrl = apiOneCall + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=" + apiUnits;
    console.log(newUrl);
    const secondResponse = await fetch(newUrl);
    console.log(secondResponse);
    const secondData = await secondResponse.json();
    console.log(secondData);
    printResults(data, secondData);
}

function searchCity(event) {
    event.preventDefault();
    console.log("Hello");

    if (!cityInputVal) {
        console.error("You need a search input value");
        return;
    }

    cityInput.setAttribute("value", cityInputVal);

    requestData(cityInputVal);
}


searchFormEl.addEventListener("submit", searchCity);

getParams();


// function getApi(requestUrl) {
//     fetch(requestUrl)
//       .then(function (response) {
//         console.log(response.status);
//         //  Conditional for the the response.status.
//         if (response.status !== 200) {
//           // Place the response.status on the page.
//           responseText.textContent = response.status;
//         }
//         return response.json();
//       })
//       .then(function (data) {
//         // Make sure to look at the response in the console and read how 404 response is structured.
//         console.log(data);
//       });
//   }
  
//   getApi(completeUrl);
  


// fetch(url)
//     .then(response => {
//         console.log(response)
//         return response.json()
//     })
//     .then(data => {
//         console.log(data)
//     })
//     .catch(error => {
//         console.log("errorrrrr")
//         console.error(error)
//     })


// submitBtn.addEventListener("submit", function () {
//     console.log(cityInput);
// })

// when i click on submit button then the value of the input is changed
// 



function searchCity() {

}

function currentForecast() {
    //display name date in bold and an icon

    //display temp
    //display humidity
    //display wind speed
    //display uv
}

function fiveDayForecast() {
    //display date
    //display icon
    //display temp
    //dsiplay windspeed
    //display humidity
}

function saveSearchHistory() {

}

// needed??
function weatherIcon() {

}

// needed??
function uvIndex() {

}