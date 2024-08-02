const apiKey = "0e2451a05fc14a3aa9f153913240208";
const apiUrl = "https://api.weatherapi.com/v1/current.json?q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const loadingElement = document.querySelector(".loading");

async function checkWeather(city) {
  try {
    loadingElement.style.display = "block";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "none";

    const response = await fetch(apiUrl + city + `&key=${apiKey}`);

    if (response.status === 400) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const data = await response.json();

      console.log(data);

      document.querySelector(".city").innerHTML = data.location.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.current.temp_c) + "°C";
      document.querySelector(".humidity").innerHTML =
        data.current.humidity + "%";
      document.querySelector(".wind").innerHTML =
        data.current.wind_kph + " km/h";

      const conditionText = data.current.condition.text;
      if (conditionText === "Patchy rain nearby") {
        weatherIcon.src = "images/drizzle.png";
      } else if (
        conditionText === "Cloudy" ||
        conditionText === "Partly Cloudy" ||
        conditionText === "Overcast"
      ) {
        weatherIcon.src = "images/clouds.png";
      } else if (conditionText === "Sunny") {
        weatherIcon.src = "images/clear.png";
      }

      document.querySelector(".error").style.display = "none";
      document.querySelector(".weather").style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  } finally {
    loadingElement.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  checkWeather(city);
});
