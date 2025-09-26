import { CurrentWeatherDataType } from '@/types/currentWeatherData'
import { HourlyForecastDataType } from '@/types/forecastData'

export interface WeatherState {
  recentSearchLoc: string[]
  locationName: string
  coord: [number, number] | null
  currentWeatherData: CurrentWeatherDataType | null
  hourlyForecastData: HourlyForecastDataType[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}