const search = document.querySelector(".search svg");
const searchBar = document.querySelector(".search input");

search.addEventListener("click", () => {
  renderWeatherAt(searchBar.value);
});

searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    renderWeatherAt(searchBar.value);
  }
});

async function getWeatherAt(location) {
  const url =
    "https://api.weatherapi.com/v1/current.json?key=e137765b2150444d9f332519231305&q=";
  const response = await fetch(url + location, { mode: "cors" });
  if (response.status === 400) {
    throw new Error("City not found");
  } else {
    const json = await response.json();
    return json;
  }
}

async function renderWeatherAt(location) {
  const city = document.querySelector(".city");
  const weatherCard = document.querySelector(".weather-card");
  try {
    const weather = await getWeatherAt(location);
    const condition = document.querySelector(".condition");
    const temperature = document.querySelector(".temperature");
    const feelsLike = document.querySelector(".feels-like");
    const wind = document.querySelector(".wind");
    const humidity = document.querySelector(".humidity");
    const percipitation = document.querySelector(".percipitation");

    weatherCard.style.display = "flex";
    city.textContent = weather.location.name;
    condition.textContent = weather.current.condition.text;
    temperature.textContent = `Temperature: ${weather.current.temp_f}° F`;
    feelsLike.textContent = `Feels like: ${weather.current.feelslike_f}° F`;
    wind.textContent = `Wind speed: ${weather.current.wind_mph} mph`;
    humidity.textContent = `Humidity ${weather.current.humidity}`;
    percipitation.textContent = `Precipitation: ${weather.current.precip_in} in`;
  } catch {
    weatherCard.style.display = "flex";
    city.textContent = `City "${location}" not found`;
  }
}
