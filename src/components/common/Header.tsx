'use client'
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
  const unit = useAppSelector(state => state.unit.value);
  const {locationName} = useAppSelector(state => state.weather)
  const dispatch = useAppDispatch();

  const handleValueChange = (value: UnitType) => {
    dispatch(setUnit(value))
    dispatch(fetchAllWeatherData({locationQuery: locationName.split(',')[0], metric: value}))
  }

  return (
    <header className="container mx-auto flex justify-between items-center w-full">
      {/* ============ Logo side ============ */}
      <div className="flex items-center gap-x-3">
        <picture>
          <img
            src="/images/logo/logo-icon.png"
            alt="logo_icon_sun"
            className="h-8 w-8"
          />
        </picture>
        <p className="text-2xl font-semibold">Weather Today</p>
      </div>
      {/* =========== unit side ============= */}
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-[140px] bg-transparentBlack border border-gray-700">
          <SelectValue placeholder="🔅 Units" className="text-textGray" />
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
