'use client'
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ScriptableContext,
  ChartOptions
} from "chart.js";
import { FaDroplet } from "react-icons/fa6";
import { HourlyForecastDataType } from "@/types/hourlyForecastData";
import { ConvertTo12Hour } from "@/utils/convertTo12Hours";
import { ColorGroups } from "@/lib/lib";
import { useAppSelector } from "@/redux/hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const LineChart = ({
  hourlyDataset,
  activeMode,
  seconderyDataSet,
}: {
  hourlyDataset: HourlyForecastDataType[];
  activeMode: string;
  seconderyDataSet?: HourlyForecastDataType[];
}) => {
  const unit = useAppSelector(state => state.unit.value)
  const colorData = ColorGroups;
  const [gradColors, setGradColors] = useState([
    "rgba(243, 96, 39, 0.48)",
    "rgba(0, 178, 28, 0.48)",
    "rgba(255, 255, 255, 0)",
  ]);

  useEffect(() => {
    if (activeMode === "Wind" || activeMode === "Humidity") {
      setGradColors(colorData.wind);
    } else if (activeMode === "Overview" || activeMode === "Feels Like") {
      setGradColors(colorData.temp);
    } else if (activeMode === "Pressure") {
      setGradColors(colorData.pressure);
    } else if (activeMode === "Visibility") {
      setGradColors(colorData.visibility);
    } else {
      setGradColors(colorData.temp);
    }
  }, [activeMode, colorData]);

  if (!hourlyDataset || hourlyDataset.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No data available to display the chart.
      </div>
    );
  }

  const data = {
    labels: hourlyDataset?.map((hourlyData) =>
      ConvertTo12Hour(hourlyData?.dt_txt?.split(" ")[1])
    ),
    datasets: [
      {
        label:
          activeMode === "Precipitation"
            ? "Chances of Rain (%)"
            : activeMode === "Wind"
            ? `Wind Speed (${unit === 'metric' ? 'km/h' : 'mph'})`
            : activeMode === "Humidity"
            ? "Humidity (%)"
            : activeMode === "Pressure"
            ? "Pressure (mbr)"
            : activeMode === "Visibility"
            ? "Visibility (km)"
            : `Temperature (${unit === 'metric' ? '°c' : '°F'})`,
        data:
          activeMode === "Precipitation"
            ? hourlyDataset?.map((hourlyData) => hourlyData?.pop * 100)
            : activeMode === "Wind"
            ? hourlyDataset?.map((hourlyData) => hourlyData?.wind?.speed)
            : activeMode === "Humidity"
            ? hourlyDataset?.map((hourlyData) => hourlyData?.main?.humidity)
            : activeMode === "Pressure"
            ? hourlyDataset?.map((hourlyData) => hourlyData?.main?.pressure)
            : activeMode === "Visibility"
            ? hourlyDataset?.map((hourlyData) => hourlyData?.visibility / 1000)
            : activeMode === "Feels Like"
            ? hourlyDataset?.map((hourlyData) => hourlyData?.main?.feels_like)
            : hourlyDataset?.map((hourlyData) => hourlyData?.main?.temp),
        borderColor: (ctx: ScriptableContext<"line">) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return "orange";
          const gradient = canvasCtx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, gradColors[0]);
          gradient.addColorStop(0.5, gradColors[1]);
          gradient.addColorStop(1, gradColors[2]);
          return gradient;
        },
        backgroundColor: (ctx: ScriptableContext<"line">) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return "orange";
          const gradient = canvasCtx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, gradColors[0]);
          gradient.addColorStop(0.5, gradColors[1]);
          gradient.addColorStop(1, gradColors[2]);
          return gradient;
        },

        tension: 0.5,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        fill: true,
      },
      ...(seconderyDataSet && (activeMode === "Overview" || activeMode === "Wind")
        ? [
            {
              label:
                activeMode === "Overview"
                  ? `Feels Like (${unit === 'metric' ? '°c' : '°F'})`
                  : `Wind Gust (${unit === 'metric' ? 'km/h' : 'mph'})`,
              data:
                activeMode === "Overview"
                  ? hourlyDataset?.map(
                      (hourlyData) => hourlyData?.main?.feels_like
                    )
                  : hourlyDataset?.map((hourlyData) => hourlyData?.wind?.gust),
              borderColor:
                activeMode === "Overview"
                  ? "rgba(230, 245, 39, 0.21)"
                  : "rgba(39, 230, 245, 0.58)",
              backgroundColor:
                activeMode === "Overview"
                  ? "rgba(230, 245, 39, 0.21)"
                  : "rgba(39, 230, 245, 0.58)",
              tension: 0.5,
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 6,
              fill: false,
            },
          ]
        : []),
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    color: "white",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          color: "white",
          padding: 10,
        },
        title: {
          display: activeMode === "Overview", // true or false
          
          padding: { top: 32 },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: activeMode === "Pressure" ? 990 : 0,
        max:
          activeMode === "Wind"
            ? unit === 'imperial' ? 30 : 45
            : activeMode === "Overview" || activeMode === "Feels Like"
            ? unit === 'imperial' ? 150 : 50
            : activeMode === "Humidity"
            ? 100
            : undefined,
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          stepSize: activeMode === "Wind" ? 1 : 5,
          color: "white",
        },
      },
      x: {
        position: "top",
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "white",
          padding: 10,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  return (
    <>
      <Line data={data} options={options} redraw />
      {activeMode === "Overview" && (
        <div className="rainIndicator sm:flex hidden w-full justify-center -translate-y-11 ">
          <div className="absolute rounded lg:w-[95.5%] md:w-[93%] sm:w-[92%] w-[80%] mx-auto  bottom-0 h-8 flex">
            {hourlyDataset?.slice(0, 7).map((hourlyData) => (
              <div
                key={hourlyData.dt}
                className={`flex justify-center items-center w-full ${
                  hourlyData?.pop * 100 > 0
                    ? "bg-blue-400"
                    : "bg-[rgba(255,255,255,0.33)]"
                }`}
              >
                <div className="flex items-center gap-x-1">
                  <span>
                    <FaDroplet />
                  </span>
                  <p className="text-sm">
                    {Math.round(hourlyData?.pop * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LineChart;
