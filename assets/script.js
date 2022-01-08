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


var api = "http://api.openweathermap.org/data/2.5/weather?";
var cityInput = "q=" + document.querySelector("#inputCity").value;
console.log(cityInput);
var apiKey = "&appid=d314e3bf342100cced195fd2b14e5db1";
var apiUnits = "&units=metric"
var completeUrl = api + cityInput + apiKey +apiUnits;
console.log(completeUrl)

var submitBtn = document.querySelector("#submit");


// submitBtn.addEventListener("submit", function () {
//     console.log(cityInput);
// })

// when i click on submit button then the value of the input is changed
// 

async function requestData() {
    const response = await fetch(completeUrl);
    console.log(response)
    const data = response.json();
    console.log(data);
}









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