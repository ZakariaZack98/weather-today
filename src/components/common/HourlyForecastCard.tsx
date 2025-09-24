import React from 'react'

const HourlyForecastCard = () => {
  return (
    <div className='flex justify-between items-center text-sm h-12'>
      <div className="flex items-center gap-x-5">
        <span>{`☁️`}</span>
        <p>{`5AM`}</p>
      </div>
      <p>{`20`}&deg;</p>
    </div>
  )
}

export default HourlyForecastCard