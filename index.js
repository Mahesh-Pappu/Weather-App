const apikey = "b8008bc92e64ceb90da2d1af88251d0b";
const form = document.getElementById("form");
const div = document.getElementById("container");
form.addEventListener("submit", event => {
    event.preventDefault();
    getInfo();
});
async function getInfo() {
    const city_name = document.getElementById("value");
    const city = city_name.value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        console.log(data);
        update(data);
        city_name.value = "";
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        alert("City not found. Please try another city.");
    }
}
function update(data) {
    let place = document.getElementById("place");
    let temp = document.getElementById("temp");
    let humidity = document.getElementById("humidity");
    let sky = document.getElementById("sky");
    let emoji = document.getElementById("emoji");
    place.textContent = data.name;
    temp.textContent = `${(data.main.temp - 273.15).toFixed(1)} °C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    sky.textContent = data.weather[0].main;
    const em = data.weather[0].id;
    if (em >= 200 && em < 300) {
        emoji.textContent = "⛈️";
    } else if (em >= 300 && em < 400) {
        emoji.textContent = "🌧️";
    } else if (em >= 500 && em < 600) {
        emoji.textContent = "🌦️";
    } else if (em >= 600 && em < 700) {
        emoji.textContent = "❄️";
    } else if (em >= 700 && em < 800) {
        emoji.textContent = "⛅";
    } else if (em === 800) {
        emoji.textContent = "☀️";
    } else {
        emoji.textContent = "⛅";
    }
    div.style.visibility = "visible";
}