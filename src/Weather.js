import React, {useState} from "react";

import "./Weather.css"
import axios from "axios";

export default function Weather(props) {
    const [weatherData, setweatherData] = useState({ ready: false });
    function handleResponse(response) {
    console.log(response.data);
    setweatherData({
        ready: true,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        date: "Wednesday 07:00",
        wind: response.data.wind.speed,
        city: response.data.name,
        description: response.data.weather[0].description,
        iconUrl: "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
    })
    }

    if (weatherData.ready) {
        return (
            <div className="Weather">
                <form>
                    <div className="row">
                        <div className="col-9">
                            <input type="search" placeholder="Enter a city" className="form-control" autoFocus="on"/>
                        </div>
                        <div className="col-3">
                            <input type="submit" value="Search" className="btn btn-primary w-100" />
                        </div>
                    </div>
                </form>
                <h1>{weatherData.city}</h1>
                <ul>
                    <li>{weatherData.date}</li>
                    <li className="text-capitalize">{weatherData.description}</li>
                </ul>
                <div className="row mt-3">
                    <div className="col-6">
                        <div className="clearfix">
                            <img src={weatherData.iconUrl} alt={weatherData.description}/> <span className="Temperature">{Math.round(weatherData.temperature)}</span><span className="unit">°C</span>
                        </div>
                    </div>
                    <div className="col-6">
                        <ul>
                            <li>
                                Precipitation: 15%
                            </li>
                            <li>
                                Humidity: {weatherData.humidity}%
                            </li>
                            <li>
                                Wind: {weatherData.wind} Km/h
                            </li>
                        </ul>
                    </div>
                </div>
               </div>
            )
    } else {
        const apiKey = "e459f7ba313263506eb902df78d7cfa6";
        let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(handleResponse);

        return "loading..."
    }  
}