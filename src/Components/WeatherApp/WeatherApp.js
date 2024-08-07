import React, { useState } from "react";
import axios from "axios";
import summer from "../../assest/summer.png";
import winter from "../../assest/winter.png";
import './Weatherapp.css';

function WeatherApp() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    data: {},
    error: false,
  });

  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setInput("");
      setWeather({ ...weather });
      const url = "https://api.openweathermap.org/data/2.5/weather";
      const api_key = "f47f6c067edbce9a7f7ef968c7d4f5ba";
      await axios
        .get(url, {
          params: {
            q: input,
            units: "metric",
            appid: api_key,
          },
        })
        .then((res) => {
          setWeather({ data: res.data, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setInput("");
          console.log("error", error);
        });
    }
  };

  const Emage = ({ weather }) => {
    if (weather && weather.data && weather.data.main) {
      return weather.data.main.temp > 20 ? (
        <img src={summer} className="weather-image" alt="summer" />
      ) : (
        <img src={winter} className="weather-image" alt="winter" />
      );
    }
    return null;
  };

  return (
    <div className="container text-center animate__animated animate__fadeInRight">
      <div className="search-bar my-4">
        <input
          type="text"
          className="form-control city-search "
          placeholder="Enter City Name"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={search}
        />
      </div>

      {weather.error && (
        <div className="alert alert-danger" role="alert">
          No data
        </div>
      )}
      {weather.data.main && (
        <div className="weather-result position-relative">
          <Emage weather={weather} />
          <div className="weather-info position-absolute top-50 start-50 translate-middle text-white text-center">
            <div className="city-name">
              <h2>
                {weather.data.name}, <span>{weather.data.sys.country}</span>
              </h2>
            </div>
            <div className="icon-temp">
              {Math.round(weather.data.main.temp)}
              <sup className="deg">°C</sup>
            </div>
            <div className="max-min-temp">
              <p>Max: {Math.round(weather.data.main.temp_max)}°C</p>
              <p>Min: {Math.round(weather.data.main.temp_min)}°C</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
