import { useState } from "react";
import one from "../images/img.jpg";
import axios from "axios";

const myStyle = {
  backgroundImage: `url(${one})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  minHeight: "100vh",
  width: "100vw", // FULL WIDTH
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");

  const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);

  function handleCity(event) {
    setCity(event.target.value);
  }

  function weatherReport() {
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e98654618f77f88f7718897c560690ee`)
      .then((success) => {
        setWeather(success.data.weather[0].main);
        setTemperature(kelvinToCelsius(success.data.main.temp));
        setDescription(success.data.weather[0].description);
        setCountry(success.data.sys.country);
      })
      .catch(() => {
        alert("City not found. Try again!");
      });
  }

  return (
    <div style={myStyle}>
      <div className="bg-gradient-to-b from-blue-300 to-blue-100 rounded-xl p-6 w-96 shadow-2xl text-center">
        <h1 className="text-2xl font-bold text-black">Weather Report</h1>
        <p className="bg-blue-700 text-white text-sm p-2 rounded mt-2 mb-4">I can give you a Weather report about the city!</p>

        <div className="flex items-center bg-white rounded shadow px-2 py-1 mb-4">
          <input
            onChange={handleCity}
            type="text"
            placeholder="Enter city..."
            className="flex-grow p-2 outline-none"
          />
          <button
            onClick={weatherReport}
            className="ml-2 px-4 py-2 bg-blue-100 text-blue-500 font-semibold rounded hover:bg-blue-200"
          >
            Get Report
          </button>
        </div>

        <div className="bg-blue-50 p-4 rounded shadow text-left text-gray-800">
          <p><strong>Country :</strong> <span className="capitalize">{country}</span></p>
          <p><strong>Weather :</strong> {weather}</p>
          <p><strong>Temperature :</strong> {temperature} °C</p>
          <p><strong>Description :</strong> <span className="capitalize">{description}</span></p>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
