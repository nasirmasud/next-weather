import { kelvinToCelsius } from "@/utils/kelvinToCelsius";
import Container from "./Container";
import WeatherDetails, { WeatherDetailsProps } from "./WeatherDetails";
import WeatherIcons from "./WeatherIcons";

export interface ForecastInDetailProps extends WeatherDetailsProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feelsLike: number;
  minTemp: number;
  maxTemp: number;
  description: string;
}

export default function ForecastInDetail(props: ForecastInDetailProps) {
  const {
    weatherIcon = "10n",
    date = "19.09",
    day = "Tuesday",
    temp,
    feelsLike,
    minTemp,
    maxTemp,
    description,
  } = props;
  return (
    <Container className='gap-4'>
      {/* Left Section */}
      <section className='flex gap-4 items-center px-4'>
        <div>
          <WeatherIcons iconName={weatherIcon || "01d"} />
          <p>{date}</p>
          <p className='text-sm'>{day}</p>
        </div>{" "}
        <div className='flex flex-col px-4'>
          <span className='text-5xl'>{kelvinToCelsius(temp ?? 0)}°</span>
          <p className='text-sm space-x-1 whitespace-nowrap'>
            <span>Feels Like</span>{" "}
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
