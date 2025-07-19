import { kelvinToCelsius } from "@/utils/kelvinToCelsius";
import Container from "./Container";
import WeatherDetails, { WeatherDetailsProps } from "./WeatherDetails";
import WeatherIcons from "./WeatherIcons";

export interface ForecastInDetailProps extends WeatherDetailsProps {
  day: string;
  temp: number;
  feelsLike: number;
  minTemp: number;
  maxTemp: number;
  description: string;
  weatherIcon: string;
  date: string;
}

export default function ForecastInDetail(props: ForecastInDetailProps) {
  const {
    weatherIcon = "10n",
    date = "19.09",
    day = "Tuesday",
    temp = 300.15,
    feelsLike = 300.15,
    description = "Clear sky",
  } = props;
  return (
    <Container className='gap-4'>
      {/* Left Section */}
      <section className='flex gap-4 items-center px-4'>
        <div className='flex flex-col items-center'>
          <WeatherIcons iconName={weatherIcon || "01d"} />
          <p>{date || "19.09"}</p>
          <p className='text-sm'>{day || "Tuesday"}</p>
        </div>
        {/* Temperature */}
        <div className='flex flex-col px-4'>
          <span className='text-5xl'>{kelvinToCelsius(temp ?? 0)}°</span>
          <p className='text-xs space-x-1 whitespace-nowrap'>
            <span>Feels Like</span>
            <span>{kelvinToCelsius(feelsLike ?? 0)}°</span>
          </p>
          <p className='capitalize'>{description}</p>
        </div>
      </section>

      {/* Right Section */}
      <section className='flex justify-between w-full gap-4 px-4 pr-10 overflow-x-auto'>
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}
