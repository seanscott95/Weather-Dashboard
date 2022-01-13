// TODO:
// 

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

// Variables for elements in the top row for the current day forecast
var currentTownNameEl = document.querySelector(".currentTownName");
var currentTownDateEl = document.querySelector(".currentTownDate");
var currentTownIconEl = document.querySelector(".currentTownIcon");

// Variables for the form and list elements
var listEl = document.querySelector(".list");
var searchFormEl = document.querySelector(".mainForm");
var submitBtn = document.querySelector("#submit");
var cityInput = document.querySelector("#inputCity");

// Variable to change elements background
var uvAnswerBtn = document.querySelector("#uvAnswer");

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
        currentWindEl.textContent = "Wind Speed: " + firstObj.wind.speed + "km/h";
    } else {
        currentWindEl.textContent = "Wind Speed N/A";
    }
    

    if (secondObj.daily[0].uvi) {
        uvAnswerBtn.textContent = secondObj.daily[0].uvi;
        // console.log(secondObj.daily[0].uvi);
        uvIndex(secondObj.daily[0].uvi, uvAnswerBtn);
    } else {
        currentUvEl.textContent += "N/A";
    }

    // fiveday forecast
   
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

// Creates the five day weather forecast card and prints the respective data to the respective element
function printFiveDayCard(dayData, dayElement) {
    var dateCard = document.createElement("div");
    dateCard.className = "fiveDayDate";

    var convertedDate = new Date(dayData.dt*1000).toLocaleDateString("en-AU");
    dateCard.textContent = convertedDate;

    var iconCard = document.createElement("img");
    iconCard.src = getFullIconUrl(dayData.weather[0].icon);

    var tempCard = document.createElement("div");
    tempCard.textContent = "Temp: " + dayData.temp.day + "C";

    var windCard = document.createElement("div");
    windCard.textContent = "Wind: " + dayData.wind_speed + "km/h";

    var humidityCard = document.createElement("div");
    humidityCard.textContent = "Humidity: " + dayData.humidity + "%";

    dayElement.textContent = "";
    dayElement.append(dateCard, iconCard, tempCard, windCard, humidityCard);
}

// Requests data from the weather api and prints those results to a function to be used
async function requestData(query) {
    
    var currentQueryUrl = apiWeather + "q=" + query + "&appid=" + apiKey + "&units=" + apiUnits;
    //console.log(currentQueryUrl);
    const response = await fetch(currentQueryUrl);
    console.log(response.status)
    const data = await response.json();
    //console.log(data);
    //console.log(data.coord.lon);
    //console.log(data.coord.lat);
    lon = data.coord.lon;
    lat = data.coord.lat;
    //console.log(lon);
    //console.log(lat);
    var newUrl = apiOneCall + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=" + apiUnits;
    //console.log(newUrl);
    const secondResponse = await fetch(newUrl);
    //console.log(secondResponse);
    const secondData = await secondResponse.json();
    //console.log(secondData);
    printResults(data, secondData);
}

// Creates a new list item if value isnt in local storage already
function appendSearch(val) {
    while (!localStorage.getItem(val)) {
        var ul = document.querySelector(".list");
        var li = document.createElement("li");
        li.textContent = val;
        ul.insertBefore(li, ul.firstChild);
        appendToLocal(val);
    }
}

// Uses city as values to send through appendSearch and requestData functions
function searchCity(city) {
    appendSearch(city);
    requestData(city);
}

// 
function listSearch(event) {
    event.preventDefault();
    console.log(event.target.textContent);
    var listName = event.target.textContent;
    console.log(listName);
    searchCity(listName);
}

// Returns the correct url for each image weather icon
function getFullIconUrl(icon) {
    return "http://openweathermap.org/img/wn/" + icon + "@2x.png";
}

// Creates a local stroage key and value as the towns name entered 
function appendToLocal(townName) {
    localStorage.setItem(townName, townName);
}

// Changes the background of the UV index depending on level of UV
function uvIndex(level, element) {
    console.log(level);
    if (level <= 2) {
        element.style.backgroundColor = "green";
    } else if (level > 2 && level <= 5) {
        element.style.backgroundColor = "yellow";
    } else if (level > 5 && level <= 7) {
        element.style.backgroundColor = "orange";
    } else {element.style.backgroundColor = "red"}
}

// Sets towns in list in local storage so they cant be added again
function checkLocal() {
    localStorage.setItem("Melbourne", "Melbourne");
    localStorage.setItem("Brisbane", "Brisbane");
    localStorage.setItem("Sydney", "Sydney");
    localStorage.setItem("Canberra", "Canberra");
    localStorage.setItem("Hobart", "Hobart");
    localStorage.setItem("Darwin", "Darwin");
    localStorage.setItem("Adelaide", "Adelaide");
    localStorage.setItem("Perth", "Perth");
}

// Runs checkLocal
checkLocal();

// Event listeners
listEl.addEventListener("click", listSearch);

searchFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    cityInputVal = cityInput.value;
    console.log(cityInputVal);
    searchCity(cityInputVal);
})