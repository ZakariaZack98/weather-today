// components/loaders/WeatherLoader.tsx
import { Player } from '@lottiefiles/react-lottie-player'
const WeatherLoader = () => {
  return (
    <div className="flex justify-center items-center h-50 lg:h-150  relative">
      <Player
        autoplay
        loop
        src={'/animations/world-search.json'}
        className='h-100 w-full scale-200 lg:scale-150 pt-20 sm:pt-40 md:pt-0 '
      />
      <div className=" absolute flex w-full h-full justify-center items-center animate-pulse">
        <h3 className="font-light text-4xl">Searching weather data...</h3>
      </div>
    </div>
  )
}

export default WeatherLoader