import { ForecastResponseType } from '@/types/forecastResponse'
import axios from 'axios'

/**
 * TODO: Fetch hourly forecast data (3-hour stps) for the given location name and unit
 * @param {string} locationQuery - Name of the location 
 * @param {string} units - Unit system: metric | imperial
 * @returns {Promise<ForecastResponseType>} A promise that resolves to the hourly forecast data.
 * @throws {Error} If there is an error fetching the forecast data.
 */
export const FetchHourlyForecast = async (
  locationQuery: string,
  units: string = 'metric'
): Promise<ForecastResponseType> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
  const baseUrl =
    process.env.NEXT_PUBLIC_FORECAST_BASE_URL ||
    'https://api.openweathermap.org/data/2.5/forecast'

  try {
    const response = await axios.get(baseUrl, {
      params: {
        q: locationQuery,
        units,
        appid: apiKey,
      },
    })

    return response.data as ForecastResponseType
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error('Error fetching forecast data:', err.message)
      throw new Error(err.response?.data?.message || 'Failed to fetch forecast data')
    } else {
      console.error('Unexpected error:', err)
      throw new Error('An unexpected error occurred')
    }
  }
}
