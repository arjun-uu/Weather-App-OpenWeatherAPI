document.addEventListener('DOMContentLoaded', () => {

    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temp = document.getElementById("temperature");
    const desc = document.getElementById("description");
    const errorMsg = document.getElementById("error-message");

    const API_KEY = "d9f106142c6a3f62950449d15455f219";

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherInfoData = await fetchWeatherData(city);
            displayWeatherData(weatherInfoData);
        } catch (error) {
            displayError(error);
        }
    });

    async function fetchWeatherData(city) {
        // Use city in the API URL and inject API_KEY correctly
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        return data; // return data to caller
    }

    function displayWeatherData(weatherData) {

        console.log(weatherData)
        errorMsg.classList.add('hidden');
        weatherInfo.classList.remove('hidden');

        cityName.textContent = weatherData.name;
        temp.textContent = `Temperature: ${weatherData.main.temp}°C | Feels like : ${weatherData.main.feels_like}°C`;
        desc.textContent = `Weather: ${weatherData.weather[0].description}`;
    }

    function displayError(error) {
        console.error(error);
        weatherInfo.classList.add('hidden');
        errorMsg.textContent = "City not found or invalid API key!";
        errorMsg.classList.remove('hidden');
    }

});
