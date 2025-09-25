'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAllWeatherData } from '@/redux/slices/weatherDataSlice';
import { LocationType } from '@/types/location'
import React from 'react'

const LocationResultCard = ({locationData}: {locationData: LocationType}) => {
  const {name, country, state, lat, lon} = locationData;
  const unit = useAppSelector(state => state.unit.value);
  const dispatch = useAppDispatch()
  
  return (
    <div className='p-4 bg-[#000000ce] backdrop-blur-3xl cursor-pointer hover:bg-purple-900 duration-300' onClick={() => dispatch(fetchAllWeatherData({locationQuery:name, metric:unit}))}>
      <p>📍 {name}, {state} {country}</p>
    </div>
  )
}

export default LocationResultCard