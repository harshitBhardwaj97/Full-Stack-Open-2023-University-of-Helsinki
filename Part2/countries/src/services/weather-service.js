import axios from "axios";

const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

const getWeatherAtLatAndLong = (lat, lon) => {
  const request = axios.get(
    `${BASE_URL}/?lat=${lat}&lon=${lon}&appid=c71d1f6000e39f9f9d0497939c715b51`
  );
  return request.then((response) => response.data);
};

export default { getWeatherAtLatAndLong };
