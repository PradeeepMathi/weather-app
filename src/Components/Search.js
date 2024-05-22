import find from "../assets/search.png";
import "../Stylsheet/Search.css";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
/*Images*/
import WeatherDetail from "./WeatherDetail";
import lottie from "../assets/Animation - 1716030696896.json";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "cc29ca4dec57bff8260d7efeff0b8e09";
export default function Search() {
  const [search, setSearch] = useState("London");
  const [loading, setLoading] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("0");
  const [log, setLog] = useState("0");
  const [humiditys, setHumiditys] = useState(0);
  const [winds, setWind] = useState(0);
  const [icon, setIcon] = useState(cloud);
  const [error,serError] = useState(false)

  async function fetchData() {
    setLoading(true);
    // setCityNotFound(true);

    try {
      const res = await fetch(
        `${URL}?q=${search}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod === "404") {
        console.error("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setCity(data.name);
      setCountry(data.sys.country);
      setTemp(Math.floor(data.main.temp));
      setHumiditys(data.main.humidity);
      setWind(data.wind.speed);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      setIcon(weatherIconMap[data.weather[0].icon || clear]);
      setLoading(false);
      setCityNotFound(false);

      console.log(data);
    } catch (error) {
      console.error("error fetching data:", error);
      serError(true)
      setLoading(false);
    }
    setSearch("");
  }
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      fetchData();
      setSearch("");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const weatherIconMap = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": drizzle,
    "03n": drizzle,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  return (
    <>
      <div className="container">
        <div className="i-container">
          <input
            className="search-input"
            onKeyDown={handleEnter}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            value={search}
            placeholder="Search City"
          />
          <div className="img-container">
            <img
              onClick={fetchData}
              className="img-content"
              src={find}
              alt=""
            />
          </div>
        </div>
        <div>
          {loading ? (
            <Lottie animationData={lottie} />
          ) : cityNotFound ? (
            <h1 className="citynot">city not found</h1>
          ) : error ? (<h1 className="citynot">An error occured while fetching data.!</h1>):(
            <WeatherDetail
              icon={icon}
              search={search}
              setIcon={setIcon}
              temp={temp}
              city={city}
              country={country}
              lat={lat}
              log={log}
              humiditys={humiditys}
              winds={winds}
            />
          )}
        </div>
        <p className='copyright'>
                Designed by <span>Pradeep</span>
            </p>
      </div>
    </>
  );
}
