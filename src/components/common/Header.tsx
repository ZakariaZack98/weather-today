"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUnit, UnitType } from "@/redux/slices/unitSlice";
import { fetchAllWeatherData } from "@/redux/slices/weatherDataSlice";

const Header = () => {
  const { locationName } = useAppSelector((state) => state.weather);
  const dispatch = useAppDispatch();

  const handleValueChange = (value: UnitType) => {
    dispatch(setUnit(value));
    dispatch(
      fetchAllWeatherData({
        locationQuery: locationName.split(",")[0],
        unitSystem: value,
      })
    );
  };

  return (
    <header className="container mx-auto flex justify-between items-center w-full ">
      {/* ============ Logo side ============ */}
      <div className="flex items-center gap-x-3">
        <picture>
          <img
            src="/images/logo/logo-icon.png"
            alt="logo_icon_sun"
            className="h-6 w-6 sm:h-8 sm:w-8"
          />
        </picture>
        <p className="text-lg sm:text-2xl font-semibold">Weather Today</p>
      </div>
      {/* =========== unit side ============= */}
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-[140px] bg-transparentBlack border border-gray-700 relative peer">
          <SelectValue placeholder="🔅 Units" className="text-textGray" />
          {/* Custom tringle icon */}
          <span className="absolute right-2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="white"
              className="transition-transform duration-300 peer-data-[state=open]:rotate-180 scale-200 me-2"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </span>
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="metric">Metric</SelectItem>
            <SelectItem value="imperial">Imperial</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </header>
  );
};

export default Header;
