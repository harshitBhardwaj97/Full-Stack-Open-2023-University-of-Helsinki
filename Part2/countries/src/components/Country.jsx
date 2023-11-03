import { React, useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [temparature, setTemparature] = useState(0);
  const [wind, setWind] = useState(0);
  const [weatherInfo, setWeatherInfo] = useState({});
  const [tempIcon, setTempIcon] = useState("");
  const WEATHER_BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;
  const lat = country.lat;
  const lon = country.lon;

  useEffect(() => {
    axios
      .get(
        `${WEATHER_BASE_URL}/?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_APP_WEATHER_API_KEY
        }`
      )
      .then((response) => {
        console.log(response.data);
        setWeatherInfo(response.data);
        setTemparature(response.data.main.temp - 273.15);
        setTempIcon(response.data.weather[0].icon);
        setWind(response.data.wind.speed);
      })
      .catch((error) => console.error(error));
  }, [country]);

  return (
    <div key={country.name} className="unique__country">
      <h1>{country.name}</h1>
      <div className="country__info">
        <p>Capital : {country.capital[0]}</p>
        <p>Area : {country.area}</p>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <div className="weatherInfo">
          <h2>Weather in {country.name.common}</h2>
          <p>Temparature : {temparature.toFixed(2)} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${tempIcon}@2x.png`}
            alt={tempIcon}
          />
          <p>Wind : {wind} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default Country;
