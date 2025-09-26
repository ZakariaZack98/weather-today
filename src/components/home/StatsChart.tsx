'use client'
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useAppSelector } from "@/redux/hooks";
import LineChart from "../common/LineChart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const StatsChart = () => {
  const chartModes = [
    "Overview",
    "Wind",
    "Humidity",
    "Feels like",
    "Pressure",
    "Visibility",
  ];
  const [activeMode, setActiveMode] = useState<string>(chartModes[0]);
  const { hourlyForecastData } = useAppSelector((state) => state.weather);
  const next24hours = hourlyForecastData.slice(0, 7);
  return (
    <div className="h-120 flex justify-between flex-col gap-3">
      {/* ===================== Button Group ======================== */}
      <div className="hidden sm:flex flex-wrap items-center gap-3">
        {chartModes.map((mode) => (
          <Button
            key={mode}
            size={"sm"}
            className={`sm:text-xs md:text-sm font-normal cursor-pointer ${
              activeMode === mode ? "bg-blue-500" : "bg-transparentBlack"
            }`}
            onClick={() => setActiveMode(mode)}
          >
            {mode}
          </Button>
        ))}
      </div>
      {/*  =================== Select for mobile devices =============== */}
      <div className="sm:hidden flex items-center justify-between gap-3">
        <p>Select Mode:</p>
        <Select onValueChange={value => setActiveMode(value)}>
          <SelectTrigger className="bg-transparentBlack [&_[data-placeholder]]:text-white! border w-40 border-gray-600">
            <SelectValue placeholder="Overview" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {chartModes.map((mode) => (
                <SelectItem key={mode} value={mode}>
                  {mode}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/*  ==================== Statistics Chart ====================== */}
      <div className="h-110 bg-transparentBlack p-3 rounded-xl border border-gray-600 backdrop-blur-2xl">
        <LineChart
          hourlyDataset={next24hours}
          activeMode={activeMode}
          seconderyDataSet={next24hours}
        />
      </div>
    </div>
  );
};

export default StatsChart;
