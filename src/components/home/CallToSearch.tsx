import React from 'react'
import AnimatedSearchIcon from '../ui/animatedSearchIcon'

const CallToSearch = () => {
  return (
    <div className='py-20 flex flex-col justify-center items-center gap-5'>
      <AnimatedSearchIcon/>
      <p className='text-textGray text-base md:text-lg text-center'>Search for a city to see weather information</p>
    </div>
  )
}

export default CallToSearch