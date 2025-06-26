export default function meterToKm(VisibilityInMeters: number): string {
  const VisibilityInKm = VisibilityInMeters / 1000;
  return `${VisibilityInKm.toFixed(0)} km`;
}
