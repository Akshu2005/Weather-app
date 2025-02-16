const apiKey = "8e9c3fe6afa4b89446bf896395082e80";

async function checkWeather(city) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`City not found!`);
        }

        const data = await response.json();
        const weatherIcon = document.querySelector(".weather-icon");

        // Update the UI with weather details
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = `${data.main.temp.toFixed(1)}°C`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${(data.wind.speed * 3.6).toFixed(1)} km/h`; // Convert m/s to km/h

        // Set weather icon based on weather condition
        const weatherCondition = data.weather[0].main;
        const iconMap = {
            Clouds: "images/clouds.png",
            Clear: "images/clear.png",
            Rain: "images/rain.png",
            Drizzle: "images/drizzle.png",
            Mist: "images/mist.png"
        };
        weatherIcon.src = iconMap[weatherCondition] || "images/default.png"; // Default fallback

        // Show weather info and hide error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        
        // Show error message and hide weather info
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Search button functionality
document.querySelector("button").addEventListener("click", () => {
    const city = document.querySelector("input").value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});

   