"use client";
import CallToSearch from "@/components/home/CallToSearch";
import DailyForecast from "@/components/home/DailyForecast";
import HourlyForecast from "@/components/home/HourlyForecast";
import CurrentWeatherDisplay from "@/components/home/CurrentWeatherDisplay";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import DailyForecastMobile from "@/components/home/DailyForecastMobile";
import { motion, easeOut } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

//? force rebnder animation on client side / dyncamic imports ====================================
const WeatherLoader = dynamic(() => import('@/components/home/WeatherLoader'), {
  ssr: false,
})
const DynamicAnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false }
);
const WeatherMap = dynamic(() => import("@/components/home/WeatherMap"), {
  ssr: false,
});
const StatsChart = dynamic(() => import("@/components/home/StatsChart"), {
  ssr: false,
});



export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { currentWeatherData, status, error } = useAppSelector(
    (state) => state.weather
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (typeof window === "undefined" || !isMounted) {
    return null;
  }

  


  // * Animation variants ==============================================
  const fadeVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const zoomIn = (delay: number) => ({
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay,
        ease: easeOut,
      },
    },
  });
  // * Animation variants ==============================================

  return (
    <main className="w-full">
      <DynamicAnimatePresence mode="wait">
        {/*  =========================== loading display =================================== */}
        {status === "loading" && (
          <motion.div
            key="loader"
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <WeatherLoader />
          </motion.div>
        )}
        {/* ================================ error display ============================== */}
        {status === "failed" && error && !currentWeatherData && (
          <motion.div
            key="error"
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="h-100 w-full bg-transparentBlack rounded-xl flex justify-center items-center"
          >
            <p className="text-red-500">
              Error fetching weather data:{" "}
              {error.toLowerCase() === "city not found"
                ? "City not found. Please enter a valid city name and try again."
                : error}
            </p>
          </motion.div>
        )}

        {currentWeatherData && (
          <motion.div
            key="weather"
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="container mx-auto grid md:grid-cols-1 lg:grid-cols-12 gap-4 2xl:gap-6 items-stretch"
          >
            {/* ================================== Left side ===================================== */}
            <div className="md:col-span-1 lg:col-span-8">
              <div className="flex flex-col gap-4 2xl:gap-6 justify-between">
                <motion.div
                  variants={zoomIn(0)}
                  initial="hidden"
                  animate="visible"
                >
                  <CurrentWeatherDisplay />
                </motion.div>

                <motion.div
                  variants={zoomIn(0.2)}
                  initial="hidden"
                  animate="visible"
                  className="hidden sm:block"
                >
                  <DailyForecast />
                </motion.div>

                <motion.div
                  variants={zoomIn(0.4)}
                  initial="hidden"
                  animate="visible"
                  className="block sm:hidden w-[90dvw] overflow-x-scroll"
                >
                  <DailyForecastMobile />
                </motion.div>
              </div>
            </div>

            {/*================================= Right side =====================================*/}
            <motion.div
              variants={zoomIn(0.6)}
              initial="hidden"
              animate="visible"
              className="md:col-span-1 lg:col-span-4"
            >
              <HourlyForecast />
            </motion.div>
          </motion.div>
        )}

        {!currentWeatherData && status === "idle" && (
          <motion.div
            key="callToSearch"
            variants={zoomIn(0.6)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <CallToSearch />
          </motion.div>
        )}
        {/*  ===============================  Map and chart area ======================================== */}
        {
        currentWeatherData && <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch my-10 gap-6 object-center object-cover">
          <div className="col-span-1">
            <motion.div
            key="callToSearch"
            variants={zoomIn(0.9)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <WeatherMap />
          </motion.div>
          </div>
          <div className="col-span-1">
            <motion.div
            key="callToSearch"
            variants={zoomIn(1.2)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <StatsChart/>
          </motion.div>
          </div>
        </div>
      }
      </DynamicAnimatePresence>
    </main>
  );
}
