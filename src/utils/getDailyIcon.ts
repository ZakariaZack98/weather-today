import { HourlyForecastDataType } from "@/types/hourlyForecastData";

const WEATHER_PRIORITY: string[] = [
  "Thunderstorm",
  "Drizzle",
  "Rain",
  "Snow",
  "Clouds",
  "Clear",
];

/**
 * TODO: Determine the dominant weather icon for a given day's forecast data.
 * Prioritizes conditions based on WEATHER_PRIORITY and returns the icon code
 * of the first matching condition found in the day's forecast entries.
 *
 * @param {HourlyForecastDataType[]} dailyData - Array of 3-hour step forecast entries for a single day.
 * @returns {{ icon: string }} An object containing the dominant weather icon code (e.g., "10d", "01n").
 */
export const GetDailyIcon = (
  dailyData: HourlyForecastDataType[]
): { icon: string } => {
  if (!dailyData || dailyData.length === 0) {
    return { icon: "01d" };
  }

  let dominantCondition = "Clear";

  for (const condition of WEATHER_PRIORITY) {
    if (dailyData.some((entry) => entry.weather?.[0]?.main === condition)) {
      dominantCondition = condition;
      break;
    }
  }

  const dominantEntry =
    dailyData.find((entry) => entry.weather?.[0]?.main === dominantCondition) ??
    dailyData[0];

  const icon = dominantEntry?.weather?.[0]?.icon ?? "01d";

  return { icon };
};
