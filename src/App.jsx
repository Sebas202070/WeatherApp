import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [ciudad, setCiudad] = useState("");
  const [dataweather, setDataweather] = useState(null);

  const uriData = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "9f0d2fcf1662a3c936839026b7dc3291";

  const fetchCiudad = async () => {
    try {
      const response = await fetch(`${uriData}?q=${ciudad}&appid=${API_KEY}`);
      const data = await response.json();
      setDataweather(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCiudad = (e) => {
    setCiudad(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCiudad();
  };

  /* useEffect(() => {
    fetchCiudad();
  }, []); */
  const difKelvin = 273.5;
  return (
    <div>
      <h1>Weather App</h1>
      <form action="">
        <input
          type="text"
          placeholder="Ciudad..."
          value={ciudad}
          onChange={handleCiudad}
        />
        <button type="submit" onClick={handleSubmit}>
          Buscar
        </button>
      </form>
      {dataweather && (
        <div>
          <h1>{dataweather?.name}</h1>

          <p>Temperatura: {parseInt(dataweather?.main?.temp - difKelvin)} °C</p>

          <img
            src={`https://openweathermap.org/img/wn/${dataweather.weather[0].icon}@2x.png`}
            alt="not found"
          />
        </div>
      )}
    </div>
  );
}

export default App;
