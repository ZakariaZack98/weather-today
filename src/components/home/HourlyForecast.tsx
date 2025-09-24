import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import HourlyForecastCard from '../common/HourlyForecastCard'

const HourlyForecast = () => {
  //mockdata
  const mock = [1,2,3,4,5,6,7,8]


  return (
    <div className='p-6 rounded-2xl bg-transparentBlack h-full flex flex-col gap-4'>
      {/*  ================================= heading and dropdown ================================== */}
      <div className="flex justify-between items-center">
        <h5 className="font-bold text-lg">Daily forecast</h5>
        <Select>
          <SelectTrigger className="w-[140px] bg-transparentBlack border border-gray-700">
            <SelectValue placeholder="Today" className="text-textGray" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="sunday">Sunday</SelectItem>
              <SelectItem value="monday">Monday</SelectItem>
              <SelectItem value="tuesday">Tuesday</SelectItem>
              <SelectItem value="wednesday">Wednesday</SelectItem>
              <SelectItem value="thursday">Thursday</SelectItem>
              <SelectItem value="friday">Friday</SelectItem>
              <SelectItem value="saturday">Saturday</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        {
        mock.map((item, idx, arr) => (
          <div key={item} className={`${idx < arr.length - 1 ? 'border-b border-gray-700': ''}`}>
            <HourlyForecastCard/>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default HourlyForecast