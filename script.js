function getWeather() {
    const apikey = '368e88f4d05f89eaf5c39618ac78d82f';
    const city = document.getElementById('city').value;
    if (!city){
        alert ('please enter a city');
    
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data =>{
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current Weeatherdata',error);
            alert('Error fetching cuurent weather data .Please try again');
        })
        fetch(forecastUrl)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching hourly Weeatherdata',error);
            alert('Error fetching hourly forest weather data .Please try again');
        })
}
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');

    weatherInfoDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if(data.cod === '404'){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp-273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        
        const temperatureHTML = `<p>${description}</p><br><p>${temperature}°C</p>`;

        const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherIcon.innerHTML = weatherHTML;

        showImage(iconurl,description);
    }

}
function showImage(iconurl,description) {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
    weatherIcon.src = iconurl;
    weatherIcon.alt = description;
}