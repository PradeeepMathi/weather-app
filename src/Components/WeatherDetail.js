import "../Stylsheet/WeatherDetail.css";
// import { useState } from "react";
import HumidityData from "./HumidityData";
export default function WeatherDetail({ icon,setIcon,temp,city,country,lat,log,humiditys,winds}) {
  return (
    <>
      <div className="img">
        <img className="imsge" src={icon} alt="" />
      </div>
      <div className="temp">{temp} °c</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Longitude</span>
          <span>{log}</span>
        </div>
        
      </div>
      <HumidityData humiditys={humiditys} winds={winds}/>
    </>
  );
}
