const city1 = "Jaipur"
const city2 = "Mumbai"
const city3 = "Lucknow"
const city4 = "Kolkata"
const city5 = "Bangalore"

const defaultCity = "Delhi"

const getWeather = (city) => {
    if (!city || city.trim() === "") {
        alert("Please enter a city name before searching!");
        return;
    }
    const url = `/api/weather?city=${city}`;
    cityName.innerHTML = city
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((response) => {

            console.log(response)

            temp.innerHTML = response.main.temp
            feels_like.innerHTML = Math.round(response.main.feels_like)
            humid.innerHTML = response.main.humidity
            humidity.innerHTML = response.main.humidity
            pressure.innerHTML = response.main.pressure
            description.innerHTML = response.weather[0].description
            winspeed.innerHTML = (response.wind.speed * 3.6).toFixed(1);
            speed.innerHTML = (response.wind.speed * 3.6).toFixed(1);
            gust.innerHTML = response.wind.gust ? (response.wind.gust * 3.6).toFixed(1) : 0;
        })
        .catch(err => { alert("The city does not exist. Please check your keyword"); getWeather(defaultCity) });
}

submit.addEventListener("click", (e) => {
    e.preventDefault()
    getWeather(city.value)
    city.value = ""
})

const getTableData = (city, id) => {
    const url = `/api/weather?city=${city}`;
    document.getElementById(`city${id}Name`).innerHTML = city;

    fetch(url)
        .then(response => response.json())
        .then((response) => {
            document.getElementById(`temp${id}`).innerHTML = Math.round(response.main.temp) + " °C";
            document.getElementById(`feels_like${id}`).innerHTML = Math.round(response.main.feels_like) + " °C";
            document.getElementById(`humidity${id}`).innerHTML = response.main.humidity + " %";
            document.getElementById(`pressure${id}`).innerHTML = response.main.pressure + " hPa";
            document.getElementById(`description${id}`).innerHTML = response.weather[0].description;
            document.getElementById(`winspeed${id}`).innerHTML = (response.wind.speed * 3.6).toFixed(1) + " km/h";
            let gustValue = response.wind.gust ? (response.wind.gust * 3.6).toFixed(1) : 0;
            document.getElementById(`gust${id}`).innerHTML = gustValue + " km/h";
        })
        .catch(err => console.error(err));
}

getTableData(city1, 1);
getTableData(city2, 2);
getTableData(city3, 3);
getTableData(city4, 4);
getTableData(city5, 5);
getWeather(defaultCity)
