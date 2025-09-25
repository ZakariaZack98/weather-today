import { HourlyForecastDataType } from '@/types/hourlyForecastData'
import { GetDailyIcon } from '@/utils/getDailyIcon'
import { getShortDayName } from '@/utils/getShortDayName.utils'
import React from 'react'

const DailyForecastCard = ({forecastDataByDay}: {forecastDataByDay: HourlyForecastDataType[]}) => {
  return (
    <div className='p-4 bg-transparentBlack flex flex-col justify-between items-center gap-3 text-sm rounded-[12px]'>
      <p className='text-textGray'>{getShortDayName(forecastDataByDay[0])}</p>
      <picture>
        <img src={`https://openweathermap.org/img/wn/${GetDailyIcon(forecastDataByDay).icon}.png`} alt="weather_icon" />
      </picture>
      <div className="flex flex-col items-center justify-center">
        <p>{Math.round(Math.max(...forecastDataByDay.map(forecastChunk => forecastChunk.main.temp_max)))}&deg;</p>
        <p className='text-xs text-textGray'>{Math.round(Math.min(...forecastDataByDay.map(forecastChunk => forecastChunk.main.temp_max)))}&deg;</p>
      </div>
    </div>
  )
}

export default DailyForecastCard