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

type Suggestion = {
  name: string;
  country?: string;
  state?: string;
};

type NavbarProps = {
  location?: string;
};

const GEOCODE_API_URL = "https://api.openweathermap.org/geo/1.0";

const Navbar = ({ location }: NavbarProps) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [, setPlace] = useAtom(placeAtom);
  const [, setLoadingCity] = useAtom(loadingCityAtom);

  const handleSuggestionClick = (item: string) => {
    setCity(item);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingCity(true);

    if (suggestions.length === 0) {
      setLoadingCity(false);
      return;
    }

    setTimeout(() => {
      setLoadingCity(false);
      setPlace(city);
      setShowSuggestions(false);
    }, 3000);
  };

  const fetchCurrentLocation = async (latitude: number, longitude: number) => {
    try {
      setLoadingCity(true);
      const response = await axios.get(
        `${GEOCODE_API_URL}/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
      );

      const placeName = response.data?.[0]?.name || "Unknown location";
      setPlace(placeName);
    } catch (error) {
      console.error("Failed to fetch location:", error);
    } finally {
      setTimeout(() => setLoadingCity(false), 500);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCurrentLocation(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  };

  const fetchLocationSuggestions = async (query: string) => {
    try {
      const response = await axios.get<Suggestion[]>(
        `${GEOCODE_API_URL}/direct?q=${query}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
      );
      return response.data.map((item) => item.name);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      return [];
    }
  };

  const handleInputChange = async (value: string) => {
    setCity(value);

    if (value.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const newSuggestions = await fetchLocationSuggestions(value);
    setSuggestions(newSuggestions);
    setShowSuggestions(newSuggestions.length > 0);
  };

  return (
    <>
      <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
        <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
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
              />
            </div>
          </div>
        </div>
      </nav>

      <section className='flex max-w-7xl px-3 md:hidden'>
        <div className='relative w-full'>
          <SearchBox
            value={city}
            onChange={(e) => handleInputChange(e.target.value)}
            onSubmit={handleSubmit}
          />
          <SuggestionBox
            showSuggestions={showSuggestions}
            suggestions={suggestions}
            handleSuggestionClick={handleSuggestionClick}
          />
        </div>
      </section>
    </>
  );
};

export default Navbar;
