"use client";

import { loadingCityAtom, placeAtom } from "@/app/atom";
import axios from "axios";
import { useAtom } from "jotai";
import { useState } from "react";
import { GoLocation } from "react-icons/go";
import { TbCurrentLocation } from "react-icons/tb";
import { TiWeatherSunny } from "react-icons/ti";
import SearchBox from "./SearchBox";
import SuggestionBox from "./SuggestionBox";

type Props = { location?: string };

const Navbar = ({ location }: Props) => {
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity, setLoadingCity] = useAtom(loadingCityAtom);

  const handleSuggestionClick = (item: string) => {
    setCity(item);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length === 0) {
      setError("Location not found. Please try again.");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 3000);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLoadingCity(true);
          const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
          );
          const placeName =
            response.data && response.data.length > 0
              ? response.data[0].name
              : "Unknown location";
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(placeName);
          }, 500);
        } catch (error) {
          setLoadingCity(false);
        }
      });
    }
  };

  const handleInputChange = async (value: string) => {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );
        const suggestions = response.data.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  return (
    <>
      <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
        <div className='h-[80x] w-full flex justify-between items-center max-w-7x1 px-3 mx-auto'>
          <div className='flex items-center justify-center gap-2'>
            <h2 className='text-gray-500 text-3xl'>NextWeather</h2>
            <TiWeatherSunny className='text-3xl mt-1 text-orange-400' />
          </div>
          <div className='flex gap-5'>
            <div className='flex gap-2 items-center'>
              <TbCurrentLocation
                title='Your Current Location'
                onClick={handleCurrentLocation}
                className='text-2xl text-gray-700 hover:opacity-60 cursor-pointer'
              />
              <GoLocation title='Search Location' className='text-xl' />
              <p className='text-slate-950 text-sm'>{location}</p>
            </div>
            <div className='relative hidden md:flex'>
              <SearchBox
                value={city}
                onChange={(e) => handleInputChange(e.target.value)}
                onSubmit={handleSubmit}
              />
              <SuggestionBox
                showSuggestions={showSuggestions}
                suggestions={suggestions}
                handleSuggestionClick={handleSuggestionClick}
                error={error}
              />
            </div>
          </div>
        </div>
      </nav>
      <section className='flex max-w-7xl px-3 md:hidden'>
        <div className='relative hidden md:flex'>
          <SearchBox
            value={city}
            onChange={(e) => handleInputChange(e.target.value)}
            onSubmit={handleSubmit}
          />
          <SuggestionBox
            showSuggestions={showSuggestions}
            suggestions={suggestions}
            handleSuggestionClick={handleSuggestionClick}
            error={error}
          />
        </div>
      </section>
    </>
  );
};

export default Navbar;
