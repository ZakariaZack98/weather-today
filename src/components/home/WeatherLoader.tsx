// components/loaders/WeatherLoader.tsx
import { Player } from '@lottiefiles/react-lottie-player'
const WeatherLoader = () => {
  return (
    <div className="flex justify-center items-center lg:h-[70dvh] h-250 relative">
      <Player
        autoplay
        loop
        src={'/animations/world-search.json'}
        className='h-100 w-full'
      />
      <div className=" absolute flex w-full h-full justify-center items-center animate-pulse">
        <h3 className="font-light text-4xl">Searching weather data...</h3>
      </div>
    </div>
  )
}

export default WeatherLoader