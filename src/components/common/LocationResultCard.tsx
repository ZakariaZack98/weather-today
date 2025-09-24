import { LocationType } from '@/types/location'
import React from 'react'

const LocationResultCard = ({locationData}: {locationData: LocationType}) => {
  const {name, country, state, lat, lon} = locationData;
  return (
    <div className='p-4 bg-[#000000ce] backdrop-blur-3xl cursor-pointer hover:bg-purple-900 duration-300'>
      <p>📍 {name}, {state} {country}</p>
    </div>
  )
}

export default LocationResultCard