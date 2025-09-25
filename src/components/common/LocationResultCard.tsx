'use client'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchAllWeatherData, setLocationName } from '@/redux/slices/weatherDataSlice'
import { LocationType } from '@/types/location'
import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'
import { useRecentSearch } from '@/hooks/useRecentSearch'

countries.registerLocale(enLocale)

const LocationResultCard = ({ locationData }: { locationData: LocationType }) => {
  const { name, country, state, lat, lon } = locationData
  const fullLocationName = `${name}, ${state ? `${state}, `: ''}${countries.getName(country, 'en') || country}`;
  const { addLocation } = useRecentSearch();
  const unit = useAppSelector(state => state.unit.value)
  const dispatch = useAppDispatch()

  //* Fetches weather data for the given location and unit system and adds the location to the recent search list
  const fetchWeatherByLocation = (): void => {
    dispatch(fetchAllWeatherData({ locationQuery: name, metric: unit }));
    dispatch(setLocationName(fullLocationName))
    addLocation((fullLocationName));
  }
  return (
    <div
      className='p-4 bg-[#000000ce] backdrop-blur-3xl cursor-pointer hover:bg-purple-900 duration-300 z-50'
      onClick={fetchWeatherByLocation}
    >
      <p>📍 {fullLocationName}</p>
    </div>
  )
}

export default LocationResultCard

