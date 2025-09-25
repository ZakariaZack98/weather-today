"use client";
import CallToSearch from "@/components/home/CallToSearch";
import DailyForecast from "@/components/home/DailyForecast";
import HourlyForecast from "@/components/home/HourlyForecast";
import CurrentWeatherDisplay from "@/components/home/CurrentWeatherDisplay";
import { useAppSelector } from "@/redux/hooks";
import WeatherLoader from "@/components/home/WeatherLoader";

export default function Home() {
  const {
    locationName,
    currentWeatherData,
    hourlyForecastData,
    status,
    error,
  } = useAppSelector((state) => state.weather);
  return (
    <main className="w-full">
      {status === 'loading' ? <WeatherLoader/> : currentWeatherData ? (
        <div className="container mx-auto grid grid-cols-12 gap-6 items-stretch duration-500">
          {/* =========================== Left side: Current and daily forecast ========================= */}
          <div className="col-span-8">
            <div className="flex flex-col gap-6 justify-between">
              <CurrentWeatherDisplay />
              <DailyForecast />
            </div>
          </div>
          {/* ================================ Right side: Hourly forecast ============================== */}
          <div className="col-span-4">
            <HourlyForecast />
          </div>
        </div>
      ) : (
        <CallToSearch />
      )}
    </main>
  );
}
