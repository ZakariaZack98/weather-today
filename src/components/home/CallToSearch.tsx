import { SearchIcon } from 'lucide-react'
import React from 'react'

const CallToSearch = () => {
  return (
    <div className='py-20 flex flex-col justify-center items-center gap-5'>
      <picture>
        <img src="/images/logo/Search.png" alt="search_icon" />
      </picture>
      <p className='text-textGray text-lg text-center'>Search for a city to see weather information</p>
    </div>
  )
}

export default CallToSearch