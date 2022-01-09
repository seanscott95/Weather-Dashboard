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

// submit button element
var submitBtn = document.querySelector("#submit");

var api = "api.openweathermap.org/data/2.5/weather?";
var cityInputVal = document.querySelector("#inputCity").value;
var apiKey = "&appid=d314e3bf342100cced195fd2b14e5db1";
var apiUnits = "&units=metric";
var completeUrl = api + "q=" + cityInputVal + apiKey + apiUnits;
console.log(cityInputVal);
console.log(completeUrl);


function getParams() {
    var searchParamsArr = completeUrl.split("&");
    console.log(searchParamsArr);
    var queryTown = searchParamsArr[0].split("=").pop();
    console.log(queryTown);
}
getParams();

async function requestData() {
    const response = await fetch(completeUrl);
    console.log(response.status)
    const data = await response.json();
    console.log(data);
}

requestData();


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