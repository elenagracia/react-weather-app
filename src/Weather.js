import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import "./Weather.css"
import WeatherIcon from "./WeatherIcon";
import axios from "axios";

export default function Weather(props) {
    const [weatherData, setweatherData] = useState({ ready: false });
    const [city, setCity] = useState(props.defaultCity);
    function handleResponse(response) {
    setweatherData({
        ready: true,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        date: new Date(response.data.dt * 100),
        wind: response.data.wind.speed,
        city: response.data.name,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        });
    }

    function search () {
        const apiKey = "e459f7ba313263506eb902df78d7cfa6";
        let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(handleResponse);
    }

    function handleSubmit(event) {
        event.preventDefault();
        search();
    }

    function handleCityChange(event) {
        setCity(event.target.value);
    }

    if (weatherData.ready) {
        return (
            <div className="Weather">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-9">
                            <input type="search" placeholder="Enter a city" className="form-control" autoFocus="on" onChange={handleCityChange} />
                        </div>
                        <div className="col-3">
                            <input type="submit" value="Search" className="btn btn-primary w-100" />
                        </div>
                    </div>
                </form>
                <WeatherInfo data={weatherData} />
            </div>
        );
    } else {
        search();
        return "loading..."
    }  
}