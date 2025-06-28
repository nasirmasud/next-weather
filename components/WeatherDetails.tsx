import React from "react";
import { FiDroplet, FiSunrise, FiSunset, FiWind } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { WiBarometer } from "react-icons/wi";

export interface WeatherDetailsProps {
  visibility: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function WeatherDetails(props: WeatherDetailsProps) {
  const {
    visibility = "25km",
    humidity = "50%",
    windSpeed = "10 km/h",
    airPressure = "1013 hPa",
    sunrise = "6:00 AM",
    sunset = "6:00 PM",
  } = props;
  return (
    <>
      <SingleWeatherDetails
        information='Visibility'
        icon={<LuEye className='text-slate-800' />}
        value={visibility}
      />
      <SingleWeatherDetails
        information='Humidity'
        icon={<FiDroplet className='text-slate-800' />}
        value={humidity}
      />
      <SingleWeatherDetails
        information='Wind Speed'
        icon={<FiWind className='text-slate-800' />}
        value={windSpeed}
      />
      <SingleWeatherDetails
        information='Air Pressure'
        icon={<WiBarometer className='text-slate-800' />}
        value={airPressure}
      />
      <SingleWeatherDetails
        information='Sunrise'
        icon={<FiSunrise className='text-slate-800' />}
        value={sunrise}
      />
      <SingleWeatherDetails
        information='Sunset'
        icon={<FiSunset className='text-slate-800' />}
        value={sunset}
      />
    </>
  );
}

export interface SingleWeatherDetailsProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}
function SingleWeatherDetails(props: SingleWeatherDetailsProps) {
  return (
    <div className='flex flex-col justify-between gap-2 items-center text-sm font-semibold text-slate-800'>
      <p className='whitespace-nowrap'>{props.information}</p>
      <div className='text-3xl'>{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
}
