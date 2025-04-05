document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.querySelector('#city-input')
    const getWeatherBtn = document.querySelector('#get-weather-btn')
    const weatherInfo = document.querySelector('#weather-info')
    const cityNameDisplay = document.querySelector('#city-name')
    const temperatureDisplay = document.querySelector('#temperature')
    const descriptionDisplay = document.querySelector('#description')
    const errorMessage = document.querySelector('#error-message')
    const API_KEY = '0b60bfb49641291b9b80dd9e4912432a' // env variables

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim()
        if (!city) return;

        // it may throw an error
        // server/database is always in another continent

        try {
            const weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData)
        } catch (error) {
            showError()
        }

    })

    async function fetchWeatherData(city) {
        // gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("City not found")
        }
        const data = await response.json()
        return data
    }

    function displayWeatherData(data) {
        // display the data
        console.log(data);
        const { name, main, weather } = data
        cityNameDisplay.textContent = name
        temperatureDisplay.textContent = `Temperature : ${main.temp}`
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`

        // unlock the display
        weatherInfo.classList.remove('hidden')
    }

    function showError() {
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }
})