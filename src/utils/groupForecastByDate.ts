import { DayType } from "@/types/day"
import { HourlyForecastDataType } from "@/types/hourlyForecastData"

/**
 * TODO: Groups an Aray of hourly forecast data into labeled arrays by calendar date based on the 'dt' property of each one
 *
 * Each forecast entry is categorized as "Today", "Tomorrow", or the corresponding weekday name
 * (e.g., "Saturday", "Sunday") based on its timestamp.
 *
 * @param {HourlyForecastDataType[]} forecastList - Array of hourly forecast objcts from OpenWeatherMap api responsee
 *
 * @returns {Record<DayType, HourlyForecastDataType[]>} An object where each key is a date label
 * ("Today", "Tomorrow", or weekday name), and the value is an array of forecast entries for that day.
 */
export const groupForecastByDay = (
  forecastList: HourlyForecastDataType[]
): Record<DayType, HourlyForecastDataType[]> => {
  const grouped: Record<string, HourlyForecastDataType[]> = {}

  const today = new Date()
  const todayDateStr = today.toLocaleDateString('en-CA') 

  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const tomorrowDateStr = tomorrow.toLocaleDateString('en-CA')

  forecastList.forEach((item) => {
    const localDate = new Date(item.dt * 1000)
    const dateStr = localDate.toLocaleDateString('en-CA') 

    let label: string
    if (dateStr === todayDateStr) {
      label = 'Today'
    } else if (dateStr === tomorrowDateStr) {
      label = 'Tomorrow'
    } else {
      label = localDate.toLocaleDateString('en-US', { weekday: 'long' })
    }

    if (!grouped[label]) {
      grouped[label] = []
    }

    grouped[label].push(item)
  })

  return grouped
}