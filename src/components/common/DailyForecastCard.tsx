import React from 'react'

const DailyForecastCard = () => {
  return (
    <div className='p-4 bg-transparentBlack flex flex-col justify-between items-center gap-3 text-sm rounded-[12px]'>
      <p className='text-textGray'>{`Sun`}</p>
      <span className='text-2xl'>☀</span>
      <div className="flex flex-col items-center justify-center">
        <p>{`25`}&deg;</p>
        <p className='text-xs text-textGray'>{`18`}&deg;</p>
      </div>
    </div>
  )
}

export default DailyForecastCard