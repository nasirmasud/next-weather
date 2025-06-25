export default function getIconByDayNight(
  iconName: string,
  dateDime: string
): string {
  const hours = new Date(dateDime).getHours();
  const isDayTime = hours >= 6 && hours < 18; // Assuming day time is from 6 AM to 6 PM
  return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n");
}
