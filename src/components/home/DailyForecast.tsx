'use client'
import React from 'react'
import DailyForecastCard from '../common/DailyForecastCard'
import { useAppSelector } from '@/redux/hooks'
import { groupForecastByDay } from '@/utils/groupForecastByDate'

const DailyForecast = () => {
  const hourlyForecastData = useAppSelector(state => state.weather.hourlyForecastData);
  const groupedByDay = groupForecastByDay(hourlyForecastData);

  return (
    <div className='flex flex-col gap-2 2xl:gap-4'>
      <h5 className='text-base 2xl:text-lg font-bold'>Daily Forecast</h5>
      <div className="grid grid-cols-6 gap-2 md:gap-4">
        {
          Object.values(groupedByDay)?.map((dataByDay,idx) => (
            <DailyForecastCard key={idx} forecastDataByDay={dataByDay}/>
          ))
        }
      </div>
    </div>
  )
}

export default DailyForecast