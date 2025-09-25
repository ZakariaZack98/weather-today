'use client'
import React from 'react'
import DailyForecastCard from '../common/DailyForecastCard'
import { useAppSelector } from '@/redux/hooks'
import { groupForecastByDay } from '@/utils/groupForecastByDate'
import { GetDailyIcon } from '@/utils/getDailyIcon'

const DailyForecast = () => {
  const hourlyForecastData = useAppSelector(state => state.weather.hourlyForecastData);
  const groupedByDay = groupForecastByDay(hourlyForecastData);

  return (
    <div className='flex flex-col gap-4'>
      <h5 className='text-lg font-bold'>Daily Forecast</h5>
      <div className="grid grid-cols-6 gap-4">
        {
          Object.values(groupedByDay)?.map(dataByDay => (
            <DailyForecastCard forecastDataByDay={dataByDay}/>
          ))
        }
      </div>
    </div>
  )
}

export default DailyForecast