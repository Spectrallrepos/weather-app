//Weather

//elements for filling the data into as well as the API key
const search = document.querySelector('#search');
const cityInput = document.querySelector('#cityInput');
const mainDetails = document.querySelector('#mainDetails');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#windSpeed');
const pressure = document.querySelector('#pressure');
const uv = document.querySelector('#uv');
const apiKey = '7f2a3a2d4ce84739aff42124251612';

async function fetchWeather(city) { //We already defined city parameter here thus this works else it will not
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`); //We fetch the data from the API
    const data = await response.json(); //We parse the response as json
    console.log(data);
    
    if (data.error) {
        throw new Error(data.error.message); //Triggers the error handling functions
    }
    
    return data;
}
//search functionality
search.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value; //The await in the fetch waits for this data
    if(city){
        try{
            const weatherData = await fetchWeather(city); //We store the fetched data in weatherData
            displaymainDetails(weatherData); //We call the function to display details
            displayotherDetails(weatherData);
            updateBg(weatherData);
            cityInput.value = ''; //Clear the input field after search
        }
        catch(error){
            displayError("City not found");
        }
    }
    else{
        console.log("No city provided");
        displayError("No city provided");
    }
})
//main Details
function displaymainDetails(weatherData) {
    mainDetails.innerHTML = `
        <h1>${weatherData.location.name}</h1>
        <h2>${weatherData.current.temp_c}°C</h2>
        <p>${weatherData.current.condition.text}</p>
        <img src="https:${weatherData.current.condition.icon}" alt="Weather Icon">
    `;
}
//other Details
function displayotherDetails(weatherData) {
    humidity.innerText = `${weatherData.current.humidity}%`;
    windSpeed.innerText = `${weatherData.current.wind_kph} kph`;
    pressure.innerText = `${weatherData.current.pressure_mb} mb`;
    uv.innerText = `${weatherData.current.uv}`;
}
//error
function displayError(msg) {
    mainDetails.innerHTML = `<h1>${msg}</h1>`;
    humidity.innerText = '-';
    windSpeed.innerText = '-';
    pressure.innerText = '-';
    uv.innerText = '-';
}

//background and icon update
function updateBg(weatherData) {
    const current = weatherData.current;
    const body = document.querySelector('body');
    
    if (current.condition.code == 1000) { //clear or sunny
        body.style.backgroundImage = "url('https://github.com/Spectrallrepos/weather-app/blob/master/bg-img/beach.jpg?raw=true')";
    }
    else if (current.condition.code == 1003 || (current.condition.code >= 1007 && current.condition.code <= 1030) || current.condition.code == 1135 || current.condition.code == 1147) {
        body.style.backgroundImage = "url('https://github.com/Spectrallrepos/weather-app/blob/master/bg-img/clouds.png?raw=true')";
    }//for foggy conditions or clouds 
    else if ((current.condition.code >= 1063 && current.condition.code <= 1087) || (current.condition.code >= 1150 && current.condition.code <= 1201) || (current.condition.code >= 1240 && current.condition.code <= 1246) || (current.condition.code >= 1273 && current.condition.code <= 1282)) {
        body.style.backgroundImage = "url('https://github.com/Spectrallrepos/weather-app/blob/master/bg-img/rainy-window.jpeg?raw=true')";
    }//for rainy conditions
    else if ((current.condition.code >= 1204 && current.condition.code <= 1237) || (current.condition.code >= 1249 && current.condition.code <= 1282)) {
        body.style.backgroundImage = "url('https://github.com/Spectrallrepos/weather-app/blob/master/bg-img/snowflakes.jpg?raw=true')";
    }//for snowy conditions
    else {
        body.style.backgroundImage = "url('https://github.com/Spectrallrepos/weather-app/blob/master/bg-img/storm.jpg?raw=true')";
    }
}

