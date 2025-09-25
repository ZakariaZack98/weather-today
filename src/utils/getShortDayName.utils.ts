import { HourlyForecastDataType } from "@/types/hourlyForecastData"

/**
 * TODO: Return shorrt weekday label dor a forecast entry.
 * If the entry is for today or tomorrow, returns "Today" or "Tomorrow".
 * @param {HourlyForecastDataType} forecast - A single hourly forecast object 
 * @returns {string} A label representing the forecast day.

 */
export const getShortDayName = (forecast: HourlyForecastDataType): string => {
  const forecastDate = new Date(forecast.dt * 1000)
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const isSameDate = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()

  if (isSameDate(forecastDate, today)) return 'Today'
  if (isSameDate(forecastDate, tomorrow)) return 'Tomorrow'

  return forecastDate.toLocaleDateString('en-US', { weekday: 'short' })
}