import { HourlyForecastDataType } from '@/types/hourlyForecastData'
import { getHourLabelFromTimestamp } from '@/utils/getHourFromTimestamp'
import React from 'react'

const HourlyForecastCard = ({forecastChunk}: {forecastChunk: HourlyForecastDataType}) => {
  return (
    <div className='flex justify-between items-center text-sm h-12'>
      <div className="flex items-center gap-x-3 lg:gap-x-5">
        <picture>
          <img src={`https://openweathermap.org/img/wn/${forecastChunk.weather[0].icon}.png`} alt="weather_icon" />
        </picture>
        <p>{getHourLabelFromTimestamp(forecastChunk.dt)}</p>
      </div>
      <p>{Math.round(forecastChunk.main.temp)}&deg;</p>
    </div>
  )
}

export default HourlyForecastCard