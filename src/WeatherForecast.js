import React, { useState, useEffect } from "react";
import "./WeatherForecast.css"
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";
import { cleanup } from "@testing-library/react";

export default function WeatherForecast(props) {
    let [loaded, setLoaded] = useState(false);
    let [forecast, setForecast] = useState(false);

    useEffect(() => {
        setLoaded(false);
    }, [props.coordinates])

    function handleResponse(response) {
        setForecast(response.data.daily);
        setLoaded(true);
    }

 
    if (loaded) {
        console.log(forecast)
        return (
            <div className="WeatherForecast">
                <div className="row">
                    {forecast.map(function(dailyForecast, index) {
                        if (index <5) {
                            return (
                            <div className="col" key={index}>
                                <WeatherForecastDay data={dailyForecast} />
                            </div>
                        );
                      }
                    })}
                    
                </div>
            </div>
        );
        
    } else {
        let apiKey = "0669debb35f22d3a6a8ac1ccc83f29df"
        let longitude = props.coordinates.lon;
        let latitude = props.coordinates.lat;
        let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${apiKey}&units=metric`
    
        axios.get(apiUrl).then(handleResponse);

        return null;
    }
    
   
}