// # 06 Server-Side APIs: Weather Dashboard

// variables for the current temp elements
var currentTownEl = document.querySelector(".current-town");
var currentIcon = document.querySelector("#current-icon")
var currentTempEl = document.querySelector(".current-temp");
var currentHumidityEl = document.querySelector(".current-humidity");
var currentWindEl = document.querySelector(".current-wind");
var currentUvEl = document.querySelector(".current-uv");

// variables for the five day forecast elements
var firstDayEl = document.querySelector(".first-day");
var secondDayEl = document.querySelector(".second-day");
var thirdDayEl = document.querySelector(".third-day");
var fourthDayEl = document.querySelector(".fourth-day");
var fifthDayEl = document.querySelector(".fifth-day");

// Variables for elements in the top row for the current day forecast
var currentTownNameEl = document.querySelector(".current-town-name");
var currentTownDateEl = document.querySelector(".current-town-date");
var currentTownIconEl = document.querySelector(".current-town-icon");

// Variables for the form and list elements
var listEl = document.querySelector(".list");
var searchFormEl = document.querySelector(".main-form");
var submitBtn = document.querySelector("#submit");
var cityInput = document.querySelector("#input-city");

// Variable to change elements background
var uvAnswerBtn = document.querySelector("#uv-answer");

// Variables for the api url for fetch
var apiWeather = "http://api.openweathermap.org/data/2.5/weather?";
var apiOneCall = "https://api.openweathermap.org/data/2.5/onecall?";
var lon = "";
var lat = "";
var apiKey = "bbc093470b839c994653daa51c632f1b";
var apiUnits = "metric";
var completeUrl = apiWeather + "q=" + cityInput.value + "&appid=" + apiKey + "&units=" + apiUnits;



// Receives 2 objects of weather data and prints the data to the respective element in the current weather container
function printResults(firstObj, secondObj) {

    // Adding weather data for the Current Weather container
    if (firstObj.name) {
        currentTownNameEl.textContent = firstObj.name;
    } else {
        currentTownNameEl.textContent = "Town Name N/A";
    }
    if (secondObj.current.dt) {
        var newDateFormat = new Date(secondObj.current.dt*1000).toLocaleDateString("en-AU");
        currentTownDateEl.textContent = "(" + newDateFormat + ")";
    } else {
        currentTownDateEl.textContent = "Date N/A";
    }
    if (firstObj.weather[0].icon) {
        var srcUrl = getFullIconUrl(firstObj.weather[0].icon);
        currentTownIconEl.src = srcUrl;
    } else {
        currentTownEl.textContent = "Weather Icon N/A"
    }
    if (firstObj.main.temp) {
        currentTempEl.textContent = "Temp: " + firstObj.main.temp + "C";
    } else {
        currentTempEl.textContent = "Temp N/A";
    }
    if (firstObj.main.humidity) {
        currentHumidityEl.textContent = "Humidity: " + firstObj.main.humidity + "%";
    } else {
        currentHumidityEl.textContent = "Humidity N/A";
    }
    if (firstObj.wind.speed) {
        currentWindEl.textContent = "Wind Speed: " + firstObj.wind.speed + "m/s";
    } else {
        currentWindEl.textContent = "Wind Speed N/A";
    }
    if (secondObj.daily[0].uvi) {
        uvAnswerBtn.textContent = secondObj.daily[0].uvi;
        uvIndex(secondObj.daily[0].uvi, uvAnswerBtn);
    } else {
        currentUvEl.textContent += "N/A";
    }

    // Adding weather data for the 5-Day Forecast
    if (secondObj.daily[0]) {
        printFiveDayCard(secondObj.daily[0], firstDayEl);
    } else {
        firstDayEl.textContent = "N/A";
    }
    if (secondObj.daily[1]) {
        printFiveDayCard(secondObj.daily[1], secondDayEl);
    } else {
        secondDayEl.textContent = "N/A";
    }
    if (secondObj.daily[2]) {
        printFiveDayCard(secondObj.daily[2], thirdDayEl);
    } else {
        thirdDayEl.textContent = "N/A";
    }
    if (secondObj.daily[3]) {
        printFiveDayCard(secondObj.daily[3], fourthDayEl);
    } else {
        fourthDayEl.textContent = "N/A";
    }
    if (secondObj.daily[4]) {
        printFiveDayCard(secondObj.daily[4], fifthDayEl);
    } else {
        fifthDayEl.textContent = "N/A";
    }
}

// Creates the 5-Day weather forecast card and prints the respective data to the respective element
function printFiveDayCard(dayData, dayElement) {

    var dateCard = document.createElement("div");
    dateCard.className = "five-day-date";
    var convertedDate = new Date(dayData.dt*1000).toLocaleDateString("en-AU");
    dateCard.textContent = convertedDate;

    var iconCard = document.createElement("img");
    iconCard.src = getFullIconUrl(dayData.weather[0].icon);

    var tempCard = document.createElement("div");
    tempCard.textContent = "Temp: " + dayData.temp.day + "C";

    var windCard = document.createElement("div");
    windCard.textContent = "Wind: " + dayData.wind_speed + "m/s";

    var humidityCard = document.createElement("div");
    humidityCard.textContent = "Humidity: " + dayData.humidity + "%";

    dayElement.textContent = "";
    dayElement.append(dateCard, iconCard, tempCard, windCard, humidityCard);
}

// Requests data from the weather api and prints those results to a function to be used
async function requestData(query) {
    
    var currentQueryUrl = apiWeather + "q=" + query + "&appid=" + apiKey + "&units=" + apiUnits;
    const response = await fetch(currentQueryUrl);
    const data = await response.json();

    lon = data.coord.lon;
    lat = data.coord.lat;

    var newUrl = apiOneCall + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=" + apiUnits;
    const secondResponse = await fetch(newUrl);
    const secondData = await secondResponse.json();

    printResults(data, secondData);
}

// Uses city as values to send through appendSearch and requestData functions
function searchCity(city) {
    appendToLocal(city);
    requestData(city);
}

// Requests the weather data by using the requestData function and the clicked on lists textContent
function listSearch(event) {
    var listName = event.target.textContent;
    requestData(listName);
}

// Returns the correct url for each image weather icon
function getFullIconUrl(icon) {
    return "http://openweathermap.org/img/wn/" + icon + "@2x.png";
}

// Changes the background of the UV index depending on level of UV
function uvIndex(level, element) {
    if (level <= 2) {
        element.style.backgroundColor = "green";
    } else if (level > 2 && level <= 5) {
        element.style.backgroundColor = "yellow";
    } else if (level > 5 && level <= 7) {
        element.style.backgroundColor = "orange";
    } else {element.style.backgroundColor = "red"}
}

// Creates a local stroage key and value as the towns name entered 
function appendToLocal(townName) {
    var getLocalStorage = localStorage.getItem("Towns")
    var newLocalStorage = getLocalStorage + "," + townName;
    localStorage.setItem("Towns", newLocalStorage);
    appendLocalStorage();
}

// Add defaults and sets towns in list in local storage so they cant be added again
function setDefaultLocal() {
    var towns = ["Canberra", "Hobart", "Darwin", "Adelaide", "Perth", "Brisbane", "Sydney", "Melbourne"];
    while (!localStorage.getItem("Towns")) {
        localStorage.setItem("Towns", towns);
    }
}

// Adds list elements from the local storage
function appendLocalStorage() {
    var array = localStorage.getItem("Towns");

    var splitArray = array.split(",");    
    var ul = document.querySelector(".list");
    // While loop removes town names from list, so not to double up on the list
    while(ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    for (var i=0; i < splitArray.length; i++) {
        var li = document.createElement("li");
        li.textContent = splitArray[i];
        ul.insertBefore(li, ul.firstChild);
    }
}

// Runs setDefaultLocal so there is local storage information to be used for appendLocalStorage()
setDefaultLocal();

// Runs appendLocalStorage so there is list items for the list on the side when you open the page
appendLocalStorage();

// Event listener for each individual list item displaying town names for search
listEl.addEventListener("click", listSearch);

//Event listener for the form element when submitted
searchFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    cityInputVal = cityInput.value;
    searchCity(cityInputVal);
})