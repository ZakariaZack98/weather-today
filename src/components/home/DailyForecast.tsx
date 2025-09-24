import React from 'react'
import DailyForecastCard from '../common/DailyForecastCard'

const DailyForecast = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h5 className='text-lg font-bold'>Daily Forecast</h5>
      <div className="grid grid-cols-7 gap-4">
        <DailyForecastCard/>
        <DailyForecastCard/>
        <DailyForecastCard/>
        <DailyForecastCard/>
        <DailyForecastCard/>
        <DailyForecastCard/>
        <DailyForecastCard/>
      </div>
    </div>
  )
}

export default DailyForecast