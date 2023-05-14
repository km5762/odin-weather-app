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
