'use client'
import { useAppSelector } from "@/redux/hooks";
import { getFormattedTodayDate } from "@/utils/getFormattedDate.utils";
import React from "react";

const CurrentWeatherDisplay = () => {
  const { locationName, currentWeatherData, status, error } = useAppSelector(state => state.weather);
  const unit = useAppSelector(state => state.unit.value);

  const otherData = [
    {
      label: 'Feels Like',
      value: Math.round(currentWeatherData?.main.feels_like ?? 0),
      suffix: `°${unit === 'metric' ? 'C' : 'F'}`
    },
    {
      label: 'Humidity',
      value: currentWeatherData?.main.humidity,
      suffix: '%'
    },
    {
      label: 'Wind',
      value: currentWeatherData?.wind.speed,
      suffix: unit === 'metric' ? 'km/h' : 'm/h'
    },
    {
      label: 'Precipitation',
      value: currentWeatherData?.rain?.['1h'] || currentWeatherData?.rain?.['3h'] || 0,
      suffix: unit === 'metric' ? 'mm' : 'in'
    },
  ]

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="rounded-2xl flex flex-col gap-6 p-8" style={{background: 'linear-gradient(165deg,rgba(41, 98, 235, 1) 0%, rgba(143, 52, 233, 1) 95%)'}}>
        {/* ====================== location and date ============================= */}
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-2xl">{locationName}</h4>
            <p className="text-sm text-[#DBEAFE]">{getFormattedTodayDate()}</p>
          </div>
          <span className="text-3xl">📍</span>
        </div>
        {/* ====================== icon and temperature ============================= */}
        <div className="flex justify-between">
          <picture>
            <img src={`https://openweathermap.org/img/wn/${currentWeatherData?.weather[0].icon}@2x.png`} alt="" />
          </picture>
          <h1 className="font-light text-7xl">{Math.round(currentWeatherData?.main.temp ?? 0)}&deg;</h1>
        </div>
      </div>
      {/* ========================== Other updates ================================= */}
      <div className="grid grid-cols-4 w-full gap-4">
        {
          otherData?.map(data => (
            <div className="p-4 rounded-2xl bg-transparentBlack flex flex-col gap-2">
              <p className="text-sm text-textGray">{data.label}</p>
              <h5 className="text-2xl">{data.value}{data.suffix}</h5>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default CurrentWeatherDisplay;
