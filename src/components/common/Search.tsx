'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { SearchIcon } from 'lucide-react'
import { useLocationSuggestions } from '@/hooks/useLocationSuggestions'
import LocationResultCard from './LocationResultCard'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data: suggestions, error } = useLocationSuggestions(searchTerm);


  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div className='container mx-auto flex flex-col items-center justify-center gap-8 my-8'>
      <h4 className='font-light text-4xl text-center'>How's the sky looking today?</h4>
      {/* =====================search area ======================= */}
      <div className="flex items-center justify-center gap-3 relative w-1/2 mx-auto">
        <Input type='text' placeholder='Search for a place' value={searchTerm} className='ps-10 bg-transparentBlack border border-gray-700 h-11 font-inter rounded-[8px]' onChange={e => handleSearchTermChange(e)}/>
        <SearchIcon className='absolute left-3 w-5 text-black top-1/2 -translate-y-[50%]'/>
        {/* ------------ suggestion list ================ */}
        {suggestions && suggestions.length > 0 && <div className="absolute w-full left-0 top-14 rounded-md overflow-hidden shadow-2xl border border-gray-500 flex flex-col " onClick={() => setSearchTerm('')}>
          {
          suggestions.map(location => (
            <LocationResultCard locationData={location}/>
          ))
        }
        {/* ============ error component ================= */}
        {
          error && <div className='h-40 w-full flex justify-center items-center bg-yellow absolute top-14 left-0' >
            <p className='text-black'>Error fetching location: {error}</p>
          </div>
        }
        </div>}
        <Button size={'lg'} className='bg-btnBlue rounded-[8px] text-white'>Search</Button>
      </div>
    </div>
  )
}

export default Search