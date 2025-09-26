"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { History, SearchIcon } from "lucide-react";
import { useLocationSuggestions } from "@/hooks/useLocationSuggestions";
import LocationResultCard from "./LocationResultCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchAllWeatherData,
  setLocationName,
} from "@/redux/slices/weatherDataSlice";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { easeOut, motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import SearchLocationHistory from "../home/SearchLocationHistory";
import { useRecentSearch } from "@/hooks/useRecentSearch";

countries.registerLocale(enLocale);

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { recentSearchLoc, addLocation } = useRecentSearch();
  const { data: suggestions, error } = useLocationSuggestions(searchTerm);
  const unit = useAppSelector((state) => state.unit.value);
  const dispatch = useAppDispatch();

  const revealVariants = {
    hidden: {
      opacity: 0,
      maxHeight: 0,
    },
    visible: {
      opacity: 1,
      maxHeight: "2em",
      transition: {
        duration: 1.5,
        ease: easeOut,
      },
    },
  };

  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(capitalizeFirst(e.target.value));
  };

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
              const fullLocationName = `${place.name}, ${place.state ? place.state + ', ' : ''}${place.country}`;
  
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
  }, [dispatch, unit]);

  //TODO: HANDLE MANUAL SEARCH
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    setSearchTerm("");
    e.preventDefault();
    const fullLocationName = `${suggestions[0].name}, ${
      suggestions[0].state ? `${suggestions[0].state}, ` : ""
    }${
      countries.getName(suggestions[0].country, "en") || suggestions[0].country
    }`;
    dispatch(
      fetchAllWeatherData({ locationQuery: searchTerm, unitSystem: unit })
    );
    dispatch(setLocationName(fullLocationName));
    addLocation(fullLocationName);
  };

  //TODO: HANDLE MANUAL SEARCH (ENTER KEY)
  const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      setSearchTerm("");
      const fullLocationName = `${suggestions[0].name}, ${
        suggestions[0].state ? `${suggestions[0].state}, ` : ""
      }${
        countries.getName(suggestions[0].country, "en") ||
        suggestions[0].country
      }`;
      dispatch(
        fetchAllWeatherData({ locationQuery: searchTerm, unitSystem: unit })
      );
      dispatch(setLocationName(fullLocationName));
      addLocation(fullLocationName);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-8 sm:gap-4 2xl:gap-8 my-10 xl:my-6 2xl:my-8">
      <motion.h4
        variants={revealVariants}
        initial="hidden"
        animate="visible"
        className="overflow-hidden font-light text-xl md:text-3xl 2xl:text-4xl text-center"
      >
        {`How's the sky looking today?`}
      </motion.h4>

      {/* =====================search area ======================= */}
      <form
        className="flex items-center justify-center gap-3 relative w-full sm:w-4/5 lg:w-1/2 mx-auto"
        onSubmit={handleSearch}
      >
        <Input
          type="text"
          placeholder="Search for a place"
          value={searchTerm}
          className="ps-10 bg-transparentBlack border border-gray-700 h-11 font-inter rounded-[8px] text-sm sm:text-base"
          onChange={(e) => handleSearchTermChange(e)}
          onKeyDown={handleEnter}
        />
        <SearchIcon className="absolute left-3 w-5 text-black top-1/2 -translate-y-[50%]" />
        {/* ------------ suggestion list ================ */}
        {suggestions && suggestions.length > 0 && (
          <div
            className="absolute w-full left-0 top-14 rounded-md overflow-hidden shadow-2xl border border-gray-500 flex flex-col "
            onClick={() => setSearchTerm("")}
          >
            {suggestions.map((location) => (
              <LocationResultCard key={location.lat} locationData={location} />
            ))}
            {/* ============ error component ================= */}
            {error && (
              <div className="h-40 w-full flex justify-center items-center bg-yellow absolute top-14 left-0">
                <p className="text-black">
                  Error fetching location:{" "}
                  {error === "city not found"
                    ? "City not found. Please enter a valid city name and try again."
                    : error}
                </p>
              </div>
            )}
          </div>
        )}
        <Button
          type="submit"
          size={"lg"}
          className="bg-btnBlue rounded-[8px] text-white text-sm sm:text-base"
        >
          Search
        </Button>
        {/*  ======================== Search History popup ============================*/}
        {recentSearchLoc.length > 0 && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                size="icon"
                className="bg-transparentBlack text-white w-10 h-10"
              >
                <History />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="bg-transparentBlack border-gray-600 backdrop-blur-2xl"
              align="end"
            >
              <SearchLocationHistory onClose={() => setOpen(false)} />
            </PopoverContent>
          </Popover>
        )}
      </form>
    </div>
  );
};

export default Search;
