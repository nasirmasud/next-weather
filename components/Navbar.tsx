"use client";

import axios from "axios";
import { useState } from "react";
import { GoLocation } from "react-icons/go";
import { TbCurrentLocation } from "react-icons/tb";
import { TiWeatherSunny } from "react-icons/ti";
import SearchBox from "./SearchBox";

interface Props {}

const handleChange = () => {};
const handleSubmit = () => {};

const Navbar = ({}: Props) => {
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
        );
        setSuggestions(response.data.map((item: any) => item.name));
        setError("");
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
      <div className='h-[80x] w-full flex justify-between items-center max-w-7x1 px-3 mx-auto'>
        <div className='flex items-center justify-center gap-2'>
          <h2 className='text-gray-500 text-3xl'>NextWeather</h2>
          <TiWeatherSunny className='text-3xl mt-1 text-orange-400' />
        </div>
        <div className='flex gap-5'>
          <div className='flex gap-2 items-center'>
            <TbCurrentLocation className='text-2xl text-gray-700 hover:opacity-60 cursor-pointer' />
            <GoLocation className='text-xl' />
            <p className='text-slate-950 text-sm'>Chittagong</p>
          </div>
          <div className='relative'>
            <SearchBox
              value={city}
              onChange={(e) => handleInputChange(e.target.value)}
              onSubmit={handleSubmit}
            />
            <SuggestionBox />
          </div>
        </div>
      </div>
    </nav>
  );
};

function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <ul className='mb-4 bg-white absolute border top-[44px] left-0 border-green-400 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2'>
      {showSuggestions &&
        suggestions.map((item) => (
          <li
            key={item}
            className='cursor-pointer p-1 rounded hover:bg-green-200'
            onClick={() => handleSuggestionClick(item)}
          >
            {item}
          </li>
        ))}
    </ul>
  );
}

export default Navbar;
