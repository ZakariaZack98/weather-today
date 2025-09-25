"use client";
import { useAppSelector } from "@/redux/hooks";
import { groupForecastByDay } from "@/utils/groupForecastByDate";
import React from "react";
import DailyForecastCard from "../common/DailyForecastCard";

const DailyForecastMobile = () => {
  const hourlyForecastData = useAppSelector(
    (state) => state.weather.hourlyForecastData
  );
  const groupedByDay = groupForecastByDay(hourlyForecastData);
  return (
    <div className="flex flex-col gap-3">
      <h5 className="text-base 2xl:text-lg font-bold">Daily Forecast</h5>
      <div className="flex gap-2 sm:hidden w-[90dvw] overflow-x-scroll">
        {Object.values(groupedByDay)?.map((dataByDay, idx) => (
          <div key={idx} className="min-w-25">
            <DailyForecastCard forecastDataByDay={dataByDay} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecastMobile;
