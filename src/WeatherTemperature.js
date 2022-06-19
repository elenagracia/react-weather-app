import React, {useState} from "react";

export default function WeatherTemperature(props) {
    const [unit, setUnit] = useState("celsius");
    function ShowFahrenheit(event) {
        event.preventDefault();
        setUnit("fahrenheit");
    }

    function showCelsius(event) {
        event.preventDefault();
        setUnit("celsius")
    }

    if (unit === "celsius") {
        return(
            <span className="WeatherTemperature">
                <span className="Temperature">{Math.round(props.celsius)}</span> 
                <span className="unit">°C | <a href="/" onClick={ShowFahrenheit}>°F</a>
                </span>
            </span>
        )
    } else {
        let fahrenheit = (props.celsius * 9) /5 + 32;
        return(
            <span className="WeatherTemperature">
                <span className="Temperature">{Math.round(fahrenheit)}</span> 
                <span className="unit"><a href="/" onClick={showCelsius}>°C</a> | °F
                </span>
            </span>
        )
    }
    
}