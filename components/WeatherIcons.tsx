"use client";
import cn from "@/utils/cn";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Image = dynamic(() => import("next/image"), { ssr: false });

type Props = {
  iconName: string;
};

export default function WeatherIcons(
  props: React.HTMLProps<HTMLDivElement> & Props
) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div {...props} className={cn("relative h-20 w-20")}>
      {isClient && (
        <Image
          width={100}
          height={100}
          alt='weather-icon'
          className='absolute h-full w-full'
          src={`https://openweathermap.org/img/wn/${props.iconName}@2x.png`}
        />
      )}
    </div>
  );
}
