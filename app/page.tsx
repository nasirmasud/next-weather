"use client";

import Container from "@/components/Container";
import ForecastInDetail from "@/components/ForecastInDetail";
import Navbar from "@/components/Navbar";
import WeatherDetails from "@/components/WeatherDetails";
import getIconByDayNight from "@/utils/getIconByDayNight";
import { kelvinToCelsius } from "@/utils/kelvinToCelsius";
import meterToKm from "@/utils/meterToKm";
import { windSpeedCon } from "@/utils/windSpeedCon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const WeatherIcons = dynamic(() => import("@/components/WeatherIcons"), {
  ssr: false,
});

type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=dhaka&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      console.log(data);
      return data;
    },
  });
  const firstData = data?.list[0];
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isLoading)
    return (
      <div className='flex items-center min-h-screen justify-center'>
        <p className='animate-bounce'>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className='flex items-center min-h-screen justify-center'>
        <p>Error loading data</p>
      </div>
    );

  return (
    <div className='flex flex-col gap-4 bg-gray-100 min-h-screen'>
      <Navbar />
      <main className='px-3 mx-auto flex flex-col gap-9 w-full pb-10 pt-4 max-w-7xl'>
        <section className='space-y-3'>
          <div className='space-y-2'>
            <h2 className='flex gap-1 text-2xl items-end'>
              <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
              <p className='text-lg'>
                ({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})
              </p>
            </h2>
            <Container className='gap-10 px-6 items-center'>
              <div className='flex flex-col px-4'>
                <span className='text-5xl'>
                  {kelvinToCelsius(firstData?.main.temp ?? 296.37)}°
                </span>
                <p className='text-s space-x-1 whitespace-nowrap'>
                  <span>Feels Like</span>
                  <span>
                    {kelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                  </span>
                </p>
                <p className='text-xs space-x-2'>
                  <span>
                    {kelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓{" "}
                  </span>
                  <span>
                    {kelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑{" "}
                  </span>
                </p>
              </div>
              <div className='flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3'>
                {isClient &&
                  data?.list.map((data, index) => (
                    <div
                      key={index}
                      className='flex flex-col justify-between gap-2 items-center text-xs font-semibold'
                    >
                      <p className='whitespace-nowrap'>
                        {format(parseISO(data.dt_txt), "h:mm a")}
                      </p>
                      <WeatherIcons
                        iconName={getIconByDayNight(
                          data.weather[0].icon,
                          data.dt_txt
                        )}
                      />
                      <p>{kelvinToCelsius(data.main.temp ?? 0)}°</p>
                    </div>
                  ))}
              </div>
            </Container>
          </div>
          <div className='flex gap-4'>
            {/* Left */}
            <Container className='w-fit justify-center flex-col px-4 items-center'>
              <p className='capitalize text-center'>
                {firstData?.weather[0].description}
              </p>
              <WeatherIcons
                iconName={getIconByDayNight(
                  firstData?.weather[0].icon ?? "",
                  firstData?.dt_txt ?? ""
                )}
              />
            </Container>
            {/* Right */}
            <Container className='bg-orange-400/70 px-6 gap-4 justify-between overflow-x-auto'>
              <WeatherDetails
                visibility={meterToKm(firstData?.visibility ?? 1000)}
                airPressure={`${firstData?.main.pressure ?? 0} hPa`}
                humidity={`${firstData?.main.humidity ?? 0}%`}
                windSpeed={windSpeedCon(firstData?.wind.speed ?? 1.64)}
                sunrise={`${format(
                  fromUnixTime(data?.city.sunrise ?? 1702949452),
                  "h:mm a"
                )}`}
                sunset={`${format(
                  fromUnixTime(data?.city.sunset ?? 1702988252),
                  "h:mm a"
                )}`}
              />
            </Container>
          </div>
        </section>

        {/* 7 Days Forecast */}
        <section className='flex w-full flex-col gap-4'>
          <p className='text-2xl'>Forecast (7 Days)</p>
          <ForecastInDetail
            weatherIcon={""}
            date={""}
            day={""}
            temp={0}
            feelsLike={0}
            minTemp={0}
            maxTemp={0}
            description={""}
            visibility={""}
            humidity={""}
            windSpeed={""}
            airPressure={""}
            sunrise={""}
            sunset={""}
          />
        </section>
      </main>
    </div>
  );
}
