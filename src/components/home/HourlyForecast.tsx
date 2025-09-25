'use client'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import HourlyForecastCard from '../common/HourlyForecastCard'
import { groupForecastByDay } from '@/utils/groupForecastByDate'
import { useAppSelector } from '@/redux/hooks'
import { HourlyForecastDataType } from '@/types/hourlyForecastData'
import { DayType } from '@/types/day'

const HourlyForecast = () => {
  const [day, setDay] = useState<DayType>('Today')
  const forecastData = useAppSelector((state) => state.weather.hourlyForecastData)
  const [groupedForecastDataByDate, setGroupedForecastDataByDate] = useState<Partial<Record<DayType, HourlyForecastDataType[]>>>({})

  useEffect(() => {
    if (forecastData) {
      setGroupedForecastDataByDate(groupForecastByDay(forecastData))
    }
  }, [forecastData])

  const selectedDaysForecast = groupedForecastDataByDate[day] ?? []

  const handleDayChange = (value: DayType) => {
    setDay(value)
  }

  return (
    <div className="p-4 2xl:p-6 rounded-2xl bg-transparentBlack h-full flex flex-col gap-2 2xl:gap-4">
      {/*  ================================= heading and dropdown ================================== */}
      <div className="flex justify-between items-center">
        <h5 className="font-bold text-base 2xl:text-lg">Hourly forecast</h5>
        <Select onValueChange={handleDayChange}>
          <SelectTrigger className="w-[140px] bg-transparentBlack border border-gray-700">
            <SelectValue placeholder="Today" className="text-textGray" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.keys(groupedForecastDataByDate).map((dayName) => (
                <SelectItem key={dayName} value={dayName}>
                  {dayName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/*  ======================================= forecast list ======================================= */}
      <div>
        {selectedDaysForecast.map((chunk, idx, arr) => (
          <div
            key={chunk.dt}
            className={`${idx < arr.length - 1 ? 'border-b border-gray-600' : ''}`}
          >
            <HourlyForecastCard forecastChunk={chunk} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default HourlyForecast