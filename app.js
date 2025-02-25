// Dark theme
let mainBox = document.querySelector(".mainBox");
let ThemeToggle = document.querySelector("#themeToggle");

ThemeToggle.onclick = function () {
  mainBox.classList.toggle("darkTheme");
  if (ThemeToggle.src.match("Moon")) {
    ThemeToggle.src = "Media/Sun.svg";
  } else {
    ThemeToggle.src = "Media/Moon.svg";
  }
};

// Weather Function
let inputField = document.querySelector("#inputField");
let searchButton = document.querySelector("#searchButton");
let alertSection = document.querySelector(".alertSection");
let weatherSection = document.querySelector(".weatherSection");
let weatherImage = document.querySelector("#weatherImage");
let cityName = document.querySelector("#cityName");
let temperature = document.querySelector("#temperature");
let windSpeed = document.querySelector("#windSpeed");
let humidity = document.querySelector("#humidity");

let keyAPI = "2e63fe74cfc702950705587d29514a54";
let urlAPI = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function weatherUpdate(city) {
  let rawdata = await fetch(urlAPI + city + `&appid=${keyAPI}`);
  let finalData = await rawdata.json();
  console.log(finalData);

  if (rawdata.status == 404) {
    weatherSection.style.display = "none";
    alertSection.style.display = "block";
  } else {
    cityName.innerText = finalData.name;
    temperature.innerText = Math.round(finalData.main.temp) + " °C";
    windSpeed.innerText = Math.round(finalData.wind.speed) + " Km/h";
    humidity.innerText = finalData.main.humidity + " %";

    if (finalData.weather[0].main == "Clear") {
      weatherImage.src = "Media/clear.png";
    } else if (finalData.weather[0].main == "Clouds") {
      weatherImage.src = "Media/clouds.png";
    } else if (finalData.weather[0].main == "Drizzle") {
      weatherImage.src = "Media/drizzle.png";
    } else if (finalData.weather[0].main == "Mist") {
      weatherImage.src = "Media/mist.png";
    } else if (finalData.weather[0].main == "Rain") {
      weatherImage.src = "Media/rain.png";
    }

    weatherSection.style.display = "block";
    alertSection.style.display = "none";
  }
}

// Function to get weather by coordinates
async function getWeatherByCoords(lat, lon) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${keyAPI}`
  );
  let data = await response.json();
  weatherUpdate(data.name);
}

// Get current location and fetch weather
function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherByCoords(lat, lon);
      },
      (error) => {
        console.error("Error getting location:", error);
        alertSection.innerText =
          "Error getting your location. Please enter a city manually.";
        alertSection.style.display = "block";
      }
    );
  } else {
    alertSection.innerText =
      "Geolocation is not supported by your browser. Please enter a city manually.";
    alertSection.style.display = "block";
  }
}

// Event listener for search button
searchButton.addEventListener("click", () => {
  weatherUpdate(inputField.value);
});

// Event listener for "Enter" key press in the input field
inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    weatherUpdate(inputField.value);
  }
});

// Get weather for current location on page load
getCurrentLocationWeather();

// Timmer function
window.onload = () => {
  const time = new Date().getHours();
  if (time > 6 && time < 18) {
    mainBox.style.backgroundImage = "url(./Media/SunnyDay.jpg)";
    mainBox.style.backgroundSize = "cover";
    mainBox.style.backgroundBlendMode = "multiply";
  } else {
    mainBox.style.backgroundImage = "url(./Media/StarryNight.jpg)";
    mainBox.style.backgroundSize = "contain";
    mainBox.style.backgroundBlendMode = "multiply";
  }
};
