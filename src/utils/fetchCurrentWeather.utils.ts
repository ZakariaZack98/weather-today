import axios from 'axios'
import { CurrentWeatherDataType } from '@/types/currentWeatherData'

/**
 * TODO: Fetches current weather data for the given location name and unit system.
 * @param {string} locationQuery - Name of the locatio
 * @param {string} units - Unit system
 * @returns {Promise<CurrentWeatherDataType>} A promise that resolves to the current weather data.
 * @throws {Error} If there is an error fetching the weather data.
 */
export const FetchCurrentWeather = async (
  locationQuery: string,
  units: string = 'metric'
): Promise<CurrentWeatherDataType> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
  const baseUrl =
    process.env.NEXT_PUBLIC_WEATHER_BASE_URL ||
    'https://api.openweathermap.org/data/2.5/weather'

  try {
    const response = await axios.get(baseUrl, {
      params: {
        q: locationQuery,
        units,
        appid: apiKey,
      },
    })

    return response.data as CurrentWeatherDataType
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error('Error fetching weather data:', err.message)
      throw new Error(err.response?.data?.message || 'Failed to fetch weather data')
    } else {
      console.error('Unexpected error:', err)
      throw new Error('An unexpected error occurred')
    }
  }
}