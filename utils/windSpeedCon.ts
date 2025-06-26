// Convert wind speed from m/s to km/h

export function windSpeedCon(windSpeed: number): string {
  const convertedSpeed = (windSpeed * 3.6).toFixed(1); // Convert m/s to km/h
  return `${convertedSpeed} km/h`;
}
