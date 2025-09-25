import CallToSearch from "@/components/home/CallToSearch";
import DailyForecast from "@/components/home/DailyForecast";
import HourlyForecast from "@/components/home/HourlyForecast";
import CurrentWeatherDisplay from "@/components/home/CurrentWeatherDisplay";

export default function Home() {
  return (
    <main className="w-full">
      <div className="container mx-auto grid grid-cols-12 gap-6 items-stretch ">
        {/* =========================== Left side: Current and daily forecast ========================= */}
        <div className="col-span-8">
          <div className="flex flex-col gap-6 justify-between">
            <CurrentWeatherDisplay/>
            <DailyForecast/>
          </div>
        </div>
        {/* ================================ Right side: Hourly forecast ============================== */}
        <div className="col-span-4">
          <HourlyForecast/>
        </div>
      </div>
    </main>
  );
}
