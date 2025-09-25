"use client";
import CallToSearch from "@/components/home/CallToSearch";
import DailyForecast from "@/components/home/DailyForecast";
import HourlyForecast from "@/components/home/HourlyForecast";
import CurrentWeatherDisplay from "@/components/home/CurrentWeatherDisplay";
import { useAppSelector } from "@/redux/hooks";
import WeatherLoader from "@/components/home/WeatherLoader";
import DailyForecastMobile from "@/components/home/DailyForecastMobile";

export default function Home() {
  const {
    currentWeatherData,
    status,
    error,
  } = useAppSelector((state) => state.weather);
  return (
    <main className="w-full">
      {status === 'loading' ? <WeatherLoader/> : currentWeatherData ? (
        <div className="container mx-auto grid md:grid-cols-1 lg:grid-cols-12 gap-4 2xl:gap-6 items-stretch duration-500 ">
          {/* =========================== Left side: Current and daily forecast ========================= */}
          <div className="md:col-span-1 lg:col-span-8">
            <div className="flex flex-col gap-4 2xl:gap-6 justify-between">
              <CurrentWeatherDisplay />
              <div className="hidden sm:block">
                <DailyForecast />
              </div>
              <div className="block sm:hidden w-[90dvw] overflow-x-scroll">
                <DailyForecastMobile/>
              </div>
            </div>
          </div>
          {/* ================================ Right side: Hourly forecast ============================== */}
          <div className="md:col-span-1 lg:col-span-4">
            <HourlyForecast />
          </div>
        </div>
      ) : (
        <CallToSearch />
      )}
    </main>
  );
}
