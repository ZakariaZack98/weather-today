import React, { useEffect } from "react";
import AnimatedSearchIcon from "../ui/animatedSearchIcon";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchAllWeatherData,
  setLocationName,
} from "@/redux/slices/weatherDataSlice";

const CallToSearch = () => {
  const unit = useAppSelector((state) => state.unit.value);
  const dispatch = useAppDispatch();
  
  //TODO: GET THE USERS POSITION USING GEOLOCATION API & UPDATE WEATHER DATA ========================================
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (location) => {
          const { latitude, longitude } = location.coords;

          try {
            //? reverse geocoding =====================
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
            );
            const [place] = await response.json();

            if (place) {
              const fullLocationName = `${place.name}, ${
                place.state ? place.state + ", " : ""
              }${place.country}`;

              dispatch(
                fetchAllWeatherData({
                  locationQuery: fullLocationName,
                  unitSystem: unit,
                })
              );
              dispatch(setLocationName(fullLocationName));
            }
          } catch (err) {
            console.error("Failed to reverse geocode location:", err);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  });

  return (
    <div className="py-20 flex flex-col justify-center items-center gap-5">
      <AnimatedSearchIcon />
      <p className="text-textGray text-base md:text-lg text-center">
        Search for a city to see weather information
      </p>
    </div>
  );
};

export default CallToSearch;
