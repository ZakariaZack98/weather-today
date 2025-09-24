'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { SearchCheck, SearchIcon } from 'lucide-react'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  return (
    <div className='container mx-auto flex flex-col items-center justify-center gap-8 my-8'>
      <h4 className='font-light text-4xl text-center'>How's the sky looking today?</h4>
      {/* =====================search area ======================= */}
      <div className="flex items-center justify-center gap-3 relative w-1/2 mx-auto">
        <Input type='text' placeholder='Search for a place' value={searchTerm} className='ps-10 bg-transparentBlack border border-gray-700 h-11 font-inter'/>
        <SearchIcon className='absolute left-3 w-5 text-black top-1/2 -translate-y-[50%]'/>
        <Button size={'lg'} className='bg-btnBlue rounded-[8px] text-white'>Search</Button>
      </div>
    </div>
  )
}

export default Search